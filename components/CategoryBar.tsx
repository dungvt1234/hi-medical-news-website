'use client';

import { CATEGORIES } from '@/lib/articles';

type Props = {
  active: string;
  onChange: (key: string) => void;
};

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="sticky top-[72px] z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Scroll ngang trên mobile */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onChange(cat.key)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-200 sm:text-sm ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-card'
                    : 'bg-brand-50 text-ink-light hover:bg-brand-100 hover:text-brand-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
