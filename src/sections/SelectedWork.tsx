import { useScrollReveal } from '../hooks/useScrollReveal';

interface Project {
  category: string;
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  image: string;
}

const projects: Project[] = [
  {
    category: 'Social Platform',
    title: 'PetMeeter',
    description:
      'Real-time pet social platform with WebSocket-powered chat, location-based matching, and scalable Firebase architecture. Pet owners connect, chat, and arrange meetups — all in real-time.',
    techStack: ['Flutter', 'Firebase', 'WebSockets', 'Google Maps API'],
    highlights: [
      'Real-time messaging with delivery receipts',
      'Location-based pet matching algorithm',
      'Firebase Cloud Functions for scalability',
    ],
    image: '/petmeeter.jpg',
  },
  {
    category: 'HealthTech / AI',
    title: 'Smart Ring AI Health System',
    description:
      'AI-powered health companion that analyzes biometric data from smart ring sensors and delivers personalized wellness recommendations using ChatGPT integration.',
    techStack: ['Flutter', 'ChatGPT API', 'Bluetooth LE', 'Charts'],
    highlights: [
      'AI-driven health recommendations',
      'Real-time biometric tracking & visualization',
      'Personalized wellness score algorithm',
    ],
    image: '/smart-ring.jpg',
  },
  {
    category: 'Enterprise',
    title: 'Smart Attendance System',
    description:
      'Enterprise attendance management with admin dashboard, real-time analytics, and automated reporting. Streamlines workforce tracking across multiple locations.',
    techStack: ['Flutter', 'Firebase', 'Analytics', 'Cloud Functions'],
    highlights: [
      'Admin dashboard with real-time insights',
      'Automated attendance reports & alerts',
      'Multi-location workforce management',
    ],
    image: '/attendance.jpg',
  },
  {
    category: 'Civic Tech',
    title: 'Grugram Online',
    description:
      'GPS-powered civic issue reporting platform for Gurugram citizens. Smart duplicate detection prevents redundant complaints while real-time tracking keeps communities informed.',
    techStack: ['Flutter', 'Google Maps API', 'Firebase', 'Geolocation'],
    highlights: [
      'GPS-based issue pinpointing & tracking',
      'Smart duplicate detection system',
      'Real-time civic status updates',
    ],
    image: '/grugram.jpg',
  },
  {
    category: 'E-Commerce',
    title: 'Nanavati Collection',
    description:
      'Full-featured e-commerce platform built with React and Supabase. Product catalog, cart, checkout flow, and admin inventory management — a complete retail solution.',
    techStack: ['ReactJS', 'Supabase', 'Tailwind CSS', 'Stripe'],
    highlights: [
      'Complete product catalog with search & filters',
      'Secure checkout with Stripe integration',
      'Admin inventory management dashboard',
    ],
    image: '/nanavati.jpg',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`glass-card overflow-hidden transition-all duration-700 hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 hover:shadow-card-hover ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
      }`}
      style={{
        transitionDelay: `${index * 0.1}s`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div
        className={`flex flex-col ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Image */}
        <div className="lg:w-[55%] relative overflow-hidden">
          <div className="aspect-video lg:aspect-auto lg:h-full">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center">
          <span className="category-pill inline-block self-start mb-4">
            {project.category}
          </span>

          <h3
            className="font-heading font-semibold text-2xl lg:text-3xl tracking-[-0.02em]"
            style={{ color: '#F5F5F5' }}
          >
            {project.title}
          </h3>

          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul className="mt-5 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-sm flex items-start gap-2"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <span className="text-[#22D3A6] mt-0.5">&#10003;</span>
                {highlight}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex gap-6 mt-6">
            <span className="text-sm font-medium text-[#22D3A6] cursor-pointer hover:underline">
              Live Demo &rarr;
            </span>
            <span className="text-sm font-medium text-[#22D3A6] cursor-pointer hover:underline">
              View Code &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section
      id="work"
      className="relative"
      style={{
        zIndex: 10,
        padding: '120px 0 160px',
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
          <span className="section-eyebrow">SELECTED WORK</span>
          <h2
            className="font-heading font-bold mt-4 tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#F5F5F5',
            }}
          >
            Projects that ship.
          </h2>
          <p
            className="mt-3 text-lg"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Real apps, real users, real impact.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
