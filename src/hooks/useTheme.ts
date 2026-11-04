import { useContext } from 'react';
import { ThemeProviderContext } from '../contexts';

/**
 * useTheme returns the theme context with current theme and setter.
 * Must be used within a ThemeProvider.
 *
 * @returns {Object} Theme context object
 * @returns {ThemeMode} theme - Current active theme mode (LIGHT, DARK, or SYSTEM)
 * @returns {(theme: ThemeMode) => void} setTheme - Function to update the theme
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
