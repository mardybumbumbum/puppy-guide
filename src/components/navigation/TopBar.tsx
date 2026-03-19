'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TopBar() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* Paw SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-amber-500"
          >
            <ellipse cx="5.5" cy="6.5" rx="2" ry="2.5" />
            <ellipse cx="10.5" cy="4.5" rx="2" ry="2.5" />
            <ellipse cx="15.5" cy="4.5" rx="2" ry="2.5" />
            <ellipse cx="20" cy="6.5" rx="2" ry="2.5" />
            <path d="M12 8c-3.5 0-7 2.5-7 6 0 2.5 1.5 4 3.5 4 .8 0 1.5-.3 2-.5.4-.2.7-.3 1.5-.3s1.1.1 1.5.3c.5.2 1.2.5 2 .5 2 0 3.5-1.5 3.5-4 0-3.5-3.5-6-7-6z" />
          </svg>
          <span className="text-xl font-extrabold text-amber-600 tracking-tight" style={{ fontFamily: 'var(--font-nunito), sans-serif' }}>
            PuppyGuide
          </span>
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
          className="rounded-full bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 transition-colors hover:bg-amber-200"
        >
          {lang === 'pl' ? 'PL' : 'EN'}
        </button>
      </div>
    </header>
  );
}
