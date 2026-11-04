import { useMediaQuery } from 'react-responsive';

/**
 * useMediaQuerySizes exposes a set of media query booleans for responsive breakpoints.
 *
 * @returns {Object} Breakpoint flags object
 * @returns {boolean} xxxl - True if viewport width >= 116rem (1856px)
 * @returns {boolean} xxl - True if viewport width >= 96rem (1536px)
 * @returns {boolean} xl - True if viewport width >= 80rem (1280px)
 * @returns {boolean} lg - True if viewport width >= 64rem (1024px)
 * @returns {boolean} md - True if viewport width >= 48rem (768px)
 * @returns {boolean} sm - True if viewport width >= 40rem (640px)
 * @returns {boolean} xs - True if viewport width < 40rem (640px)
 */
export const useMediaQuerySizes = () => {
  const xxxl = useMediaQuery({
    query: '(min-width: 116rem)',
  });
  const xxl = useMediaQuery({
    query: '(min-width: 96rem)',
  });
  const xl = useMediaQuery({ query: '(min-width: 80rem)' });
  const lg = useMediaQuery({ query: '(min-width: 64rem)' });
  const md = useMediaQuery({ query: '(min-width: 48rem)' });
  const sm = useMediaQuery({ query: '(min-width: 40rem)' });
  const xs = useMediaQuery({ query: '(max-width: 40rem)' });

  return {
    xxxl,
    xxl,
    xl,
    lg,
    md,
    sm,
    xs,
  };
};
