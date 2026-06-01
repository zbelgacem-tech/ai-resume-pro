import { useState } from 'react';
import { Calendar, Clock, ArrowRight, User, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const categories = ['All', 'Resume Tips', 'Career Advice', 'Interview Prep', 'ATS', 'LinkedIn', 'Job Search'];

const blogPosts = [
  {
    id: 1,
    title: 'How to Write a Resume That Passes ATS in 2025',
    excerpt: 'Applicant Tracking Systems have evolved. Learn the latest strategies to ensure your resume gets seen by human recruiters.',
    category: 'ATS',
    author: 'AI Resume Pro Team',
    date: 'May 15, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Resume Keywords for Tech Jobs',
    excerpt: 'Discover the most impactful keywords for software engineering, data science, and IT roles that will boost your ATS score.',
    category: 'Resume Tips',
    author: 'Sarah Mitchell',
    date: 'May 12, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 3,
    title: '10 Common Resume Mistakes That Cost You Interviews',
    excerpt: 'Avoid these pitfalls that could be preventing you from landing your dream job. Simple fixes for major impact.',
    category: 'Resume Tips',
    author: 'James Chen',
    date: 'May 10, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'How to Prepare for Behavioral Interview Questions',
    excerpt: 'Master the STAR method and learn how to structure compelling answers that impress hiring managers.',
    category: 'Interview Prep',
    author: 'Emily Rodriguez',
    date: 'May 8, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Optimizing Your LinkedIn Profile for Recruiters',
    excerpt: 'Learn how to structure your LinkedIn profile to attract top recruiters and increase your visibility in search results.',
    category: 'LinkedIn',
    author: 'AI Resume Pro Team',
    date: 'May 5, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'Career Change Resume: How to Pivot Successfully',
    excerpt: 'Changing industries? Here\'s how to frame your transferable skills and make your resume appeal to new sectors.',
    category: 'Career Advice',
    author: 'Lisa Thompson',
    date: 'May 3, 2025',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 7,
    title: 'The Science of Resume Formatting: What Really Works',
    excerpt: 'Research-backed insights on resume layouts, fonts, and formatting that maximize readability and impact.',
    category: 'Resume Tips',
    author: 'David Park',
    date: 'April 30, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 8,
    title: 'Job Search Strategies for 2025: A Complete Guide',
    excerpt: 'Navigate the modern job market with these proven strategies for finding and securing your ideal position.',
    category: 'Job Search',
    author: 'Michael Foster',
    date: 'April 28, 2025',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 9,
    title: 'How to Write Achievement-Based Bullet Points',
    excerpt: 'Transform your experience section from a job description into a compelling list of quantifiable achievements.',
    category: 'Resume Tips',
    author: 'AI Resume Pro Team',
    date: 'April 25, 2025',
    readTime: '6 min read',
    featured: false,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== 'All');

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <ScrollReveal>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.05em] text-[var(--color-gradient-end)]">
              BLOG
            </span>
            <h1 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-medium text-[var(--color-text-light)] mt-3 mb-4">
              Career advice & insights
            </h1>
            <p className="font-body text-lg text-[var(--color-text-muted)] max-w-[560px] mx-auto mb-8">
              Expert tips on resumes, interviews, and job searching to help you land your dream role.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 py-6 bg-[var(--color-surface-dark)] border-[var(--color-border-dark)] text-[var(--color-text-light)] placeholder:text-[var(--color-text-muted)] rounded-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-heading text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'gradient-primary text-white'
                    : 'bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text-gray)] hover:text-[var(--color-text-dark)] dark:hover:text-[var(--color-text-light)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === 'All' && !searchQuery && (
        <section className="py-12 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
          <div className="max-w-[1400px] mx-auto px-6">
            <ScrollReveal>
              <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[20px] overflow-hidden border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] grid lg:grid-cols-2">
                <div className="h-64 lg:h-auto gradient-primary-alt opacity-30 flex items-center justify-center">
                  <Tag size={48} className="text-white/50" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)] text-xs font-heading font-semibold w-fit mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="font-display text-[24px] md:text-[32px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="font-body text-[var(--color-text-gray)] mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-[var(--color-text-gray)]">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button className="w-fit rounded-full px-6 py-3 gradient-primary text-white font-heading font-semibold hover:shadow-glow-blue transition-all hover:scale-[1.02]">
                    Read Article
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 lg:py-20 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
                <article className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] overflow-hidden border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-border-accent)] hover:shadow-card transition-all duration-200 h-full flex flex-col">
                  <div className="h-40 gradient-primary-alt opacity-20 flex items-center justify-center">
                    <Tag size={32} className="text-[var(--color-primary-blue)]" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)] text-xs font-heading font-semibold w-fit mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-text-gray)] mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-gray)] pt-4 border-t border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-lg text-[var(--color-text-gray)]">
                No articles found matching your criteria.
              </p>
              <Button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-4 rounded-full px-6 py-3 gradient-primary text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 gradient-primary">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-[32px] font-medium text-white mb-4">
              Get career tips delivered
            </h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Weekly insights on resumes, interviews, and career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full"
              />
              <Button className="rounded-full px-8 py-6 bg-white text-[var(--color-gradient-start)] font-heading font-semibold hover:shadow-elevated hover:scale-[1.02] transition-all">
                Subscribe
              </Button>
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
