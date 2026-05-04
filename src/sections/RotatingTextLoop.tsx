import { useScrollReveal } from '../hooks/useScrollReveal';

const words1 = [
  'CURSOR AI', 'CLAUDE CODE', 'CODEX', 'WINDSURF', 'FLUTTER',
  'FIREBASE', 'SUPABASE', 'WEBSOCKETS', 'ANTIGRAVITY', 'AI AGENTS',
  'CURSOR AI', 'CLAUDE CODE', 'CODEX', 'WINDSURF', 'FLUTTER',
  'FIREBASE', 'SUPABASE', 'WEBSOCKETS', 'ANTIGRAVITY', 'AI AGENTS',
  'CURSOR AI', 'CLAUDE CODE', 'CODEX', 'WINDSURF',
];

const words2 = [
  'REAL-TIME', 'AI-POWERED', 'SCALABLE', 'PRODUCTION-READY',
  'FAST DELIVERY', 'CLEAN ARCHITECTURE', 'HUMAN + AI',
  'REAL-TIME', 'AI-POWERED', 'SCALABLE', 'PRODUCTION-READY',
  'FAST DELIVERY', 'CLEAN ARCHITECTURE', 'HUMAN + AI',
  'REAL-TIME', 'AI-POWERED', 'SCALABLE', 'PRODUCTION-READY',
  'FAST DELIVERY', 'CLEAN ARCHITECTURE', 'HUMAN + AI',
  'REAL-TIME', 'AI-POWERED', 'SCALABLE',
];

function TextCylinder({
  words,
  reverse,
  className,
}: {
  words: string[];
  reverse: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: '25vh', perspective: '1000px' }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {words.map((word, i) => (
          <div
            key={`${word}-${i}`}
            className="absolute w-full text-center whitespace-nowrap font-heading font-medium"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '-0.02em',
              backfaceVisibility: 'hidden',
              animation: `${reverse ? 'rotateCylinder2' : 'rotateCylinder1'} 25s linear infinite`,
              color: reverse ? 'rgba(255,255,255,0.3)' : '#F5F5F5',
              transform: `rotateX(${i * 15}deg) translateZ(clamp(180px, 35vw, 380px))`,
              '--i': i,
            } as React.CSSProperties}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RotatingTextLoop() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative bg-[#050505] overflow-hidden"
      style={{
        zIndex: 10,
        padding: '40px 0',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <TextCylinder words={words1} reverse={false} />
      <TextCylinder words={words2} reverse={true} />
    </section>
  );
}
