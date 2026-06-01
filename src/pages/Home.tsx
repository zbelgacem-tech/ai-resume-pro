import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sparkles, FileText, Mail, Linkedin, MessageSquare, Download,
  Check, Play, Monitor, Heart, TrendingUp, Megaphone, BookOpen,
  Palette, Scale, Users, Settings, Star, ChevronDown, UploadCloud,
  CheckCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ───────────────────── Scroll Reveal Hook ───────────────────── */
function useScrollReveal() {
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
  return ref;
}

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ───────────────────── Hero Section ───────────────────── */
function Hero() {
  const { isAuthenticated } = useAuth();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 8, y: y * -8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        preload="auto"
      >
        <source src="/videos/hero-background-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(250,248,245,0.3)] via-[rgba(250,248,245,0.1)] to-[rgba(250,248,245,0.5)]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-[42px] md:text-[56px] lg:text-[72px] font-medium leading-[1.05] text-[var(--color-text-dark)] mb-6">
            Create<br />
            <span className="gradient-text">Professional</span><br />
            Resumes
          </h1>
          <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[520px] mx-auto lg:mx-0 mb-8">
            Upload your CV or work experience and let AI craft tailored resumes, cover letters, and interview prep — all in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
            <Link to={isAuthenticated ? '/builder' : '/register'}>
              <Button className="rounded-full px-8 py-6 gradient-primary text-white font-heading font-semibold text-lg hover:shadow-glow-blue transition-all duration-200 hover:scale-[1.02]">
                Get Started Free
              </Button>
            </Link>
            <button className="flex items-center gap-2 text-[var(--color-primary-blue)] font-heading font-medium hover:underline underline-offset-4 transition-all">
              <Play size={18} />
              Watch Demo
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            {['No credit card required', 'Free plan available', 'PDF Export'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-gray)] font-medium">
                <Check size={14} className="text-[var(--color-success)]" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Dashboard Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-[1000px] hidden lg:block"
        >
          <div
            className="rounded-2xl overflow-hidden shadow-2xl transition-transform duration-150 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <img
              src="/images/hero-dashboard-preview.jpg"
              alt="AI Resume Pro Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Industries Section ───────────────────── */
const industries = [
  { name: 'Technology', description: 'Software engineers, devs, IT pros', icon: Monitor },
  { name: 'Healthcare', description: 'Doctors, nurses, medical staff', icon: Heart },
  { name: 'Finance', description: 'Banking, investment, accounting', icon: TrendingUp },
  { name: 'Marketing', description: 'Digital marketing, SEO, content', icon: Megaphone },
  { name: 'Education', description: 'Teachers, professors, admin', icon: BookOpen },
  { name: 'Creative', description: 'Designers, writers, artists', icon: Palette },
  { name: 'Legal', description: 'Attorneys, paralegals, law', icon: Scale },
  { name: 'Sales', description: 'B2B, retail, account management', icon: Users },
  { name: 'Operations', description: 'Logistics, supply chain, management', icon: Settings },
];

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const Icon = industry.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 80}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border transition-all duration-200 cursor-pointer h-full ${
          isHovered ? 'border-[var(--color-border-accent)] shadow-elevated' : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]'
        }`}
      >
        {/* Gradient placeholder for video thumbnail */}
        <div className="aspect-video rounded-[10px] overflow-hidden mb-4 relative">
          <div className="absolute inset-0 gradient-primary-alt opacity-20" />
          <div className={`absolute inset-0 gradient-primary-alt transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-20'}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={32} className="text-[var(--color-primary-blue)]" />
          </div>
        </div>
        <Icon size={24} className="text-[var(--color-primary-blue)] mb-2" />
        <h4 className="font-heading text-[22px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1">
          {industry.name}
        </h4>
        <p className="font-body text-sm text-[var(--color-text-gray)]">
          {industry.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

function IndustriesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <ScrollReveal className="mb-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary-blue)]">
            FOR EVERY INDUSTRY
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mt-3 mb-4">
            Tailored resumes for any profession
          </h2>
          <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[600px]">
            From tech startups to Fortune 500 companies, our AI understands industry-specific language and requirements.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Metrics Section ───────────────────── */
const metrics = [
  { value: '2.5M+', label: 'AI-powered resumes generated' },
  { value: '94%', label: 'Users who got interview callbacks' },
  { value: '50+', label: 'Professional industries covered' },
];

function MetricsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
            Built for job seekers who want results
          </h2>
          <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[600px] mx-auto">
            Join thousands of professionals who landed their dream jobs with AI-optimized resumes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 150}>
              <div className="p-2 rounded-[14px] gradient-primary">
                <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[12px] p-8 text-center">
                  <p className="font-display text-[48px] md:text-[56px] font-medium gradient-text leading-tight">
                    {metric.value}
                  </p>
                  <p className="font-body text-[var(--color-text-gray)] mt-2">
                    {metric.label}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 3D Dashboard Preview */}
        <ScrollReveal>
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              backdropFilter: 'blur(16px)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <img
              src="/images/resume-editor-preview.jpg"
              alt="Resume Editor Interface"
              className="w-full h-auto"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────────────── Features Section ───────────────────── */
