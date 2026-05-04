import { useScrollReveal } from '../hooks/useScrollReveal';

interface WorkflowStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tools: string[];
  accentColor: string;
}

const steps: WorkflowStep[] = [
  {
    number: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
        <path d="M5 20l1-3 3 1-1 3z" />
        <path d="M18 20l-1-3-3 1 1 3z" />
      </svg>
    ),
    title: 'Design with AI',
    description:
      'I use Google Stitch and AI design tools to generate modern UI concepts in minutes. From wireframes to high-fidelity mockups, AI accelerates the entire design phase.',
    tools: ['Google Stitch', 'Midjourney', 'Figma AI'],
    accentColor: '#A78BFA',
  },
  {
    number: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Develop with AI Agents',
    description:
      'Cursor AI is my primary coding assistant. I use Windsurf AI for rapid iteration, Claude Code for logic and architecture, and Codex for automation. The result? Production-ready code at lightning speed.',
    tools: ['Cursor AI', 'Windsurf AI', 'Claude Code', 'Codex', 'Antigravity'],
    accentColor: '#22D3A6',
  },
  {
    number: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Prototype → Production',
    description:
      'AI agents handle boilerplate, testing, and optimization while I focus on architecture and business logic. Rapid prototyping evolves directly into production-ready applications without rewrite cycles.',
    tools: ['Flutter', 'Firebase', 'Supabase', 'REST APIs'],
    accentColor: '#3B82F6',
  },
  {
    number: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    title: 'Deploy at Scale',
    description:
      'Continuous deployment with Firebase Hosting, Cloud Functions for serverless backends, and real-time databases. Every app is built to scale from day one.',
    tools: ['Firebase', 'Cloud Functions', 'CI/CD', 'Analytics'],
    accentColor: '#EC4899',
  },
];

const pipelineNodes = [
  { icon: steps[0].icon, color: '#A78BFA', label: 'Design' },
  { icon: steps[1].icon, color: '#22D3A6', label: 'Develop' },
  { icon: steps[2].icon, color: '#3B82F6', label: 'Prototype' },
  { icon: steps[3].icon, color: '#EC4899', label: 'Deploy' },
];

function PipelineDiagram() {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="flex items-center gap-4 md:gap-8">
        {pipelineNodes.map((node, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-8">
            {/* Node */}
            <div
              className="relative flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${node.color}40`,
                boxShadow: `0 0 30px ${node.color}20`,
              }}
            >
              {node.icon}
              <span
                className="absolute -bottom-6 text-xs font-medium whitespace-nowrap"
                style={{ color: node.color }}
              >
                {node.label}
              </span>
            </div>

            {/* Arrow */}
            {i < pipelineNodes.length - 1 && (
              <svg
                width="60"
                height="16"
                viewBox="0 0 60 16"
                className="hidden md:block"
              >
                <defs>
                  <linearGradient id={`arrowGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={node.color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={pipelineNodes[i + 1].color} stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <line
                  x1="0"
                  y1="8"
                  x2="50"
                  y2="8"
                  stroke={`url(#arrowGrad${i})`}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-8"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
                <polygon
                  points="50,4 58,8 50,12"
                  fill={`url(#arrowGrad${i})`}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AIWorkflow() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      id="process"
      className="relative"
      style={{
        zIndex: 10,
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '160px 0',
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
          <span className="section-eyebrow">MY PROCESS</span>
          <h2
            className="font-heading font-bold mt-4 tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#F5F5F5',
            }}
          >
            AI-Powered Development Workflow
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed max-w-[700px]"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            I don't just code — I orchestrate AI agents to design, develop, debug,
            and deploy. Here's how I deliver 2–5x faster than traditional development.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div
                key={step.number}
                ref={ref}
                className={`glass-card p-10 lg:p-12 transition-all duration-800 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 hover:shadow-card-hover ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'
                }`}
                style={{
                  transitionDelay: `${index * 0.15}s`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Step Number Watermark */}
                <span
                  className="font-heading font-bold text-5xl lg:text-6xl block mb-4"
                  style={{ color: 'rgba(255,255,255,0.08)' }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mb-4">{step.icon}</div>

                {/* Title */}
                <h3
                  className="font-heading font-semibold text-xl lg:text-2xl tracking-[-0.02em]"
                  style={{ color: '#F5F5F5' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {step.description}
                </p>

                {/* Tool Pills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1 rounded"
                      style={{
                        background: `${step.accentColor}15`,
                        color: step.accentColor,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Diagram */}
        <PipelineDiagram />
      </div>
    </section>
  );
}
