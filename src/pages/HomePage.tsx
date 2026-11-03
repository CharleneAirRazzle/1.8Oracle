import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { type Sign } from '@/data/signs';
import { UI } from '@/data/ui-strings';
import { ChevronRight } from 'lucide-react';

function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

type StoredReading = {
  sign: Sign;
  slogan: string;
};

function readStoredReading(): StoredReading | null {
  const today = todayDateString();
  const savedSign = localStorage.getItem('oracle_todaySign');
  const savedDate = localStorage.getItem('oracle_drawDate');
  const savedSlogan = localStorage.getItem('oracle_todaySlogan');

  if (!savedSign || savedDate !== today || !savedSlogan) {
    return null;
  }

  try {
    return {
      sign: JSON.parse(savedSign) as Sign,
      slogan: savedSlogan,
    };
  } catch {
    return null;
  }
}

export default function HomePage() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [todayReading, setTodayReading] = useState<StoredReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    if (!profile) return;
    const stored = readStoredReading();
    setTodayReading(stored);
    setLoading(false);
  }, [profile]);

  if (!profile) return null;

  const handleDraw = async () => {
    if (drawing) return;
    setDrawing(true);
    navigate('/draw');
  };

  return (
    <div className="min-h-screen bg-cozy">
      <div className="max-w-md mx-auto px-8 pt-16 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-stagger-1">
          <span className="text-sm tracking-wide" style={{ color: 'var(--color-text)' }}>
            {UI.appTitle}
          </span>
          <button
            onClick={signOut}
            className="text-xs transition-colors hover:underline"
            style={{ color: 'var(--color-text-faint)' }}
          >
            Sign out
          </button>
        </div>

        {/* Greeting */}
        <div className="mb-12 animate-stagger-1">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-text-faint)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl font-heading" style={{ color: 'var(--color-text)' }}>
            Welcome, {profile.username}
          </h1>
        </div>

        {/* Draw button or today's reading */}
        {loading ? (
          <div className="card-cozy p-16 mb-8 animate-pulse" />
        ) : todayReading ? (
          <div
            className="card-cozy card-cozy-hover p-8 mb-8 cursor-pointer animate-stagger-2"
            onClick={() => navigate('/result')}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-faint)' }}>
                {UI.resultBadge}
              </span>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
            </div>
            <div className="flex items-center gap-6">
              <div className="text-4xl font-heading" style={{ color: 'var(--color-text)' }}>
                {todayReading.sign.symbol}
              </div>
              <div>
                <h3 className="text-xl font-heading mb-1" style={{ color: 'var(--color-text)' }}>
                  {todayReading.sign.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {todayReading.sign.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm mt-6 italic" style={{ color: 'var(--color-text-secondary)' }}>
              "{todayReading.slogan}"
            </p>
          </div>
        ) : (
          <button
            onClick={handleDraw}
            disabled={drawing}
            className="btn-olive w-full py-12 px-8 mb-8 disabled:opacity-60 animate-soft-pulse animate-stagger-2"
          >
            <div className="text-base mb-2">{UI.drawButton}</div>
            <div className="text-xs mt-1 opacity-60">{UI.subtitle}</div>
          </button>
        )}

        {/* Footer */}
        <p className="text-center text-xs mt-12" style={{ color: 'var(--color-text-faint)' }}>
          {UI.footer}
        </p>
      </div>
    </div>
  );
}