const features = [
  { icon: Sparkles, title: 'AI Resume Writer', description: 'Generate complete, tailored resumes from your experience in seconds' },
  { icon: FileText, title: 'ATS Optimization', description: 'Ensure your resume passes Applicant Tracking Systems with keyword optimization' },
  { icon: Mail, title: 'Cover Letters', description: 'AI-crafted cover letters personalized for each job application' },
  { icon: Linkedin, title: 'LinkedIn Summary', description: 'Generate compelling LinkedIn profile summaries that attract recruiters' },
  { icon: MessageSquare, title: 'Interview Prep', description: 'Practice with AI-generated interview questions and model answers' },
  { icon: Download, title: 'PDF Export', description: 'Download polished, professionally formatted PDFs instantly' },
];

function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <ScrollReveal className="mb-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary-blue)]">
            POWERFUL FEATURES
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mt-3 mb-4">
            Everything you need to stand out
          </h2>
          <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[600px]">
            From AI-generated content to ATS optimization, every feature is designed to maximize your chances of getting hired.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 100}>
                <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-8 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)] hover:shadow-card transition-all duration-200 group h-full">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-heading text-[22px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                    {feature.title}
                  </h4>
                  <p className="font-body text-[var(--color-text-gray)]">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── How It Works Section ───────────────────── */
const steps = [
  {
    number: '01',
    title: 'Upload Your CV',
    description: 'Upload your existing resume or enter your work experience manually. Our AI reads and understands your background.',
    icon: UploadCloud,
  },
  {
    number: '02',
    title: 'AI Generates Content',
    description: 'Our AI analyzes job descriptions and crafts tailored resumes, cover letters, and interview prep materials optimized for your target role.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Download & Apply',
    description: 'Export everything as a professional PDF. Apply with confidence knowing your application is ATS-optimized and recruiter-ready.',
    icon: Download,
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 gradient-dark-section">
      <div className="max-w-[1400px] mx-auto px-6">
        <ScrollReveal className="mb-12 text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-gradient-end)]">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-light)] mt-3 mb-4">
            From upload to interview-ready in 3 steps
          </h2>
          <p className="font-body text-lg text-[var(--color-text-muted)] max-w-[600px] mx-auto">
            No complex setup. No writing skills required. Just upload and let AI do the rest.
          </p>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 gradient-primary z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 200}>
                <div className="bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] rounded-[14px] p-10 hover:border-[rgba(124,77,254,0.3)] hover:shadow-glow-purple transition-all duration-200 relative z-10 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-display text-[56px] font-medium gradient-text opacity-60 leading-none">
                      {step.number}
                    </span>
                    <Icon size={32} className="text-[var(--color-gradient-end)]" />
                  </div>
                  <h3 className="font-heading text-[28px] font-medium text-[var(--color-text-light)] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-[var(--color-text-muted)]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Testimonials Section ───────────────────── */
const testimonials = [
  { name: 'Sarah Mitchell', role: 'Software Engineer', company: 'Google', quote: 'I got 3 interview calls within a week of using AI Resume Pro. The ATS optimization feature is a game-changer.', rating: 5 },
  { name: 'James Chen', role: 'Product Manager', company: 'Meta', quote: 'The AI understood my experience perfectly and generated a resume that truly highlighted my achievements.', rating: 5 },
  { name: 'Emily Rodriguez', role: 'Marketing Director', company: 'HubSpot', quote: 'The cover letter generator alone is worth the subscription. Every application feels personalized and professional.', rating: 5 },
  { name: 'David Park', role: 'Data Scientist', company: 'Netflix', quote: 'I went from zero callbacks to five interviews. The interview prep feature helped me nail every single one.', rating: 5 },
  { name: 'Lisa Thompson', role: 'UX Designer', company: 'Airbnb', quote: 'Finally, a resume tool that understands design professionals. The output looks stunning and professional.', rating: 5 },
  { name: 'Michael Foster', role: 'Sales Director', company: 'Salesforce', quote: 'My LinkedIn profile views tripled after using the summary generator. Incredible ROI on this tool.', rating: 5 },
];

function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <ScrollReveal>
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary-blue)]">
            SUCCESS STORIES
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mt-3">
            Loved by job seekers worldwide
          </h2>
        </ScrollReveal>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee will-change-transform" style={{ width: 'max-content' }}>
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-[380px] flex-shrink-0 mx-3 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] p-8"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-[var(--color-primary-blue)] fill-[var(--color-primary-blue)]" />
                ))}
              </div>
              <p className="font-body text-lg text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] italic mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-heading font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                    {t.name}
                  </p>
                  <p className="text-[13px] text-[var(--color-text-gray)]">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Pricing Section ───────────────────── */
