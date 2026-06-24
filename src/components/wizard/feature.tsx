'use client';

import {
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Feature } from '@/components/wizard/constant';
import {
  buildRows,
  hash01,
  highlight,
  makePopNorm,
  PAGE_SIZE,
  spreadRows,
} from '@/components/wizard/tag-cloud';
import { cn } from '@/lib/utils';

type FeatureSelectorProps = {
  features: Feature[];
  selectedFeatures: string[];
  onToggle: (featureId: string) => void;
  businessName: string;
};

const pop = (f: Feature): number => f.popularity ?? 5;

type Tag = {
  f: Feature;
  size: number;
  opacity: number;
  isSuggestion: boolean;
};

export const FeatureSelector = ({
  features,
  selectedFeatures,
  onToggle,
  businessName,
}: FeatureSelectorProps) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const q = query.trim().toLowerCase();
  const count = selectedFeatures.length;

  const popNorm = useMemo(
    () => makePopNorm(features.map(pop)),
    [features]
  );

  // Popularity-ranked deck; "more →" rotates a fresh slice into view.
  const ranked = useMemo(
    () => [...features].sort((a, b) => pop(b) - pop(a)),
    [features]
  );
  const pages = Math.max(1, Math.ceil(ranked.length / PAGE_SIZE));

  // Search matches (re-ranked by relevance) when searching, otherwise the
  // current popularity page. Size + opacity track relevance / commonness.
  const tags: Tag[] = useMemo(() => {
    if (q) {
      return features
        .map((f) => {
          const lower = f.name.toLowerCase();
          const idx = lower.indexOf(q);
          if (idx < 0) return null;
          const coverage = q.length / f.name.length; // how much of the tag the query spans
          const posScore = Math.max(0, 1 - idx / f.name.length); // earlier match wins
          const rel =
            (lower.startsWith(q) ? 1 : 0.65) *
            (0.45 + 0.4 * coverage + 0.15 * posScore);
          const relP = rel * (0.8 + 0.2 * popNorm(pop(f)));
          return { f, rel: relP };
        })
        .filter((x): x is { f: Feature; rel: number } => x !== null)
        .sort((a, b) => b.rel - a.rel || pop(b.f) - pop(a.f))
        .map(({ f, rel }, i) => ({
          f,
          size: 0.95 + rel * 1.45,
          opacity: 0.5 + rel * 0.5,
          isSuggestion: i === 0,
        }));
    }

    // Round-robin the ranked deck across pages so every "tab" carries the full
    // popularity range (not page 1 = all popular, last page = all faint).
    const cur = page % pages;
    return ranked.filter((_, i) => i % pages === cur).map((f) => {
      const t = popNorm(pop(f));
      return {
        f,
        size: 0.85 + t * 1.25 + (hash01(f.id) - 0.5) * 0.25,
        opacity: Math.min(
          1,
          Math.max(0.4, 0.4 + t * 0.6 + (hash01(f.id + 'o') - 0.5) * 0.12)
        ),
        isSuggestion: false,
      };
    });
  }, [q, page, pages, ranked, features, popNorm]);

  // Search keeps the most relevant tag big + centred (radial); browse spreads
  // the big, strong tags across every line of every page.
  const rows = useMemo(() => (q ? buildRows(tags) : spreadRows(tags)), [tags, q]);
  const suggestionId = q ? tags[0]?.f.id ?? null : null;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestionId) onToggle(suggestionId);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12">
      {/* Search pill — selected business embedded on the left */}
      <div className="flex w-full max-w-md items-center gap-2 rounded-full border bg-background py-1.5 pe-4 ps-2 shadow-sm transition-colors focus-within:border-foreground/40">
        <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
          {businessName}
        </span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search features..."
          aria-label="Search features"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {count > 0 && (
          <span className="shrink-0 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-blue-500">
            {count}
          </span>
        )}
        <Search className="pointer-events-none h-4 w-4 shrink-0 text-muted-foreground" />
      </div>

      {/* Oval tag cloud — rows grow then shrink; flips fresh tags via "more →" */}
      <div
        key={q ? 'search' : `page-${page % pages}`}
        className="flex w-full max-w-4xl animate-in fade-in zoom-in-95 flex-col items-center gap-y-1.5 duration-300"
      >
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No feature matches “{query}”.
          </p>
        ) : (
          rows.map((row, rowIdx) => {
            const isLastRow = rowIdx === rows.length - 1;
            return (
              <div
                key={rowIdx}
                className="flex flex-wrap items-center justify-center gap-x-4"
              >
                {row.map(({ f, size, opacity, isSuggestion }) => {
                  const isSelected = selectedFeatures.includes(f.id);
                  return (
                    <span
                      key={f.id}
                      onClick={() => onToggle(f.id)}
                      title={f.description}
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
                      {q ? highlight(f.name, q) : f.name}
                    </span>
                  );
                })}

                {/* Page arrows — prev / next, one disabled at each end */}
                {!q && isLastRow && pages > 1 && (
                  <span className="ms-2 inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      aria-label="Previous feature tags"
                      className="text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                      disabled={page >= pages - 1}
                      aria-label="More feature tags"
                      className="text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                    >
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
