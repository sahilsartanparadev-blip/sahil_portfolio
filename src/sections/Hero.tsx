import { useEffect, useState, useRef } from 'react';

interface HeroProps {
  onNavigate: (target: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [phase, setPhase] = useState(0);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 4000),
      setTimeout(() => setPhase(4), 6500),
      setTimeout(() => setPhase(5), 6800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center"
      style={{ minHeight: '100vh', zIndex: 10 }}
    >
      <div className="w-full max-w-[1200px] mx-auto text-center px-4 sm:px-6">
        {/* Eyebrow */}
        <div
          className="transition-all duration-800"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transitionDuration: '0.8s',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <span
            className="font-body font-semibold text-xs uppercase tracking-[0.1em]"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            FLUTTER DEVELOPER &times; AI WORKFLOW
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-bold mt-6 leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(24px, 6vw, 84px)', color: '#F5F5F5' }}
        >
          {/* Line 1 */}
          <span className="block mt-2">
            <span className="relative inline-block">
              {/* Invisible spacer to maintain centered layout size */}
              <span className="opacity-0 pointer-events-none">Building Scalable Apps</span>
              {/* Animating text */}
              <span
                ref={line1Ref}
                className="absolute left-0 top-0 overflow-hidden whitespace-nowrap border-r-[3px] border-transparent text-left"
                style={{
                  width: phase >= 3 ? '100%' : '0%',
                  animation:
                    phase === 2
                      ? 'typewriter 2s steps(22, end) 0s forwards, blinkCursor 0.7s infinite alternate'
                      : 'none',
                  borderRightColor:
                    phase === 2
                      ? 'rgba(255,255,255,0.75)'
                      : 'transparent',
                }}
              >
                Building Scalable Apps
              </span>
            </span>
          </span>

          {/* Line 2 */}
          <span className="block mt-2">
            <span className="relative inline-block">
              <span className="opacity-0 pointer-events-none">Faster with AI + Flutter</span>
              <span
                ref={line2Ref}
                className="absolute left-0 top-0 overflow-hidden whitespace-nowrap border-r-[3px] border-transparent text-left"
                style={{
                  width: phase >= 4 ? '100%' : '0%',
                  animation:
                    phase === 3
                      ? 'typewriter 2s steps(24, end) 0s forwards, blinkCursor 0.7s infinite alternate'
                      : 'none',
                  borderRightColor:
                    phase === 3
                      ? 'rgba(255,255,255,0.75)'
                      : 'transparent',
                }}
              >
                Faster with AI + Flutter
              </span>
              {/* Static Blinking Cursor for Phase 4+ */}
              {phase >= 4 && (
                <span
                  className="absolute top-0"
                  style={{
                    left: '100%',
                    borderRight: '3px solid rgba(255,255,255,0.75)',
                    animation: 'blinkCursorEnd 0.7s infinite',
                  }}
                >
                  &nbsp;
                </span>
              )}
            </span>
          </span>
        </h1>

        {/* Description */}
        <p
          className="mx-auto mt-8 leading-relaxed transition-all duration-800"
          style={{
            maxWidth: '640px',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.6)',
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(30px)',
            transitionDuration: '0.8s',
            transitionDelay: phase >= 4 ? '0.3s' : '0s',
          }}
        >
          I use modern AI tools — Cursor AI, Claude Code, Codex — to deliver
          production-ready Flutter applications 2–5x faster. From real-time chat
          systems to AI-powered health tracking, I build what others prototype.
        </p>

        {/* CTA Row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-800"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(20px)',
            transitionDuration: '0.8s',
            transitionDelay: phase >= 4 ? '0.5s' : '0s',
          }}
        >
          <button
            onClick={() => onNavigate('#work')}
            className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-[1.03]"
            style={{ background: '#22D3A6', color: '#050505' }}
          >
            View My Work
          </button>
          <a
            href="/Sartanpara_Sahil_Resume.pdf"
            download="Sahil_Sartanpara_Resume.pdf"
            className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.05)] inline-flex items-center justify-center"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#F5F5F5',
              textDecoration: 'none',
            }}
          >
            Download CV
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto transition-all duration-800"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(20px)',
            transitionDuration: '0.8s',
            transitionDelay: phase >= 4 ? '0.8s' : '0s',
          }}
        >
          {[
            { number: '10+', label: 'Projects Delivered' },
            { number: '5x', label: 'Faster with AI' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  color: '#22D3A6',
                }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
