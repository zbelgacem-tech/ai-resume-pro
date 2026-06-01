import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

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

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@airesumepro.com', href: 'mailto:support@airesumepro.com' },
  { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', href: '#' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' },
  { icon: Clock, label: 'Response Time', value: 'Within 2 hours', href: '#' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent successfully!');
  };

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-gradient-end)]">
              CONTACT
            </span>
            <h1 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-[var(--color-text-light)] mt-3 mb-4">
              Get in touch
            </h1>
            <p className="font-body text-lg text-[var(--color-text-muted)] max-w-[560px] mx-auto">
              Have a question or need help? We&apos;re here for you. Reach out and we&apos;ll respond within 2 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.label} delay={i * 100}>
                    <a
                      href={item.href}
                      className="flex items-start gap-4 p-5 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)] transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {item.label}
                        </p>
                        <p className="font-body text-sm text-[var(--color-text-gray)]">{item.value}</p>
                      </div>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[20px] p-8 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-[var(--color-success)]" />
                      </div>
                      <h3 className="font-display text-[24px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                        Message sent!
                      </h3>
                      <p className="font-body text-[var(--color-text-gray)] mb-6">
                        We&apos;ll get back to you within 2 hours.
                      </p>
                      <Button
                        onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                        className="rounded-full px-6 py-3 gradient-primary text-white"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                            Your Name
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
                          />
                        </div>
                        <div>
                          <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                            Email
                          </label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                          Subject
                        </label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="How can we help?"
                          className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]"
                        />
                      </div>
                      <div>
                        <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                          Message
                        </label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us more about your question..."
                          rows={5}
                          className="bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full px-8 py-6 gradient-primary text-white font-heading font-semibold hover:shadow-glow-blue transition-all hover:scale-[1.02] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Send Message
                            <Send size={18} />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-primary">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-white mb-4">
              Ready to build your resume?
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Join millions of professionals who trust AI Resume Pro.
            </p>
            <Link to="/register">
              <Button className="rounded-full px-10 py-6 bg-white text-[var(--color-gradient-start)] font-heading font-semibold text-lg hover:shadow-elevated hover:scale-[1.03] transition-all">
                Get Started Free
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
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
