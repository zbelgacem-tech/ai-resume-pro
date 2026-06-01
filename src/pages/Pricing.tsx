import { useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, ArrowRight, HelpCircle, Sparkles, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
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

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for trying out',
    features: [
      '3 resume generations',
      'Basic templates',
      'PDF export',
      'Watermarked output',
      'Email support',
    ],
    notIncluded: [
      'ATS optimization',
      'Cover letters',
      'LinkedIn summaries',
      'Interview prep',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    description: 'Best for active job seekers',
    features: [
      'Unlimited resumes',
      'All premium templates',
      'ATS optimization',
      'Cover letters',
      'LinkedIn summaries',
      'Interview preparation',
      'No watermark',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    icon: Building2,
    monthlyPrice: null,
    annualPrice: null,
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Team management',
      'API access',
      'Custom branding',
      'Dedicated support',
      'SLA guarantee',
      'SSO integration',
      'Analytics dashboard',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.' },
  { q: 'Is there a refund policy?', a: 'We offer a 7-day money-back guarantee on all paid plans. No questions asked.' },
  { q: 'What happens when I exceed my free generations?', a: 'You\'ll be prompted to upgrade to Pro. Your existing resumes remain accessible.' },
  { q: 'Do you offer student discounts?', a: 'Yes! Students get 50% off Pro plans. Contact support with your .edu email to verify.' },
  { q: 'Can I cancel my subscription?', a: 'Absolutely. Cancel anytime from your account settings. You\'ll keep access until the end of your billing period.' },
];

const comparisonFeatures = [
  { name: 'Resume generations', free: '3/month', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Templates', free: 'Basic (3)', pro: 'Premium (25+)', enterprise: 'Custom' },
  { name: 'ATS optimization', free: false, pro: true, enterprise: true },
  { name: 'Cover letters', free: false, pro: true, enterprise: true },
  { name: 'LinkedIn summaries', free: false, pro: true, enterprise: true },
  { name: 'Interview prep', free: false, pro: true, enterprise: true },
  { name: 'Watermark', free: true, pro: false, enterprise: false },
  { name: 'API access', free: false, pro: false, enterprise: true },
  { name: 'Team members', free: '1', pro: '1', enterprise: 'Unlimited' },
  { name: 'Support', free: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { isAuthenticated } = useAuth();

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-gradient-end)]">
              PRICING
            </span>
            <h1 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-[var(--color-text-light)] mt-3 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="font-body text-lg text-[var(--color-text-muted)] max-w-[560px] mx-auto mb-8">
              Start free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
            <div className="inline-flex items-center gap-3 bg-[var(--color-surface-dark)] rounded-full p-1 border border-[var(--color-border-dark)]">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 ${
                  !isAnnual ? 'gradient-primary text-white' : 'text-[var(--color-text-muted)]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 ${
                  isAnnual ? 'gradient-primary text-white' : 'text-[var(--color-text-muted)]'
                }`}
              >
                Annual <span className="text-xs opacity-80">(Save 20%)</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <ScrollReveal key={plan.name} delay={i * 150}>
                  <div
                    className={`rounded-[20px] p-8 lg:p-10 flex flex-col h-full transition-all duration-200 ${
                      plan.highlighted
                        ? 'gradient-primary bg-origin-border bg-clip-padding shadow-elevated relative scale-[1.02] z-10'
                        : 'bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)]'
                    }`}
                    style={plan.highlighted ? { backgroundImage: 'linear-gradient(var(--color-surface-light), var(--color-surface-light)), linear-gradient(90deg, #3859EC, #7C4DFE, #D85CFF)' } : {}}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-heading font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                      <Icon size={24} className="text-white" />
                    </div>

                    <h3 className="font-heading text-[24px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-gray)] mb-6">{plan.description}</p>

                    <div className="mb-8">
                      {plan.monthlyPrice !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-[48px] font-medium gradient-text leading-none">
                            ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                          </span>
                          <span className="text-[var(--color-text-gray)] text-sm">/month</span>
                        </div>
                      ) : (
                        <span className="font-display text-[48px] font-medium gradient-text leading-none">Custom</span>
                      )}
                      {isAnnual && plan.annualPrice && (
                        <p className="text-sm text-[var(--color-success)] mt-1">
                          Save ${((plan.monthlyPrice! - plan.annualPrice) * 12).toFixed(0)}/year
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                            <CheckCircle size={16} className="text-[var(--color-success)] flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                        {plan.notIncluded.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-gray)]">
                            <span className="w-4 h-4 rounded-full border border-[var(--color-text-gray)] flex-shrink-0 flex items-center justify-center">
                              <span className="w-1.5 h-0.5 bg-[var(--color-text-gray)]" />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full rounded-full py-6 font-heading font-semibold transition-all duration-200 hover:scale-[1.02] mt-auto ${
                        plan.highlighted
                          ? 'gradient-primary text-white hover:shadow-glow-blue'
                          : 'bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] hover:border-[var(--color-border-accent)]'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1000px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
              Feature comparison
            </h2>
            <p className="font-body text-lg text-[var(--color-text-gray)]">
              See exactly what you get with each plan.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">Feature</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">Free</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-[var(--color-primary-blue)]">Pro</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, i) => (
                    <tr key={feature.name} className={`border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] ${i % 2 === 0 ? 'bg-[var(--color-surface-light)]/50 dark:bg-[var(--color-surface-dark)]/30' : ''}`}>
                      <td className="py-4 px-4 font-body text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{feature.name}</td>
                      <td className="text-center py-4 px-4">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <CheckCircle size={18} className="text-[var(--color-success)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-text-gray)]">—</span>
                          )
                        ) : (
                          <span className="font-body text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{feature.free}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <CheckCircle size={18} className="text-[var(--color-success)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-text-gray)]">—</span>
                          )
                        ) : (
                          <span className="font-body text-sm text-[var(--color-primary-blue)] font-semibold">{feature.pro}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? (
                            <CheckCircle size={18} className="text-[var(--color-success)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-text-gray)]">—</span>
                          )
                        ) : (
                          <span className="font-body text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[800px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={24} className="text-white" />
            </div>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
              Pricing FAQ
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                  <h4 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                    {faq.q}
                  </h4>
                  <p className="font-body text-[var(--color-text-gray)]">
                    {faq.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-primary">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium text-white mb-4">
              Still have questions?
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Our team is here to help you choose the right plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={isAuthenticated ? '/builder' : '/register'}>
                <Button className="rounded-full px-8 py-6 bg-white text-[var(--color-gradient-start)] font-heading font-semibold text-lg hover:shadow-elevated hover:scale-[1.02] transition-all">
                  Get Started Free
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="rounded-full px-8 py-6 bg-transparent border border-white/30 text-white font-heading font-semibold text-lg hover:bg-white/10 transition-all">
                  Contact Sales
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
