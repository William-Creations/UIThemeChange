import React from "react";
import { useSettings, COPY, THEME_TOKENS } from "../context/SettingsContext";

export default function PreviewCard() {
  const { theme, language } = useSettings();
  const t = THEME_TOKENS[theme];
  const c = COPY[language];

  const rows = [
    { label: c.currentTheme, value: theme === "dark" ? c.dark : c.light },
    { label: c.currentLanguage, value: language === "th" ? c.thai : c.english },
  ];

  return (
    <section
      style={{
        background: t.panel,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: t.textMuted,
          }}
        >
          {c.previewHeading}
        </h2>
        <span
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 11,
            color: t.textMuted,
          }}
        >
          {c.saved}
        </span>
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          border: `1px solid ${t.border}`,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 14px",
              fontSize: 13,
              color: t.text,
              borderTop: i === 0 ? "none" : `1px solid ${t.border}`,
              background: i % 2 === 0 ? "transparent" : t.track,
            }}
          >
            <span style={{ color: t.textMuted }}>{row.label}</span>
            <span style={{ fontWeight: 600 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.6,
          color: t.text,
          fontFamily: "ui-sans-serif, system-ui, 'Noto Sans Thai', sans-serif",
        }}
      >
        {c.sample}
      </p>
    </section>
  );
}
