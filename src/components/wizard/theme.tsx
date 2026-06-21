// ThemeSelector.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selectedColor?: string;
  selectedRadius?: number;
  onSelect: (color: string, radius: number) => void;
}

const COLORS: { name: string; value: string }[] = [
  { name: "zinc", value: "#18181b" },
  { name: "red", value: "#ef4444" },
  { name: "orange", value: "#f97316" },
  { name: "amber", value: "#f59e0b" },
  { name: "green", value: "#22c55e" },
  { name: "teal", value: "#14b8a6" },
  { name: "blue", value: "#3b82f6" },
  { name: "violet", value: "#8b5cf6" },
  { name: "rose", value: "#f43f5e" },
];

const RADII = [0, 0.25, 0.5, 0.75, 1];

const ThemeSelector = ({
  selectedColor = "zinc",
  selectedRadius = 0.5,
  onSelect,
}: ThemeSelectorProps) => {
  const color = COLORS.find((c) => c.name === selectedColor) ?? COLORS[0];

  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Controls */}
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Color</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => {
                const active = c.name === color.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    onClick={() => onSelect(c.name, selectedRadius)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110",
                      active &&
                        "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    )}
                    style={{ backgroundColor: c.value }}
                  >
                    {active && <Check className="h-4 w-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Radius</p>
            <div className="flex flex-wrap gap-2">
              {RADII.map((r) => {
                const active = r === selectedRadius;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onSelect(color.name, r)}
                    className={cn(
                      "flex h-10 w-12 items-center justify-center border bg-background text-xs font-medium transition-colors",
                      active
                        ? "border-2 border-primary text-foreground"
                        : "border-border text-muted-foreground hover:border-muted-foreground/50"
                    )}
                    style={{ borderRadius: `${r * 0.75}rem` }}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live preview — reflects the chosen color + radius instantly */}
        <div
          className="rounded-[var(--r)] border bg-card p-6 shadow-sm"
          style={{ "--r": `${selectedRadius}rem` } as React.CSSProperties}
        >
          <div className="space-y-2 pb-5">
            <div className="h-4 w-28 rounded-full bg-foreground/15" />
            <div className="h-3 w-40 rounded-full bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-center gap-2 rounded-[var(--r)] border py-2 text-sm">
              <svg role="img" viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              GitHub
            </div>
            <div className="flex items-center justify-center gap-2 rounded-[var(--r)] border py-2 text-sm">
              <svg role="img" viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Google
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <input
            placeholder="Email"
            className="mb-4 w-full rounded-[var(--r)] border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--c)]"
            style={{ "--c": color.value } as React.CSSProperties}
          />

          <button
            type="button"
            className="w-full rounded-[var(--r)] py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: color.value }}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThemeSelector);
