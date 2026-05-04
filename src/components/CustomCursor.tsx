import { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseEnter = () => {
      const interactive = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactive.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    let frame: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(animate);
    };

    animate();
    handleMouseEnter();

    // Re-attach listeners when DOM changes
    const observer = new MutationObserver(handleMouseEnter);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = 'a, button, [data-cursor-hover] { cursor: none !important; }';
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = 'auto';
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? '48px' : '12px',
        height: isHovering ? '48px' : '12px',
        background: isHovering ? 'transparent' : '#22D3A6',
        border: isHovering ? '1px solid rgba(255,255,255,0.2)' : 'none',
        borderRadius: '50%',
        mixBlendMode: isHovering ? 'normal' : 'difference',
        backdropFilter: isHovering ? 'blur(2px)' : 'none',
        WebkitBackdropFilter: isHovering ? 'blur(2px)' : 'none',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.3s, height 0.3s, background 0.3s, border 0.3s',
      }}
    />
  );
}
