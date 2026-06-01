import { useState } from 'react';
import {
  Users, FileText, CreditCard, TrendingUp, BarChart3,
  Shield, ArrowUpRight, ArrowDownRight, Activity, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Total Users', value: '12,543', change: '+12%', up: true, icon: Users },
  { label: 'Resumes Generated', value: '45,231', change: '+28%', up: true, icon: FileText },
  { label: 'Active Subscriptions', value: '3,876', change: '+8%', up: true, icon: CreditCard },
  { label: 'Revenue (Monthly)', value: '$38,762', change: '+15%', up: true, icon: DollarSign },
];

const recentUsers = [
  { name: 'Sarah Mitchell', email: 'sarah@example.com', plan: 'Pro', date: '2 hours ago', status: 'Active' },
  { name: 'James Chen', email: 'james@example.com', plan: 'Free', date: '5 hours ago', status: 'Active' },
  { name: 'Emily Rodriguez', email: 'emily@example.com', plan: 'Pro', date: '1 day ago', status: 'Active' },
  { name: 'David Park', email: 'david@example.com', plan: 'Enterprise', date: '1 day ago', status: 'Active' },
  { name: 'Lisa Thompson', email: 'lisa@example.com', plan: 'Pro', date: '2 days ago', status: 'Inactive' },
  { name: 'Michael Foster', email: 'michael@example.com', plan: 'Free', date: '2 days ago', status: 'Active' },
];

const recentTransactions = [
  { user: 'Sarah Mitchell', amount: '$9.99', plan: 'Pro Monthly', date: 'May 30, 2025', status: 'Completed' },
  { user: 'David Park', amount: '$99.00', plan: 'Enterprise Annual', date: 'May 29, 2025', status: 'Completed' },
  { user: 'Emily Rodriguez', amount: '$9.99', plan: 'Pro Monthly', date: 'May 28, 2025', status: 'Completed' },
  { user: 'Alex Johnson', amount: '$9.99', plan: 'Pro Monthly', date: 'May 27, 2025', status: 'Refunded' },
  { user: 'Maria Garcia', amount: '$95.88', plan: 'Pro Annual', date: 'May 26, 2025', status: 'Completed' },
];

const planDistribution = [
  { plan: 'Free', count: 8667, percentage: 69, color: 'bg-gray-400' },
  { plan: 'Pro', count: 3100, percentage: 25, color: 'bg-[var(--color-primary-blue)]' },
  { plan: 'Enterprise', count: 776, percentage: 6, color: 'bg-[var(--color-gradient-end)]' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions'>('overview');

  return (
    <div className="pt-[72px] min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <h1 className="font-display text-[32px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                Admin Panel
              </h1>
            </div>
            <p className="font-body text-[var(--color-text-gray)] ml-[52px]">
              Manage users, monitor analytics, and oversee platform operations.
            </p>
          </div>
          <div className="flex items-center gap-2 ml-[52px] md:ml-0">
            {([
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'transactions', label: 'Transactions', icon: CreditCard },
            ] as const).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'gradient-primary text-white'
                      : 'bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text-gray)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:text-[var(--color-text-dark)] dark:hover:text-[var(--color-text-light)]'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
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
                  <span className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
                <p className="font-display text-[28px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-[var(--color-text-gray)]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Table */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
                <div className="p-6 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                  <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                    Recent Users
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">User</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Plan</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Joined</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, i) => (
                        <tr key={i} className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{user.name}</p>
                                <p className="text-xs text-[var(--color-text-gray)]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              user.plan === 'Pro' ? 'bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)]' :
                              user.plan === 'Enterprise' ? 'bg-[var(--color-gradient-end)]/10 text-[var(--color-gradient-end)]' :
                              'bg-gray-100 dark:bg-gray-800 text-[var(--color-text-gray)]'
                            }`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-sm text-[var(--color-text-gray)]">{user.date}</td>
                          <td className="py-3 px-6">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              user.status === 'Active' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
                <div className="p-6 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                  <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                    All Users
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">User</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Plan</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Joined</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...recentUsers, ...recentUsers].map((user, i) => (
                        <tr key={i} className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{user.name}</p>
                                <p className="text-xs text-[var(--color-text-gray)]">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              user.plan === 'Pro' ? 'bg-[var(--color-primary-blue)]/10 text-[var(--color-primary-blue)]' :
                              user.plan === 'Enterprise' ? 'bg-[var(--color-gradient-end)]/10 text-[var(--color-gradient-end)]' :
                              'bg-gray-100 dark:bg-gray-800 text-[var(--color-text-gray)]'
                            }`}>
                              {user.plan}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-sm text-[var(--color-text-gray)]">{user.date}</td>
                          <td className="py-3 px-6">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              user.status === 'Active' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden">
                <div className="p-6 border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                  <h2 className="font-heading text-[18px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                    Recent Transactions
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">User</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Amount</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Plan</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Date</th>
                        <th className="text-left py-3 px-6 font-heading text-xs font-semibold text-[var(--color-text-gray)] uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((tx, i) => (
                        <tr key={i} className="border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-6 font-heading text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{tx.user}</td>
                          <td className="py-3 px-6 font-heading font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{tx.amount}</td>
                          <td className="py-3 px-6 text-sm text-[var(--color-text-gray)]">{tx.plan}</td>
                          <td className="py-3 px-6 text-sm text-[var(--color-text-gray)]">{tx.date}</td>
                          <td className="py-3 px-6">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              tx.status === 'Completed' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Distribution */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h3 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Plan Distribution
              </h3>
              <div className="space-y-3">
                {planDistribution.map((plan) => (
                  <div key={plan.plan}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{plan.plan}</span>
                      <span className="text-sm text-[var(--color-text-gray)]">{plan.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] rounded-full overflow-hidden">
                      <div className={`h-full ${plan.color} rounded-full transition-all duration-500`} style={{ width: `${plan.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h3 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Activity Feed
              </h3>
              <div className="space-y-4">
                {[
                  { action: 'New Pro signup', detail: 'Sarah Mitchell', time: '2m ago', icon: Users },
                  { action: 'Resume generated', detail: 'Template: Modern', time: '5m ago', icon: FileText },
                  { action: 'Payment received', detail: '$9.99 from James', time: '12m ago', icon: CreditCard },
                  { action: 'Enterprise inquiry', detail: 'From TechCorp Inc', time: '1h ago', icon: Activity },
                  { action: 'User upgraded', detail: 'Free to Pro', time: '2h ago', icon: TrendingUp },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-[var(--color-primary-blue)]" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {item.action}
                        </p>
                        <p className="text-xs text-[var(--color-text-gray)]">{item.detail}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h3 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button className="w-full rounded-full py-3 gradient-primary text-white font-heading font-medium text-sm hover:shadow-glow-blue transition-all">
                  Export User Data
                </Button>
                <Button className="w-full rounded-full py-3 bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-heading font-medium text-sm hover:border-[var(--color-border-accent)] transition-all">
                  Send Announcement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
