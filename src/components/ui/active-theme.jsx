import { useEffect, useState } from "react";
import { ThemeContext } from "./theme-context";

const THEME_STORAGE_KEY = "app-theme";
const DEFAULT_THEME = "default";

export function ActiveThemeProvider({ children, initialTheme }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored || initialTheme || DEFAULT_THEME;
    }
    return initialTheme || DEFAULT_THEME;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    // persist
    try {
      localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch {
      // ignore write errors (e.g. private mode)
    }

    // normalize theme classes on <html>
    const root = document.documentElement;
    const toRemove = Array.from(root.classList).filter((c) => c.startsWith("theme-"));
    if (toRemove.length) root.classList.remove(...toRemove);
    root.classList.add(`theme-${activeTheme}`);
      // Optional extra class when needed
      if (activeTheme.endsWith("-scaled")) {
        root.classList.add("theme-scaled");
      }

      // Only update accent/text/muted variables — do not change page/background colors.
      const palette = {
        default: { "--primary": "#2563eb", "--text": "#0f172a", "--muted": "#6b7280" },
        blue: { "--primary": "#60a5fa", "--text": "#e6f0ff", "--muted": "#9fb3d9" },
        green: { "--primary": "#34d399", "--text": "#e6fff7", "--muted": "#7bd3aa" },
        amber: { "--primary": "#f59e0b", "--text": "#78350f", "--muted": "#b45309" },
        rose: { "--primary": "#fb7185", "--text": "#521827", "--muted": "#fca5a5" },
        red: { "--primary": "#ef4444", "--text": "#58151b", "--muted": "#f87171" },
        yellow: { "--primary": "#facc15", "--text": "#4b2e00", "--muted": "#fef08a" },
        violet: { "--primary": "#7c3aed", "--text": "#2a0d3a", "--muted": "#c4b5fd" },
        purple: { "--primary": "#8b5cf6", "--text": "#230a4a", "--muted": "#c7b5ff" },
        orange: { "--primary": "#fb923c", "--text": "#4a2705", "--muted": "#fdba74" },
        teal: { "--primary": "#14b8a6", "--text": "#064e3b", "--muted": "#0f766e" },
        mono: { "--primary": "#9ca3af", "--text": "#e5e7eb", "--muted": "#9ca3af" },
        scaled: { "--primary": "#2563eb", "--text": "#0f172a", "--muted": "#6b7280" },
      };

      const vars = palette[activeTheme] || palette.default;
      Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ActiveThemeProvider;