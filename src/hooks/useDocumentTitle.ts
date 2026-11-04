import { useEffect, useRef } from 'react';

/**
 * useDocumentTitle sets document.title and optionally restores it on unmount.
 *
 * @param title - Title to set.
 * @param restoreOnUnmount - Whether to restore previous title on unmount (default false).
 * @returns {void}
 */
export const useDocumentTitle = (
  title: string,
  restoreOnUnmount: boolean = false
): void => {
  const previousTitleRef = useRef<string>(document.title);

  useEffect(() => {
    if (restoreOnUnmount && previousTitleRef.current === document.title) {
      previousTitleRef.current = document.title;
    }

    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = previousTitleRef.current;
      }
    };
  }, [title, restoreOnUnmount]);
};
