import React from "react";
import {
  SettingsProvider,
  useSettings,
  COPY,
  THEME_TOKENS,
} from "./context/SettingsContext";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import PreviewCard from "./components/PreviewCard";

function AppShell() {
  const { theme, language, isLoaded } = useSettings();
  const t = THEME_TOKENS[theme];
  const c = COPY[language];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: "ui-sans-serif, system-ui, 'Noto Sans Thai', sans-serif",
        transition: "background 200ms ease, color 200ms ease",
      }}
    >
      <Header />
      <main
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 20,
        }}
      >
        {!isLoaded ? (
          <p style={{ fontSize: 13, color: t.textMuted, gridColumn: "1 / -1" }}>
            {c.loading}
          </p>
        ) : (
          <>
            <SettingsPanel />
            <PreviewCard />
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  );
}
