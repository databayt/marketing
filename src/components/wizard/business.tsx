'use client';

import {
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Business } from '@/components/wizard/constant';
import {
  buildRows,
  hash01,
  highlight,
  makePopNorm,
  PAGE_SIZE,
  spreadRows,
} from '@/components/wizard/tag-cloud';
import { cn } from '@/lib/utils';

type BusinessSelectorProps = {
  businesses: Business[];
  selectedBusiness: string;
  onSelect: (businessId: string) => void;
};

type Tag = {
  b: Business;
  size: number;
  opacity: number;
  isSuggestion: boolean;
};

export const BusinessSelector = ({
  businesses,
  selectedBusiness,
  onSelect,
}: BusinessSelectorProps) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const q = query.trim().toLowerCase();

  const popNorm = useMemo(
    () => makePopNorm(businesses.map((b) => b.popularity)),
    [businesses]
  );

  // Popularity-ranked deck; "more →" rotates a fresh slice into view.
  const ranked = useMemo(
    () => [...businesses].sort((a, b) => b.popularity - a.popularity),
    [businesses]
  );
  const pages = Math.max(1, Math.ceil(ranked.length / PAGE_SIZE));

  // Search matches (re-ranked by relevance) when searching, otherwise the
  // current popularity page. Size + opacity track relevance / commonness.
  const tags: Tag[] = useMemo(() => {
    if (q) {
      return businesses
        .map((b) => {
          const lower = b.name.toLowerCase();
          const idx = lower.indexOf(q);
          if (idx < 0) return null;
          const coverage = q.length / b.name.length; // how much of the tag the query spans
          const posScore = Math.max(0, 1 - idx / b.name.length); // earlier match wins
          const rel =
            (lower.startsWith(q) ? 1 : 0.65) *
            (0.45 + 0.4 * coverage + 0.15 * posScore);
          const relP = rel * (0.8 + 0.2 * popNorm(b.popularity));
          return { b, rel: relP };
        })
        .filter((x): x is { b: Business; rel: number } => x !== null)
        .sort((a, b) => b.rel - a.rel || b.b.popularity - a.b.popularity)
        .map(({ b, rel }, i) => ({
          b,
          size: 0.95 + rel * 1.45,
          opacity: 0.5 + rel * 0.5,
          isSuggestion: i === 0,
        }));
    }

    // Round-robin the ranked deck across pages so every "tab" carries the full
    // popularity range (not page 1 = all popular, last page = all faint).
    const cur = page % pages;
    return ranked.filter((_, i) => i % pages === cur).map((b) => {
      const t = popNorm(b.popularity);
      return {
        b,
        size: 0.85 + t * 1.25 + (hash01(b.id) - 0.5) * 0.25,
        opacity: Math.min(
          1,
          Math.max(0.4, 0.4 + t * 0.6 + (hash01(b.id + 'o') - 0.5) * 0.12)
        ),
        isSuggestion: false,
      };
    });
  }, [q, page, pages, ranked, businesses]);

  // Search keeps the most relevant tag big + centred (radial); browse spreads
  // the big, strong tags across every line of every page.
  const rows = useMemo(() => (q ? buildRows(tags) : spreadRows(tags)), [tags, q]);
  const suggestionId = q ? tags[0]?.b.id ?? null : null;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestionId) onSelect(suggestionId);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      {/* Search pill */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search your business..."
          aria-label="Search business"
          className="w-full rounded-full border bg-background py-2.5 ps-11 pe-4 text-sm shadow-sm outline-none transition-colors focus:border-foreground/40"
        />
      </div>

      {/* Oval tag cloud — rows grow then shrink; flips fresh tags via "more →" */}
      <div
        key={q ? 'search' : `page-${page % pages}`}
        className="flex w-full max-w-4xl animate-in fade-in zoom-in-95 flex-col items-center gap-y-1.5 duration-300"
      >
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No business matches “{query}”.
          </p>
        ) : (
          rows.map((row, rowIdx) => {
            const isLastRow = rowIdx === rows.length - 1;
            return (
              <div
                key={rowIdx}
                className="flex flex-wrap items-center justify-center gap-x-4"
              >
                {row.map(({ b, size, opacity, isSuggestion }) => {
                  const isSelected = selectedBusiness === b.id;
                  return (
                    <span
                      key={b.id}
                      onClick={() => onSelect(b.id)}
                      title={b.description}
                      style={
                        {
                          fontSize: `${size}rem`,
                          '--o': opacity,
                        } as CSSProperties
                      }
                      className={cn(
                        'cursor-pointer leading-tight opacity-[var(--o)] transition-all duration-200 hover:opacity-100',
                        isSelected
                          ? 'font-medium text-blue-600 underline decoration-2 underline-offset-4 dark:text-blue-400'
                          : 'text-foreground hover:text-foreground',
                        !isSelected &&
                          isSuggestion &&
                          'font-medium underline decoration-blue-500/60 decoration-2 underline-offset-4'
                      )}
                    >
                      {q ? highlight(b.name, q) : b.name}
                    </span>
                  );
                })}

                {/* "more →" — last word of the last row flips in fresh tags */}
                {!q && isLastRow && pages > 1 && (
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p + 1) % pages)}
                    aria-label="Show more business tags"
                    className="group ms-1 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
