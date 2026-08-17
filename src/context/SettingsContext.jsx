import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const STORAGE_KEY = "app-settings";
const DEFAULTS = { theme: "light", language: "en" };

export const COPY = {
  en: {
    title: "Welcome",
    subtitle: "Settings demo",
    panelHeading: "Preferences",
    themeLabel: "Theme",
    languageLabel: "Language",
    light: "Light",
    dark: "Dark",
    english: "EN",
    thai: "TH",
    reset: "Reset to defaults",
    previewHeading: "Preview",
    currentTheme: "Current theme",
    currentLanguage: "Current language",
    sample: "This is your preference preview.",
    saved: "Saved automatically",
    loading: "Loading your settings…",
  },
  th: {
    title: "ยินดีต้อนรับ",
    subtitle: "ตัวอย่างหน้าตั้งค่า",
    panelHeading: "การตั้งค่า",
    themeLabel: "ธีม",
    languageLabel: "ภาษา",
    light: "สว่าง",
    dark: "มืด",
    english: "อังกฤษ",
    thai: "ไทย",
    reset: "รีเซ็ตเป็นค่าเริ่มต้น",
    previewHeading: "ตัวอย่าง",
    currentTheme: "ธีมปัจจุบัน",
    currentLanguage: "ภาษาปัจจุบัน",
    sample: "นี่คือหน้าตัวอย่างการตั้งค่า",
    saved: "บันทึกอัตโนมัติ",
    loading: "กำลังโหลดการตั้งค่าของคุณ…",
  },
};

export const THEME_TOKENS = {
  light: {
    bg: "#EFEDE6",
    panel: "#FBFAF6",
    border: "#D8D5C9",
    text: "#1E1D1A",
    textMuted: "#6B6A61",
    accent: "#4A3FE0",
    accentText: "#FFFFFF",
    track: "#DEDBCF",
    led: "#3FBF6B",
  },
  dark: {
    bg: "#17181C",
    panel: "#1F2126",
    border: "#33353C",
    text: "#F1EFE8",
    textMuted: "#93938D",
    accent: "#E8A33D",
    accentText: "#1A1408",
    track: "#2A2C32",
    led: "#5CE38E",
  },
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings({
          theme: parsed.theme === "dark" ? "dark" : "light",
          language: parsed.language === "th" ? "th" : "en",
        });
      }
    } catch (err) {
      // no saved settings yet, or invalid JSON — keep defaults
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      // storage unavailable (private browsing, quota, etc.)
    }
  }, [settings, isLoaded]);

  const setTheme = useCallback((theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setLanguage = useCallback((language) => {
    setSettings((prev) => ({ ...prev, language }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULTS);
  }, []);

  const value = {
    theme: settings.theme,
    language: settings.language,
    setTheme,
    setLanguage,
    resetSettings,
    isLoaded,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used inside a SettingsProvider");
  return ctx;
}
