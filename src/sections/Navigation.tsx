import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface NavigationProps {
  onNavigate: (target: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { ref } = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', target: '#work' },
    { label: 'Process', target: '#process' },
    { label: 'About', target: '#experience' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <nav
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,5,5,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      }`}
      style={{ padding: '0 clamp(24px, 5vw, 80px)' }}
    >
      {/* Logo */}
      <div className="flex flex-col">
        <span
          className="font-heading font-bold text-white text-xl leading-none tracking-tight"
          style={{ letterSpacing: '-0.04em' }}
        >
          S&sup2;
        </span>
        <span
          className="text-[10px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          SAHIL SARTANPARA
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => onNavigate(link.target)}
            className="group relative text-sm font-medium transition-colors duration-300 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {link.label}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#22D3A6] transition-all duration-300 ease-out group-hover:w-full" />
          </button>
        ))}
        <button
          onClick={() => onNavigate('#contact')}
          className="text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: '#22D3A6',
            color: '#050505',
          }}
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
}
