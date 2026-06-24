'use client';

import {
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Business } from '@/components/wizard/constant';
import { cn } from '@/lib/utils';

type BusinessSelectorProps = {
  businesses: Business[];
  selectedBusiness: string;
  onSelect: (businessId: string) => void;
};

// Deterministic 0..1 from a string — stable, organic per-tag jitter.
const hash01 = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
};

// Tags-per-row swells toward the middle and tapers at the edges, so the cloud
// reads as an oval: each row grows gradually wider, then gradually narrower.
const ROW_COUNTS = [3, 5, 6, 5, 3] as const;
const PAGE_SIZE = ROW_COUNTS.reduce((a, b) => a + b, 0); // 22 tags per "card"

// Seat the most prominent item dead-centre and spiral outward, so the visual
// weight (size + opacity) concentrates in the middle of the oval.
function buildRows<T>(items: T[]): T[][] {
  const centerRow = (ROW_COUNTS.length - 1) / 2;
  const cells: { row: number; col: number; dist: number }[] = [];
  ROW_COUNTS.forEach((cols, row) => {
    const centerCol = (cols - 1) / 2;
    for (let col = 0; col < cols; col++) {
      const dr = row - centerRow;
      const dc = col - centerCol;
      cells.push({ row, col, dist: dr * dr * 1.6 + dc * dc });
    }
  });
  cells.sort((a, b) => a.dist - b.dist);

  const grid: (T | undefined)[][] = ROW_COUNTS.map((c) =>
    new Array<T | undefined>(c).fill(undefined)
  );
  items.slice(0, cells.length).forEach((item, i) => {
    grid[cells[i].row][cells[i].col] = item;
  });
  return grid
    .map((row) => row.filter((x): x is T => x !== undefined))
    .filter((r) => r.length > 0);
}

// Split a name around the first match so only the matched letters render blue.
function highlight(name: string, q: string): ReactNode {
  const i = name.toLowerCase().indexOf(q);
  if (!q || i < 0) return name;
  return (
    <>
      {name.slice(0, i)}
      <span className="text-blue-600 dark:text-blue-400">
        {name.slice(i, i + q.length)}
      </span>
      {name.slice(i + q.length)}
    </>
  );
}

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

  const { min, max } = useMemo(() => {
    const pops = businesses.map((b) => b.popularity);
    return { min: Math.min(...pops), max: Math.max(...pops) };
  }, [businesses]);
  const popNorm = (p: number) => (max === min ? 0.5 : (p - min) / (max - min));

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

    const start = (page % pages) * PAGE_SIZE;
    return ranked.slice(start, start + PAGE_SIZE).map((b) => {
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

  const rows = useMemo(() => buildRows(tags), [tags]);
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
