#!/usr/bin/env node
/**
 * Share cards — renders public/og/{en,ar}.png (1200×630), the og:image and
 * twitter:image for every page (src/lib/seo.ts → ogImages).
 *
 * WHY A REAL BROWSER: next/og (Satori) mis-measures joined Arabic, so the
 * Arabic card came out with huge word gaps. Chromium shapes it properly, and the
 * cards use the hero's own fonts (Thmanyah serif display / Geist). The PNG is a
 * rendering, not the font file, so the Thmanyah licence still holds.
 *
 * Re-run after changing the hero copy:
 *   node scripts/fetch-thmanyah.mjs
 *   PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core node scripts/og-cards.cjs
 */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const root = path.resolve(__dirname, "..");
const font = (p) => `file://${root}/${p}`;
const dict = (lang) => require(`${root}/src/components/internationalization/${lang}.json`).marketing.hero;

const css = `
@font-face{font-family:tsd;src:url("${font("public/fonts/thmanyah/thmanyah-serif-display-900.woff2")}");font-weight:900}
@font-face{font-family:tsans;src:url("${font("public/fonts/thmanyah/thmanyah-sans-400.woff2")}");font-weight:400}
@font-face{font-family:geist;src:url("${font("node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2")}");font-weight:700}
@font-face{font-family:geist;src:url("${font("node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2")}");font-weight:400}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{background:#00bc6d;color:#000;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.label{font-size:34px;line-height:1.4}
.h{font-size:112px;line-height:1.3}
.h span{display:block;width:max-content}
mark{background:#a3e4c0;color:#000;padding:0 6px}
.foot{font-family:geist;font-weight:700;font-size:34px;letter-spacing:-.01em}
[lang=ar] .label{font-family:tsans}
[lang=ar] .h{font-family:tsd;font-weight:900;font-feature-settings:"ss01" on}
[lang=en] .label{font-family:geist;font-weight:400}
[lang=en] .h{font-family:geist;font-weight:700;letter-spacing:-.04em;line-height:1.15}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const lang of ["en", "ar"]) {
    const t = dict(lang);
    const html = `<!doctype html><html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><style>${css}</style></head><body>
      <div class="label">${t.label}</div>
      <div class="h"><span>${t.words.join(" ")}</span><span>${t.words2.join(" ")} <mark>${t.highlight}</mark></span></div>
      <div class="foot">databayt.org</div></body></html>`;
    // A file:// page, so the file:// fonts are allowed to load.
    const file = path.join(os.tmpdir(), `og-card-${lang}.html`);
    fs.writeFileSync(file, html);
    await page.goto(`file://${file}`);
    await page.evaluate(() => document.fonts.ready);
    const used = lang === "ar" ? ["900 16px tsd", "16px tsans", "700 16px geist"] : ["700 16px geist", "16px geist"];
    const loaded = await page.evaluate((faces) => faces.map((f) => document.fonts.check(f)), used);
    if (loaded.includes(false)) throw new Error(`${lang}: font missing (${used}) — run scripts/fetch-thmanyah.mjs`);
    await page.screenshot({ path: `${root}/public/og/${lang}.png` });
    console.log(`public/og/${lang}.png`);
  }
  await browser.close();
})();
