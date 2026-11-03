import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { type Sign } from '@/data/signs';
import { UI, fmt } from '@/data/ui-strings';
import { ArrowLeft, Share2, Shirt, Utensils, BookOpen, Clapperboard } from 'lucide-react';

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

export default function ResultPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [reading, setReading] = useState<StoredReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const stored = readStoredReading();
    setReading(stored);
    setLoading(false);
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-cozy-night relative overflow-hidden">
      {/* Decorative rotating circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border animate-slow-spin" style={{ borderColor: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute w-[340px] h-[340px] rounded-full border animate-slow-spin" style={{ borderColor: 'rgba(255,255,255,0.02)', animationDirection: 'reverse' }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-8 pt-16 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 animate-stagger-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs transition-colors hover:underline"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {UI.backHome}
          </button>
          <span className="text-sm tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {UI.appTitle}
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 rounded-full border animate-spin" style={{ borderColor: 'rgba(255,255,255,0.12)', borderTopColor: 'rgba(255,255,255,0.5)', animationDuration: '2s' }} />
          </div>
        ) : !reading ? (
          <div className="text-center py-32 animate-fade-in-up">
            <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{UI.alreadyDrawn}</p>
            <button
              onClick={() => navigate('/draw')}
              className="btn-olive px-8 py-3.5 text-xs"
            >
              {UI.drawButton}
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {/* Sign card */}
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {UI.resultBadge} · {fmt(UI.resultCounter, reading.sign.id)}
              </p>

              <div className="text-6xl mb-6 font-heading" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {reading.sign.symbol}
              </div>

              <h1 className="text-2xl font-heading mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {reading.sign.name}
              </h1>
              <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {reading.sign.tagline}
              </p>

              <p className="leading-relaxed text-balance mb-10 text-sm px-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {reading.sign.story}
              </p>

              <p className="text-sm leading-relaxed text-balance mb-10 italic px-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {reading.sign.naturalMeaning}
              </p>

              {/* Daily slogan */}
              <blockquote className="text-lg font-heading italic text-balance leading-relaxed py-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                "{reading.slogan}"
              </blockquote>
            </div>

            {/* Today's Guidance */}
            <div
              className="mb-8 animate-stagger-2 p-6"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Today's Guidance
              </h3>
              <div className="space-y-5">
                <GuidanceRow icon={<Shirt className="w-3.5 h-3.5" />} label="Wear" value={reading.sign.wear} />
                <GuidanceRow icon={<Utensils className="w-3.5 h-3.5" />} label="Eat" value={reading.sign.eat} />
                <GuidanceRow icon={<BookOpen className="w-3.5 h-3.5" />} label="Read" value={reading.sign.read} />
                <GuidanceRow icon={<Clapperboard className="w-3.5 h-3.5" />} label="Watch" value={reading.sign.watch} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 animate-stagger-3 mt-10">
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3.5 text-xs transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '2px',
                  color: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'transparent',
                }}
              >
                {UI.backHome}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: UI.appTitle,
                      text: `Today I drew ${reading.sign.name}: "${reading.slogan}"`,
                      url: window.location.origin,
                    }).catch(() => {});
                  }
                }}
                className="btn-olive flex-1 py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>

            <p className="text-center text-xs mt-12" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {UI.footer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GuidanceRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex items-center justify-center w-7 h-7 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-xs uppercase tracking-widest block mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {label}
        </span>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{value}</p>
      </div>
    </div>
  );
}
