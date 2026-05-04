import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (target: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="relative"
      style={{
        zIndex: 10,
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 0',
      }}
    >
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        {/* Left */}
        <p className="text-sm order-3 sm:order-1 text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; {new Date().getFullYear()} Sahil Sartanpara. Built with AI + Flutter.
        </p>

        {/* Center: Social Links */}
        <div className="flex items-center justify-center gap-6 order-1 sm:order-2">
          <a
            href="https://github.com/sahilsartanparadev-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#22D3A6]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/sartanpara-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-[#3B82F6]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/SahilSarta26270"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <Twitter size={20} />
          </a>
          <a
            href="mailto:sahilsartanpara.dev@gmail.com"
            className="transition-colors duration-300 hover:text-[#8B5CF6]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Right */}
        <button
          onClick={() => onNavigate('#hero')}
          className="text-sm font-medium transition-colors duration-300 hover:text-white order-2 sm:order-3"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Back to top &uarr;
        </button>
      </div>
    </footer>
  );
}
