import { useScrollReveal } from '../hooks/useScrollReveal';

interface ExperienceEntry {
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

const entries: ExperienceEntry[] = [
  {
    role: 'Flutter Developer (Freelance)',
    period: '2023 — Present',
    description:
      'Building cross-platform mobile applications for clients worldwide. Specializing in real-time systems, AI integrations, and scalable Firebase architectures.',
    highlights: ['10+ projects delivered', '100% client satisfaction', 'AI-assisted workflow'],
  },
  {
    role: 'Full Stack Developer',
    period: '2022 — 2023',
    description:
      'Developed end-to-end web and mobile solutions using React, Flutter, and Node.js. Led technical architecture decisions and mentored junior developers.',
    highlights: ['React & Flutter expertise', 'API architecture', 'Team leadership'],
  },
  {
    role: 'Mobile App Developer',
    period: '2021 — 2022',
    description:
      'Started professional mobile development journey. Built Android and iOS apps using Flutter, gaining deep expertise in Dart, state management, and UI/UX implementation.',
    highlights: ['Flutter & Dart mastery', 'UI/UX implementation', 'State management'],
  },
];

export default function Experience() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      id="experience"
      className="relative"
      style={{ zIndex: 10, padding: '120px 0' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="section-eyebrow">EXPERIENCE</span>
          <h2
            className="font-heading font-bold mt-4 tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#F5F5F5',
            }}
          >
            Building since day one.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          <div className="space-y-12">
            {entries.map((entry, index) => {
              const { ref, isVisible } = useScrollReveal();
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={entry.role}
                  ref={ref}
                  className={`relative transition-all duration-800 ${
                    isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`
                  }`}
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {/* Timeline dot - desktop */}
                  <div
                    className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full -translate-x-1/2 hidden md:block"
                    style={{ background: '#22D3A6', boxShadow: '0 0 12px rgba(34,211,166,0.4)' }}
                  />

                  <div
                    className={`md:w-[calc(50%-32px)] ${
                      isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'
                    }`}
                    style={{ paddingLeft: '40px' }}
                  >
                    <div className="glass-card-sm p-8 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500">
                      {/* Period */}
                      <span
                        className="font-mono text-xs"
                        style={{ color: '#22D3A6' }}
                      >
                        {entry.period}
                      </span>

                      {/* Role */}
                      <h3
                        className="font-heading font-semibold text-xl lg:text-2xl mt-2 tracking-[-0.02em]"
                        style={{ color: '#F5F5F5' }}
                      >
                        {entry.role}
                      </h3>

                      {/* Description */}
                      <p
                        className="mt-3 text-base leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {entry.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {entry.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{
                              background: 'rgba(34,211,166,0.1)',
                              color: '#22D3A6',
                            }}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
