import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SIGNS, getRandomSlogan, type Sign } from '@/data/signs';
import { UI, fmt } from '@/data/ui-strings';
import { X } from 'lucide-react';

function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

type DrawData = {
  sign: Sign;
  slogan: string;
  isNew: boolean;
};

function drawLocally(): DrawData {
  const today = todayDateString();
  const savedSign = localStorage.getItem('oracle_todaySign');
  const savedDate = localStorage.getItem('oracle_drawDate');
  const savedSlogan = localStorage.getItem('oracle_todaySlogan');

  if (savedSign && savedDate === today && savedSlogan) {
    return {
      sign: JSON.parse(savedSign) as Sign,
      slogan: savedSlogan,
      isNew: false,
    };
  }

  const hexagramId = Math.floor(Math.random() * 8) + 1;
  const sign = SIGNS.find((s) => s.id === hexagramId) ?? SIGNS[0];
  const slogan = getRandomSlogan(sign);

  localStorage.setItem('oracle_todaySign', JSON.stringify(sign));
  localStorage.setItem('oracle_drawDate', today);
  localStorage.setItem('oracle_todaySlogan', slogan);

  return { sign, slogan, isNew: true };
}

export default function DrawPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'drawing' | 'result'>('drawing');
  const [data, setData] = useState<DrawData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!profile || hasFetched.current) return;
    hasFetched.current = true;
    const timer = setTimeout(() => {
      try {
        const result = drawLocally();
        setData(result);
        setPhase('result');
      } catch {
        setError(UI.error);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-cozy-night flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 transition-colors z-10"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Decorative rotating circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full border animate-slow-spin" style={{ borderColor: 'rgba(255,255,255,0.04)' }} />
        <div className="absolute w-[280px] h-[280px] rounded-full border animate-slow-spin" style={{ borderColor: 'rgba(255,255,255,0.03)', animationDirection: 'reverse' }} />
      </div>

      {error && (
        <div className="text-center z-10">
          <p className="mb-6 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-xs underline"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {UI.backHome}
          </button>
        </div>
      )}

      {phase === 'drawing' && !error && (
        <div className="text-center z-10 animate-fade-in-up">
          {/* Animated drawing circle */}
          <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent)' }} />
            <div className="absolute inset-3 rounded-full border animate-spin" style={{ borderColor: 'rgba(255,255,255,0.12)', animationDuration: '2.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
          <h2 className="text-xl font-heading" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {UI.drawing}
          </h2>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {UI.subtitle}
          </p>
        </div>
      )}

      {phase === 'result' && data && !error && (
        <DrawReveal data={data} onContinue={() => navigate('/result')} />
      )}
    </div>
  );
}

function DrawReveal({ data, onContinue }: { data: DrawData; onContinue: () => void }) {
  const { sign, slogan, isNew } = data;

  return (
    <div className="text-center z-10 max-w-sm w-full">
      {/* Sign reveal */}
      <div className="animate-card-reveal">
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {isNew ? UI.resultBadge : UI.alreadyDrawn}
        </p>
        <div className="text-6xl mb-6 font-heading" style={{ color: 'rgba(255,255,255,0.9)' }}>{sign.symbol}</div>
        <h2 className="text-2xl font-heading mb-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {sign.name}
        </h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {sign.tagline}
        </p>
        <div className="inline-block px-4 py-1.5 text-xs mb-8" style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', color: 'rgba(255,255,255,0.5)' }}>
          {fmt(UI.resultCounter, sign.id)}
        </div>
        <p className="text-sm leading-relaxed mb-10 text-balance px-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {sign.story}
        </p>
        <blockquote className="text-lg font-heading italic mb-10 text-balance" style={{ color: 'rgba(255,255,255,0.8)' }}>
          "{slogan}"
        </blockquote>
      </div>

      <button
        onClick={onContinue}
        className="btn-olive px-10 py-3.5 text-xs animate-fade-in-up"
      >
        {UI.comeBackTomorrow}
      </button>
    </div>
  );
}
