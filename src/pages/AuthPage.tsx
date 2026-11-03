import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UI } from '@/data/ui-strings';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'signup') {
      const { error: err } = await signUp(email, password, username);
      if (err) setError(err);
      else navigate('/');
    } else {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
      else navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cozy flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Title */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-2xl font-heading mb-3" style={{ color: 'var(--color-text)' }}>
            {UI.appTitle}
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {UI.subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="card-cozy p-10 animate-scale-up">
        {/* Tabs */}
        <div className="flex gap-8 mb-10 justify-center animate-fade-in-up">
          <button
            onClick={() => { setMode('signup'); setError(null); }}
            className="text-xs pb-2 transition-all"
            style={{
              color: mode === 'signup' ? 'var(--color-text)' : 'var(--color-text-faint)',
              borderBottom: mode === 'signup' ? '1px solid var(--color-text)' : '1px solid transparent',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => { setMode('signin'); setError(null); }}
            className="text-xs pb-2 transition-all"
            style={{
              color: mode === 'signin' ? 'var(--color-text)' : 'var(--color-text-faint)',
              borderBottom: mode === 'signin' ? '1px solid var(--color-text)' : '1px solid transparent',
            }}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-scale-up">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-faint)' }}>
                Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--color-text-faint)' }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your name"
                  required
                  className="input-cozy w-full pl-9 pr-4 py-3 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-faint)' }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--color-text-faint)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-cozy w-full pl-9 pr-4 py-3 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-faint)' }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--color-text-faint)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="input-cozy w-full pl-9 pr-10 py-3 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'var(--color-text-faint)' }}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm px-4 py-3 text-center" style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-bg-warm)', border: '1px solid var(--color-border-warm)', borderRadius: '2px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-olive w-full py-4 text-xs disabled:opacity-40"
          >
            {loading ? UI.loading : mode === 'signup' ? 'Begin Your Journey' : 'Welcome Back'}
          </button>
        </form>
        </div>

        <p className="text-center text-xs mt-10" style={{ color: 'var(--color-text-faint)' }}>
          {UI.footer}{' '}
          <Link to="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
        </p>
      </div>
    </div>
  );
}
