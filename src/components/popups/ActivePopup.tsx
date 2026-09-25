import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Bell } from 'lucide-react';
import { popupsApi, getStorageUrl } from '../../services/api';
import { Popup } from '../../types';

export const ActivePopup: React.FC = () => {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fetchActivePopup = async () => {
      const pageKey = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
      const dismissed = sessionStorage.getItem(`pragya_popup_dismissed_${pageKey}`);
      if (dismissed) return;

      const res = await popupsApi.getActive(pageKey);
      if (res.data) {
        const p = res.data;
        // Schedule display based on configured delay
        timer = setTimeout(() => {
          setPopup(p);
          setIsVisible(true);
          popupsApi.recordImpression(p.id);
        }, (p.delay_seconds || 4) * 1000);
      }
    };

    fetchActivePopup();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (popup) {
      const pageKey = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
      sessionStorage.setItem(`pragya_popup_dismissed_${pageKey}`, 'true');
    }
  };

  const handleClick = () => {
    if (popup) {
      popupsApi.recordClick(popup.id);
    }
    handleDismiss();
  };

  if (!popup || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleDismiss}
    >
      <aside
        aria-label="Announcement"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-in zoom-in-95 fade-in duration-200"
      >
        <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 text-slate-900 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/60 rounded-full blur-2xl pointer-events-none"></div>

          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Dismiss Announcement"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center gap-3.5">
            {popup.image ? (
              <div
                className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[3/2] w-full"
                style={{ maxWidth: Math.min(popup.image_width || 320, 400) }}
              >
                <img
                  src={getStorageUrl(popup.image)}
                  alt={popup.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                <Bell className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider mb-1.5">
                {popup.type}
              </div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {popup.title}
              </h4>
              {popup.description && (
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                  {popup.description}
                </p>
              )}

              <div className="mt-5 flex items-center justify-center gap-4">
                {popup.button_url ? (
                  popup.button_url.startsWith('http') ? (
                    <a
                      href={popup.button_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleClick}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      <span>{popup.button_text || 'Learn More'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={popup.button_url}
                      onClick={handleClick}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      <span>{popup.button_text || 'Learn More'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )
                ) : null}
                <button
                  onClick={handleDismiss}
                  className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
