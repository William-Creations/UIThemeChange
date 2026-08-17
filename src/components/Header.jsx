import React from "react";
import { useSettings, COPY, THEME_TOKENS } from "../context/SettingsContext";

export default function Header() {
  const { theme, language } = useSettings();
  const t = THEME_TOKENS[theme];
  const c = COPY[language];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        padding: "20px 24px",
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: t.text,
            fontFamily:
              "'Space Grotesk', ui-sans-serif, system-ui, 'Noto Sans Thai', sans-serif",
          }}
        >
          {c.title}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: t.textMuted }}>
          {c.subtitle}
        </p>
      </div>
      <span
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: t.textMuted,
          border: `1px solid ${t.border}`,
          borderRadius: 999,
          padding: "4px 10px",
        }}
      >
        {theme} · {language}
      </span>
    </header>
  );
}
