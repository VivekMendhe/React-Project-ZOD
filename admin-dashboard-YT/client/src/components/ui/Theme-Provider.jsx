import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {'dark' | 'light' | 'system'} Theme
 */

/**
 * @typedef {{
 *   children: React.ReactNode;
 *   defaultTheme?: Theme;
 *   storageKey?: string;
 * }} ThemeProviderProps
 */

/**
 * @typedef {{
 *   theme: Theme;
 *   setTheme: (theme: Theme) => void;
 * }} ThemeProviderState
 */

/** @type {ThemeProviderState} */
const initialState = {
  theme: "system",
  setTheme: () => null,
};

/** @type {React.Context<ThemeProviderState>} */
const ThemeProviderContext = createContext(initialState);

/**
 * @param {ThemeProviderProps} props
 * @returns {JSX.Element}
 */
export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  /** @type {[Theme, React.Dispatch<React.SetStateAction<Theme>>]} */
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  /** @type {ThemeProviderState} */
  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

/**
 * @returns {ThemeProviderState}
 */
export const useTheme = () => {
  /** @type {ThemeProviderState} */
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
