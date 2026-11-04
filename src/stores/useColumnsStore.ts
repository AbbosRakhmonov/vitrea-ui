import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * State shape for the columns store.
 */
export type ColumnsStoreState = {
  /** Map of stored column visibilities keyed by table key. */
  storedColumns: Record<string, Record<string, boolean>>;
  /** Action to update stored columns. */
  setColumns: (storedColumns: ColumnsStoreState['storedColumns']) => void;
};

/**
 * Zustand store to persist column visibility settings across sessions.
 */
export const useColumnsStore = create<ColumnsStoreState>()(
  persist(
    (set) => ({
      setColumns: (storedColumns) => {
        set({ storedColumns });
      },
      storedColumns: {},
    }),
    {
      name: 'columnsStore',
    }
  )
);
