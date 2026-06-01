import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password');
      setErrors({ general: 'Invalid email or password. Try user@example.com / any password' });
    }
  };

  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-heading text-xl font-bold gradient-text">AI Resume Pro</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[20px] p-8 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] shadow-card">
          <h1 className="font-display text-[28px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
            Welcome back
          </h1>
          <p className="font-body text-[var(--color-text-gray)] mb-6">
            Sign in to your account to continue.
          </p>

          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 py-6 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border rounded-xl ${
                    errors.email ? 'border-red-400' : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]'
                  } text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 py-6 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border rounded-xl ${
                    errors.password ? 'border-red-400' : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]'
                  } text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-gray)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[var(--color-text-gray)] cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--color-border-light)]" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-[var(--color-primary-blue)] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full py-6 gradient-primary text-white font-heading font-semibold hover:shadow-glow-blue transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-[var(--color-primary-blue)] font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-[var(--color-text-gray)]">User: user@example.com</p>
            <p className="text-xs text-[var(--color-text-gray)]">Admin: admin@example.com</p>
            <p className="text-xs text-[var(--color-text-gray)]">Password: any (min 6 chars)</p>
          </div>

          <p className="text-center text-sm text-[var(--color-text-gray)] mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-[var(--color-primary-blue)] font-medium hover:underline">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
