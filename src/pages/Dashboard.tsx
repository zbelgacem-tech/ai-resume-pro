import { Link } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import {
  FileText, Download, TrendingUp, Clock,
  Star, ArrowRight, Plus, Mail, Linkedin, MessageSquare,
  Settings, CreditCard, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const recentActivity = [
  { action: 'Generated resume', target: 'Software Engineer at Google', date: '2 hours ago', icon: FileText },
  { action: 'Created cover letter', target: 'Product Manager at Meta', date: '1 day ago', icon: Mail },
  { action: 'Updated LinkedIn summary', target: 'Personal profile', date: '2 days ago', icon: Linkedin },
  { action: 'Practiced interview', target: 'Behavioral questions', date: '3 days ago', icon: MessageSquare },
];

const stats = [
  { label: 'Resumes Created', value: '12', icon: FileText, change: '+3 this month' },
  { label: 'Cover Letters', value: '8', icon: Mail, change: '+2 this month' },
  { label: 'Interview Sessions', value: '15', icon: MessageSquare, change: '+5 this month' },
  { label: 'Profile Views', value: '234', icon: TrendingUp, change: '+18% vs last month' },
];

const quickActions = [
  { label: 'Create Resume', icon: Plus, href: '/builder', color: 'gradient-primary' },
  { label: 'Cover Letter', icon: Mail, href: '/builder', color: 'bg-blue-500' },
  { label: 'LinkedIn Summary', icon: Linkedin, href: '/builder', color: 'bg-indigo-500' },
  { label: 'Interview Prep', icon: MessageSquare, href: '/builder', color: 'bg-purple-500' },
];

const savedDocuments = [
  { name: 'Software Engineer Resume', type: 'Resume', date: 'May 28, 2025', status: 'Complete' },
  { name: 'Product Manager Cover Letter', type: 'Cover Letter', date: 'May 25, 2025', status: 'Complete' },
  { name: 'Data Analyst Resume v2', type: 'Resume', date: 'May 20, 2025', status: 'Draft' },
  { name: 'LinkedIn Summary 2025', type: 'LinkedIn', date: 'May 18, 2025', status: 'Complete' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="pt-[72px] min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[32px] md:text-[48px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="font-body text-[var(--color-text-gray)]">
              Here&apos;s what&apos;s happening with your job search.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/builder">
              <Button className="rounded-full px-6 py-3 gradient-primary text-white font-heading font-semibold hover:shadow-glow-blue transition-all hover:scale-[1.02]">
                <Plus size={18} className="mr-2" />
                Create New
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <p className="font-display text-[32px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-[var(--color-text-gray)]">{stat.label}</p>
                <p className="text-xs text-[var(--color-success)] mt-1">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.label}
                      to={action.href}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
                    >
                      <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                        {action.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Saved Documents */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                  Saved Documents
                </h2>
                <Link to="/builder" className="text-sm text-[var(--color-primary-blue)] font-medium hover:underline flex items-center gap-1">
                  View All
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {savedDocuments.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <FileText size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {doc.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-gray)]">
                          {doc.type} &bull; {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        doc.status === 'Complete'
                          ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                          : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                      }`}>
                        {doc.status}
                      </span>
                      <button className="text-[var(--color-text-gray)] hover:text-[var(--color-primary-blue)] transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Info */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Star size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                    {user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free'} Plan
                  </p>
                  <p className="text-xs text-[var(--color-text-gray)]">
                    {user?.plan === 'free' ? '3 generations/month' : 'Unlimited generations'}
                  </p>
                </div>
              </div>
              {user?.plan === 'free' && (
                <Link to="/pricing">
                  <Button className="w-full rounded-full py-3 gradient-primary text-white font-heading font-semibold text-sm hover:shadow-glow-blue transition-all">
                    Upgrade to Pro
                  </Button>
                </Link>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-blue)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={14} className="text-[var(--color-primary-blue)]" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {activity.action}
                        </p>
                        <p className="text-xs text-[var(--color-text-gray)]">{activity.target}</p>
                        <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                          <Clock size={10} />
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Settings Links */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Account
              </h2>
              <div className="space-y-2">
                {[
                  { icon: Settings, label: 'Settings' },
                  { icon: CreditCard, label: 'Billing' },
                  { icon: Bell, label: 'Notifications' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                    >
                      <Icon size={16} className="text-[var(--color-text-gray)]" />
                      <span className="font-heading text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
