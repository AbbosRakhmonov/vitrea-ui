import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProviderContext } from '../contexts';
import { ThemeMode } from '../enums';

/**
 * Props for the ThemeProvider component.
 */
export type ThemeProviderProps = {
  /** The content to be wrapped by the provider. */
  children: ReactNode;
  /** The default theme to use if no preferred theme is stored. Defaults to SYSTEM. */
  defaultTheme?: ThemeMode;
  /** The key used to store the theme preference in localStorage. Defaults to "theme". */
  storageKey?: string;
};

/**
 * ThemeProvider manages the application's theme state.
 * It syncs the theme with localStorage and applies the corresponding CSS class to the document root.
 *
 * @param props.children - Child components.
 * @param props.defaultTheme - Default theme mode.
 * @param props.storageKey - Local storage key for persistence.
 * @returns {JSX.Element} Context provider wrapping children with theme state
 */
export function ThemeProvider({
  children,
  defaultTheme = ThemeMode.SYSTEM,
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(
    () => (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(ThemeMode.LIGHT, ThemeMode.DARK);
    if (theme === ThemeMode.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;

      root.classList.add(systemTheme);
      setThemeState(systemTheme);
      return;
    }

    root.style.colorScheme = theme;
    root.classList.add(theme);
  }, [theme]);

  // A stable setter: a new identity each render would re-run the deps and
  // memoized callbacks of every useTheme() consumer under this app-wide provider.
  const setTheme = useCallback(
    (next: ThemeMode) => {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey]
  );

  // A stable context value: without this, every consumer re-renders on each
  // ThemeProvider render even when the theme has not changed.
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