const pricingPlans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for trying out',
    features: ['3 resume generations', 'Basic templates', 'PDF export', 'Watermarked output'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    description: 'Best for active job seekers',
    features: ['Unlimited resumes', 'All premium templates', 'ATS optimization', 'Cover letters', 'LinkedIn summaries', 'No watermark'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For teams and organizations',
    features: ['Everything in Pro', 'Team management', 'API access', 'Custom branding', 'Dedicated support', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary-blue)]">
            PRICING
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mt-3 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="font-body text-lg text-[var(--color-text-gray)] max-w-[560px] mx-auto mb-8">
            Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-full p-1 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 ${
                !isAnnual ? 'gradient-primary text-white' : 'text-[var(--color-text-gray)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 ${
                isAnnual ? 'gradient-primary text-white' : 'text-[var(--color-text-gray)]'
              }`}
            >
              Annual <span className="text-xs opacity-80">(Save 20%)</span>
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 150}>
              <div
                className={`rounded-[20px] p-10 text-center h-full flex flex-col transition-all duration-200 ${
                  plan.highlighted
                    ? 'border-2 border-transparent gradient-primary bg-origin-border bg-clip-padding shadow-elevated relative'
                    : 'bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)]'
                }`}
                style={plan.highlighted ? { backgroundImage: 'linear-gradient(var(--color-surface-light), var(--color-surface-light)), linear-gradient(90deg, #3859EC, #7C4DFE, #D85CFF)' } : {}}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-heading font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-[28px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--color-text-gray)] mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className="font-display text-[48px] font-medium gradient-text">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-[var(--color-text-gray)] text-sm">/month</span>
                    </>
                  ) : (
                    <span className="font-display text-[48px] font-medium gradient-text">Custom</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-gray)]">
                      <CheckCircle size={16} className="text-[var(--color-success)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-full py-6 font-heading font-semibold transition-all duration-200 hover:scale-[1.02] ${
                    plan.highlighted
                      ? 'gradient-primary text-white hover:shadow-glow-blue'
                      : 'bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:border-[var(--color-border-accent)]'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── FAQ Section ───────────────────── */
const faqs = [
  { question: 'How does the AI generate resumes?', answer: 'Our AI analyzes your uploaded CV or manually entered experience, identifies key achievements and skills, then crafts a tailored resume using industry-specific language optimized for ATS systems.' },
  { question: 'Is my data secure?', answer: 'Absolutely. We use bank-level 256-bit encryption, never store your payment details, and your resume data is only used to generate your documents.' },
  { question: 'Can I cancel my subscription anytime?', answer: 'Yes, you can cancel your Pro subscription at any time with no questions asked. You\'ll continue to have access until the end of your billing period.' },
  { question: 'What file formats can I export?', answer: 'All resumes and cover letters can be exported as professional PDFs. Pro users also get Word (.docx) format.' },
  { question: 'Does it work for non-tech industries?', answer: 'Yes! Our AI is trained across 50+ industries including healthcare, finance, education, marketing, legal, and more.' },
  { question: 'What\'s the difference between Free and Pro?', answer: 'Free gives you 3 resume generations with basic templates. Pro unlocks unlimited generations, all premium templates, ATS optimization, cover letters, LinkedIn summaries, and interview prep.' },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[800px] mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-primary-blue)]">
            FAQ
          </span>
          <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mt-3">
            Questions? We&apos;ve got answers.
          </h2>
        </ScrollReveal>

        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={`font-heading text-[18px] md:text-[22px] font-semibold transition-colors duration-200 ${
                    openIndex === i ? 'text-[var(--color-primary-blue)]' : 'text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] group-hover:text-[var(--color-primary-blue)]'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[var(--color-text-gray)] transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openIndex === i ? 'max-h-48 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="font-body text-[var(--color-text-gray)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CTA Section ───────────────────── */
function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-24 lg:py-32 gradient-primary">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-[36px] md:text-[48px] font-medium text-white mb-4">
            Ready to land your dream job?
          </h2>
          <p className="font-body text-lg text-white/80 max-w-[560px] mx-auto mb-8">
            Join 2.5M+ professionals who&apos;ve transformed their careers with AI-powered resumes.
          </p>
          <Link to={isAuthenticated ? '/builder' : '/register'}>
            <Button className="rounded-full px-10 py-6 bg-white text-[var(--color-gradient-start)] font-heading font-semibold text-lg hover:shadow-elevated hover:scale-[1.03] transition-all duration-200">
              Get Started Free
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <p className="text-[13px] text-white/60 mt-4">
            No credit card required &bull; Free plan available
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────────────── Home Page ───────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <IndustriesSection />
      <MetricsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />

      {/* Scroll reveal CSS */}
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
    </>
  );
}
