import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const BLOB_COUNT = 128;

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorPhase: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uBlobs[128];
  uniform vec3 uColors[4];
  uniform float uBlobCount;
  uniform float uAspect;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform float uScrollVel;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv * 2.0 - 1.0);
    uv.x *= uAspect;

    vec3 col = vec3(0.0);
    vec3 normal = vec3(0.0);
    float totalField = 0.0;

    for (int i = 0; i < 128; i++) {
      if (float(i) >= uBlobCount) break;

      vec2 blobPos = uBlobs[i];
      vec2 diff = uv - blobPos;
      float dist = length(diff);
      float radius = 0.2;
      float influence = max(0.0, dist - radius);
      float field = pow(influence, 2.0) * 0.15;
      float power = smoothstep(0.12, 0.001, field);

      int colorIdx = int(mod(float(i), 4.0));
      vec3 blobColor;
      if (colorIdx == 0) blobColor = uColors[0];
      else if (colorIdx == 1) blobColor = uColors[1];
      else if (colorIdx == 2) blobColor = uColors[2];
      else blobColor = uColors[3];

      col += blobColor * power;
      totalField += power;

      // Accumulate surface normal
      if (power > 0.001) {
        normal += normalize(vec3(diff, power * 0.5)) * power;
      }
    }

    // Adjusted tonemap to prevent blowing out to white
    vec3 finalColor = col * col * 0.3;
    finalColor = min(finalColor, vec3(0.4, 0.4, 0.5));

    // Specular highlights
    vec3 norm = normalize(normal + vec3(0.0, 0.0, 1.0));
    vec3 lightDir = normalize(vec3(0.3, 0.5, 1.0));
    float reflection = max(0.0, dot(norm, lightDir));
    float specular = pow(reflection, 12.0);
    vec3 highlightColor = vec3(0.4, 0.45, 0.55);
    finalColor += highlightColor * specular * 0.5;

    // Mouse interaction glow
    if (uMouseActive > 0.5) {
      vec2 mousePos = uMouse;
      mousePos.x *= uAspect;
      float mouseDist = length(uv - mousePos);
      float mouseGlow = exp(-mouseDist * mouseDist * 8.0) * 0.3;
      finalColor += vec3(0.13, 0.83, 0.65) * mouseGlow;
    }

    // Background blending
    vec3 bgColor = vec3(0.02, 0.02, 0.02);
    float blendFactor = smoothstep(0.0, 0.6, totalField);
    finalColor = mix(bgColor, finalColor, blendFactor);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function GooeyMetaball() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(0);
  const scrollRef = useRef({ scroll: 0, velocity: 0 });
  const blobsRef = useRef<Blob[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseActiveRef.current = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    // Initialize blobs
    const blobs: Blob[] = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.8;
      blobs.push({
        x: Math.cos(angle) * radius * (window.innerWidth / window.innerHeight),
        y: Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.0005,
        vy: (Math.random() - 0.5) * 0.0005,
        radius: 0.15 + Math.random() * 0.1,
        colorPhase: i % 4,
      });
    }
    blobsRef.current = blobs;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    rendererRef.current = renderer;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const aspect = window.innerWidth / window.innerHeight;

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth * dpr, window.innerHeight * dpr) },
      uBlobs: { value: new Array(128).fill(new THREE.Vector2(0, 0)) },
      uColors: { value: [
        new THREE.Color(0.05, 0.15, 0.25),
        new THREE.Color(0.13, 0.83, 0.65),
        new THREE.Color(0.23, 0.51, 0.96),
        new THREE.Color(0.65, 0.55, 0.98),
      ]},
      uBlobCount: { value: BLOB_COUNT },
      uAspect: { value: aspect },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseActive: { value: 0 },
      uScrollVel: { value: 0 },
    };

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse lerp
    const smoothMouse = { x: 0, y: 0 };

    // Animation loop
    let time = 0;
    const animate = () => {
      if (disposed) return;

      time += 0.016;
      uniforms.uTime.value = time;

      // Update scroll
      uniforms.uScrollVel.value += (scrollRef.current.velocity - uniforms.uScrollVel.value) * 0.1;

      // Smooth mouse
      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.15;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.15;
      uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);
      uniforms.uMouseActive.value += (mouseActiveRef.current - uniforms.uMouseActive.value) * 0.05;

      // Update blob physics
      const currentBlobs = blobsRef.current;
      const blobPositions: THREE.Vector2[] = [];

      for (let i = 0; i < BLOB_COUNT; i++) {
        const blob = currentBlobs[i];

        // Gravity toward center
        const toCenterX = -blob.x;
        const toCenterY = -blob.y;
        const distToCenter = Math.sqrt(blob.x * blob.x + blob.y * blob.y);
        const gravityStrength = 0.0007 * distToCenter;
        const gravNorm = distToCenter > 0.001 ? 1 / distToCenter : 0;
        blob.vx += toCenterX * gravNorm * gravityStrength;
        blob.vy += toCenterY * gravNorm * gravityStrength;

        // Scroll gravity
        const scrollForce = scrollRef.current.velocity * 0.025;
        blob.vy += scrollForce;
        blob.vx += toCenterX * gravNorm * 0.005 * Math.min(Math.abs(scrollForce), 0.01);

        // Mouse repulsion
        if (mouseActiveRef.current > 0.5) {
          const mPosX = smoothMouse.x * aspect;
          const mPosY = smoothMouse.y;
          const toMX = mPosX - blob.x;
          const toMY = mPosY - blob.y;
          const mDist = Math.sqrt(toMX * toMX + toMY * toMY);
          const mForce = 1.0 / (mDist + 0.1);
          const mNorm = mDist > 0.001 ? 1 / mDist : 0;
          blob.vx -= toMX * mNorm * mForce * 0.0004 * dpr;
          blob.vy -= toMY * mNorm * mForce * 0.0004 * dpr;
        }

        // Velocity clamp
        blob.vx = Math.max(-0.03, Math.min(0.03, blob.vx));
        blob.vy = Math.max(-0.03, Math.min(0.03, blob.vy));

        // Apply velocity
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounds wrapping
        const boundX = aspect * 1.5;
        const boundY = 1.5;
        if (blob.x < -boundX) blob.x = boundX;
        if (blob.x > boundX) blob.x = -boundX;
        if (blob.y < -boundY) blob.y = boundY;
        if (blob.y > boundY) blob.y = -boundY;

        blobPositions.push(new THREE.Vector2(blob.x, blob.y));
      }

      uniforms.uBlobs.value = blobPositions;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
      const newAspect = w / h;
      uniforms.uAspect.value = newAspect;

      // Re-init blob positions for new aspect
      for (let i = 0; i < BLOB_COUNT; i++) {
        const blob = blobsRef.current[i];
        blob.x = blob.x / aspect * newAspect;
      }
    };

    // Scroll
    let prevScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollRef.current.scroll = currentScroll;
      scrollRef.current.velocity = (currentScroll - prevScroll) * 0.1;
      prevScroll = currentScroll;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
