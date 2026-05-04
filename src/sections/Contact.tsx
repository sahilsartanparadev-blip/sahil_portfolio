import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/sahilsartanparadev-blip' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sartanpara-sahil' },
    { label: 'Twitter', href: 'https://x.com/SahilSarta26270' },
    { label: 'Email', href: 'mailto:sahilsartanpara.dev@gmail.com' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative"
      style={{ zIndex: 10, padding: '160px 0 80px' }}
    >
      <div
        className={`max-w-[700px] mx-auto text-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Eyebrow */}
        <span className="section-eyebrow">LET'S WORK TOGETHER</span>

        {/* Headline */}
        <h2
          className="font-heading font-bold mt-6 tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: '#F5F5F5',
          }}
        >
          Ready to build your next app?
        </h2>

        {/* Description */}
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          I'm currently available for freelance projects. Whether you need a
          Flutter app, AI integration, or full-stack development — let's talk.
        </p>

        {/* CTA */}
        <button
          onClick={() => window.location.href = 'mailto:sahilsartanpara.dev@gmail.com'}
          className="mt-10 px-12 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
          style={{
            background: '#22D3A6',
            color: '#050505',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#1DBD94';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(34,211,166,0.3)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#22D3A6';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          Start a Project
        </button>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
              className="text-sm font-medium transition-colors duration-300 hover:text-[#22D3A6]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
