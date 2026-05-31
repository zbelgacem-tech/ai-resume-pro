import { Link } from 'react-router';
import { Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Resume Builder', href: '/builder' },
      { label: 'Cover Letters', href: '/features' },
      { label: 'LinkedIn Summary', href: '/features' },
      { label: 'Interview Prep', href: '/features' },
      { label: 'ATS Checker', href: '/features' },
      { label: 'Templates', href: '/features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Career Guides', href: '/blog' },
      { label: 'Resume Examples', href: '/blog' },
      { label: 'Job Search Tips', href: '/blog' },
      { label: 'Interview Questions', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-text-light)]/50 mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)] hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-border-dark)] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--color-text-muted)]">
            &copy; 2025 AI Resume Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-light)] transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
