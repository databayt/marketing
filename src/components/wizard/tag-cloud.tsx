import type { ReactNode } from 'react';

// Shared building blocks for the wizard's tag clouds (business + feature).

// Deterministic 0..1 from a string — stable, organic per-tag jitter.
export const hash01 = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
};

// Tags-per-row swells toward the middle and tapers at the edges, so the cloud
// reads as an oval: each row grows gradually wider, then gradually narrower.
export const ROW_COUNTS = [3, 5, 6, 5, 3] as const;
export const PAGE_SIZE = ROW_COUNTS.reduce((a, b) => a + b, 0); // 22 tags per "card"

// Radial layout — seat the most prominent item dead-centre and spiral outward,
// so the visual weight (size + opacity) concentrates in the middle of the oval.
// Used for search, where the most relevant tag should be biggest and central.
export function buildRows<T>(items: T[]): T[][] {
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

// Spread layout — deal items (passed in descending prominence) round-robin
// across the rows, so every line receives a slice of the whole popularity
// range: each row gets a big, strong tag, not just the middle ones. Each row
// is then ordered biggest-in-the-centre. Used for browsing.
export function spreadRows<T>(items: T[]): T[][] {
  const rows: T[][] = ROW_COUNTS.map(() => []);
  let r = 0;
  for (const item of items) {
    let guard = 0;
    while (rows[r].length >= ROW_COUNTS[r]) {
      r = (r + 1) % ROW_COUNTS.length;
      if (++guard > ROW_COUNTS.length) return rows.filter((row) => row.length);
    }
    rows[r].push(item);
    r = (r + 1) % ROW_COUNTS.length;
  }
  const center = (row: T[]): T[] => {
    const out: T[] = [];
    row.forEach((it, i) => (i % 2 === 0 ? out.push(it) : out.unshift(it)));
    return out;
  };
  return rows.filter((row) => row.length).map(center);
}

// Split a name around the first match so only the matched letters render blue.
export function highlight(name: string, q: string): ReactNode {
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

// popularity-range normaliser → 0..1
export function makePopNorm(values: number[]): (p: number) => number {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return (p: number) => (max === min ? 0.5 : (p - min) / (max - min));
}
