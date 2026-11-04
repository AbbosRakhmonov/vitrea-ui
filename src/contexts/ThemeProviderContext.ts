import { createContext } from 'react';
import { ThemeMode } from '../enums';

/**
 * State shape for the ThemeProvider context.
 */
type ThemeProviderState = {
  /** Current active theme mode. */
  theme: ThemeMode;
  /** Function to update the theme. */
  setTheme: (theme: ThemeMode) => void;
};

/**
 * React context holding the current theme and a setter to update it.
 *
 * Use together with useTheme() hook. Defaults to system theme.
 */
export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: ThemeMode.SYSTEM,
  setTheme: () => null,
});
