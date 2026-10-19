import { ImageResponse } from "next/og";

// The link-preview card for every page under /[lang] (WhatsApp, LinkedIn, X,
// Slack). Latin text only: the default OG font has no Arabic glyphs.
export const alt = "Databayt — Automate the boring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#00bc6d",
          color: "#000",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600 }}>Business automation</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 1.05, letterSpacing: -4 }}>
          <span>Automate the boring</span>
          <span>elevate the wonders</span>
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>databayt.org</div>
      </div>
    ),
    size,
  );
}
