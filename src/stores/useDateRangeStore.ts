import type { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * State shape for the date range store.
 */
export type DateRangeStoreState = {
  /** Map of stored date ranges. */
  storedRanges: Record<string, DateRange>;
  /** Action to update stored date ranges. */
  setStoredRange: (storedRanges: DateRangeStoreState['storedRanges']) => void;
};

/**
 * Zustand store to persist date range selections across sessions.
 */
export const useDateRangeStore = create<DateRangeStoreState>()(
  persist(
    (set) => ({
      setStoredRange: (storedRanges) => {
        set({ storedRanges });
      },
      storedRanges: {},
    }),
    {
      name: 'dateRangesStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
