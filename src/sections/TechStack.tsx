import { useScrollReveal } from '../hooks/useScrollReveal';

interface TechItem {
  name: string;
  caption: string;
  icon: React.ReactNode;
  color: string;
}

const techItems: TechItem[] = [
  {
    name: 'Flutter',
    caption: 'Cross-platform framework',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    color: '#54C5F8',
  },
  {
    name: 'Dart',
    caption: 'Type-safe language',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: '#00B4AB',
  },
  {
    name: 'ReactJS',
    caption: 'Web interfaces',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: '#61DAFB',
  },
  {
    name: 'Firebase',
    caption: 'Backend & real-time DB',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5 4 20l5.5-2 2-3.5z" />
        <path d="m9.5 18 2.5-2 6.5 4h-7z" />
        <path d="m4 20 5.5-8.5L8 4l-4 16z" />
        <path d="m18.5 20-7-8.5L13 4l5.5 16z" />
      </svg>
    ),
    color: '#FFCA28',
  },
  {
    name: 'Supabase',
    caption: 'Open-source backend',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l4-4 4 4 4-4 4 4" />
        <path d="M4 11l4-4 4 4 4-4 4 4" />
        <path d="M4 5l4-4 4 4" />
      </svg>
    ),
    color: '#3ECF8E',
  },
  {
    name: 'REST APIs',
    caption: 'Web service integration',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    color: '#8B5CF6',
  },
  {
    name: 'WebSockets',
    caption: 'Real-time communication',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: '#F59E0B',
  },
  {
    name: 'AI Integration',
    caption: 'GPT, Claude, Codex',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
    color: '#EC4899',
  },
];

export default function TechStack() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      id="skills"
      className="relative"
      style={{
        zIndex: 10,
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '120px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="section-eyebrow">TECH STACK</span>
          <h2
            className="font-heading font-bold mt-4 tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#F5F5F5',
            }}
          >
            Tools I wield.
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techItems.map((tech, index) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div
                key={tech.name}
                ref={ref}
                className={`glass-card-sm p-8 text-center transition-all duration-600 hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-1 hover:scale-[1.02] group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
                }`}
                style={{
                  transitionDelay: `${index * 0.08}s`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <div
                    className="transition-all duration-300 group-hover:drop-shadow-lg"
                    style={{
                      filter: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 12px ${tech.color})`;
                      (e.currentTarget as HTMLElement).style.color = tech.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.filter = 'none';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    }}
                  >
                    {tech.icon}
                  </div>
                </div>

                {/* Name */}
                <h4
                  className="font-heading font-semibold text-lg tracking-[-0.02em]"
                  style={{ color: '#F5F5F5' }}
                >
                  {tech.name}
                </h4>

                {/* Caption */}
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {tech.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
