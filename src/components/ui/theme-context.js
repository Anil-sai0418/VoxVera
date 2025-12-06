import { createContext, useContext } from "react";

export const ThemeContext = createContext(undefined);

export function useThemeConfig() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeConfig must be used within an ActiveThemeProvider");
  return ctx;
}

export default ThemeContext;
