import React from "react";
import { useSettings, COPY, THEME_TOKENS } from "../context/SettingsContext";

function Led({ on, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: on ? color : "transparent",
        border: `1px solid ${on ? color : "currentColor"}`,
        opacity: on ? 1 : 0.35,
      }}
    />
  );
}

function Segmented({ options, value, onChange, tokens }) {
  return (
    <div
      style={{
        display: "inline-flex",
        border: `1px solid ${tokens.border}`,
        borderRadius: 10,
        background: tokens.track,
        padding: 3,
        gap: 3,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            style={{
              appearance: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              padding: "7px 14px",
              borderRadius: 7,
              color: active ? tokens.accentText : tokens.text,
              background: active ? tokens.accent : "transparent",
              transition: "background 150ms ease, color 150ms ease",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SettingsPanel() {
  const { theme, language, setTheme, setLanguage, resetSettings } =
    useSettings();
  const t = THEME_TOKENS[theme];
  const c = COPY[language];

  return (
    <section
      style={{
        background: t.panel,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Led on color={t.led} />
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
          {c.panelHeading}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, color: t.textMuted }}>{c.themeLabel}</span>
        <Segmented
          tokens={t}
          value={theme}
          onChange={setTheme}
          options={[
            { value: "light", label: c.light },
            { value: "dark", label: c.dark },
          ]}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, color: t.textMuted }}>
          {c.languageLabel}
        </span>
        <Segmented
          tokens={t}
          value={language}
          onChange={setLanguage}
          options={[
            { value: "en", label: c.english },
            { value: "th", label: c.thai },
          ]}
        />
      </div>

      <button
        type="button"
        onClick={resetSettings}
        style={{
          alignSelf: "flex-start",
          marginTop: 4,
          appearance: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          color: t.text,
          background: "transparent",
          border: `1px solid ${t.border}`,
          borderRadius: 8,
          padding: "8px 14px",
        }}
      >
        {c.reset}
      </button>
    </section>
  );
}
