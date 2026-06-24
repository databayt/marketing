'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { Business } from '@/components/wizard/constant';
import { cn } from '@/lib/utils';

type BusinessSelectorProps = {
  businesses: Business[];
  selectedBusiness: string;
  onSelect: (businessId: string) => void;
};

// Deterministic 0..1 from a string — gives each tag a stable, organic jitter.
const hash01 = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
};

export const BusinessSelector = ({
  businesses,
  selectedBusiness,
  onSelect,
}: BusinessSelectorProps) => {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const { min, max } = useMemo(() => {
    const pops = businesses.map((b) => b.popularity);
    return { min: Math.min(...pops), max: Math.max(...pops) };
  }, [businesses]);

  // The autocomplete suggestion: best prefix match, falling back to best "contains".
  const suggestionId = useMemo(() => {
    if (!q) return null;
    const byPop = (a: Business, b: Business) => b.popularity - a.popularity;
    const prefix = businesses
      .filter((b) => b.name.toLowerCase().startsWith(q))
      .sort(byPop);
    const contains = businesses
      .filter(
        (b) =>
          !b.name.toLowerCase().startsWith(q) &&
          b.name.toLowerCase().includes(q)
      )
      .sort(byPop);
    return (prefix[0] ?? contains[0])?.id ?? null;
  }, [q, businesses]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestionId) onSelect(suggestionId);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      {/* Search pill */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search your business..."
          aria-label="Search business"
          className="w-full rounded-full border bg-background py-2.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-foreground/40"
        />
      </div>

      {/* Tag cloud — size & opacity scale with popularity */}
      <div className="flex w-4/5 max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {businesses.map((b) => {
          const name = b.name.toLowerCase();
          const isMatch = !q || name.startsWith(q) || name.includes(q);
          const isSuggestion = suggestionId === b.id;
          const isSelected = selectedBusiness === b.id;

          // popularity -> size & opacity, plus a small deterministic jitter
          const t = max === min ? 0.5 : (b.popularity - min) / (max - min);
          const size = 0.85 + t * 1.45 + (hash01(b.id) - 0.5) * 0.35; // ~0.7rem .. ~2.4rem
          const base = 0.3 + t * 0.5 + (hash01(b.id + 'o') - 0.5) * 0.12;
          const opacity = isSelected
            ? 1
            : q
              ? isMatch
                ? 1
                : 0.1
              : Math.min(0.95, Math.max(0.3, base));

          return (
            <span
              key={b.id}
              onClick={() => onSelect(b.id)}
              style={
                { fontSize: `${size}rem`, '--o': opacity } as React.CSSProperties
              }
              className={cn(
                'cursor-pointer leading-tight opacity-[var(--o)] transition-all duration-200 hover:opacity-100',
                q && !isMatch && 'pointer-events-none',
                isSelected || isSuggestion
                  ? 'font-medium text-blue-700 underline decoration-2 underline-offset-4 dark:text-blue-400'
                  : q && isMatch
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {b.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
