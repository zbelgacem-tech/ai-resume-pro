import { Link } from 'react-router';
import {
  Sparkles, FileText, Mail, Linkedin, MessageSquare, Download,
  Shield, Zap, Clock, Target, Globe, Lock, Star, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';

/* Scroll Reveal */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const mainFeatures = [
  {
    icon: Sparkles,
    title: 'AI Resume Writer',
    description: 'Our advanced AI analyzes your experience and crafts tailored resumes that highlight your strengths and match job requirements.',
    highlights: ['Keyword optimization', 'Achievement-focused writing', 'Industry-specific language'],
  },
  {
    icon: FileText,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes through Applicant Tracking Systems with our intelligent keyword matching and formatting.',
    highlights: ['ATS-friendly formatting', 'Keyword density analysis', 'Compatibility scoring'],
  },
  {
    icon: Mail,
    title: 'Cover Letter Generator',
    description: 'Generate personalized cover letters for each job application that complement your resume and address specific job requirements.',
    highlights: ['Job-specific customization', 'Professional tone matching', 'One-click generation'],
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Summary',
    description: 'Create compelling LinkedIn profile summaries that attract recruiters and showcase your professional brand.',
    highlights: ['SEO-optimized summaries', 'Personal brand focus', 'Recruiter-friendly keywords'],
  },
  {
    icon: MessageSquare,
    title: 'Interview Preparation',
    description: 'Practice with AI-generated interview questions and get model answers tailored to your industry and role.',
    highlights: ['Role-specific questions', 'Behavioral question prep', 'Answer frameworks'],
  },
  {
    icon: Download,
    title: 'PDF & Word Export',
    description: 'Download your resume in professional PDF or Word format, ready to send to employers.',
    highlights: ['Professional formatting', 'Multiple templates', 'Instant download'],
  },
];

const additionalFeatures = [
  { icon: Shield, title: 'Bank-Level Security', description: '256-bit encryption keeps your data safe' },
  { icon: Zap, title: 'Instant Generation', description: 'Get your resume in under 60 seconds' },
  { icon: Clock, title: '24/7 Availability', description: 'Build resumes anytime, anywhere' },
  { icon: Target, title: 'Job Targeting', description: 'Tailor your resume for specific roles' },
  { icon: Globe, title: 'Multi-Language', description: 'Support for 10+ languages' },
  { icon: Lock, title: 'Privacy First', description: 'Your data is never shared or sold' },
];

const testimonials = [
  { name: 'Alex Johnson', role: 'Software Developer', text: 'The AI resume writer transformed my job search. I went from no responses to multiple interviews in just two weeks.', rating: 5 },
  { name: 'Maria Garcia', role: 'Marketing Manager', text: 'ATS optimization is a game-changer. I finally understand why my old resume was being rejected.', rating: 5 },
  { name: 'Robert Kim', role: 'Data Analyst', text: 'The cover letter generator saves me hours every week. Each letter feels genuinely personalized.', rating: 5 },
];

export default function Features() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-gradient-end)]">
              FEATURES
            </span>
            <h1 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-[var(--color-text-light)] mt-3 mb-4 leading-tight">
              Powerful tools for your<br />job search
            </h1>
            <p className="font-body text-lg text-[var(--color-text-muted)] max-w-[600px] mx-auto mb-8">
              Everything you need to create stunning resumes, cover letters, and prepare for interviews — all powered by AI.
            </p>
            <Link to={isAuthenticated ? '/builder' : '/register'}>
              <Button className="rounded-full px-8 py-6 gradient-primary text-white font-heading font-semibold text-lg hover:shadow-glow-blue transition-all hover:scale-[1.02]">
                Try It Free
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={i * 100}>
                  <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-8 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)] hover:shadow-card transition-all duration-200 h-full">
                    <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-5">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="font-heading text-[24px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-body text-[var(--color-text-gray)] mb-5">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          <div className="w-1.5 h-1.5 rounded-full gradient-primary flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
              And much more
            </h2>
            <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[560px] mx-auto">
              Every detail is designed to give you the best possible chance at landing your dream job.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={i * 80}>
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-body text-sm text-[var(--color-text-gray)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-light)] mb-4">
              Trusted by professionals
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 150}>
                <div className="bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] rounded-[14px] p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-[var(--color-primary-blue)] fill-[var(--color-primary-blue)]" />
                    ))}
                  </div>
                  <p className="font-body text-[var(--color-text-light)] italic mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-heading font-semibold text-[var(--color-text-light)]">{t.name}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
              Start building your resume today
            </h2>
            <p className="font-body text-lg text-[var(--color-text-gray)] mb-8">
              Join millions of job seekers who trust AI Resume Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={isAuthenticated ? '/builder' : '/register'}>
                <Button className="rounded-full px-8 py-6 gradient-primary text-white font-heading font-semibold text-lg hover:shadow-glow-blue transition-all hover:scale-[1.02]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button className="rounded-full px-8 py-6 bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-heading font-semibold text-lg hover:border-[var(--color-border-accent)] transition-all">
                  View Pricing
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.45, 0.05, 0.55, 0.95), transform 0.7s cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
