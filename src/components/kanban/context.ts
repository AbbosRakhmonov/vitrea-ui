// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import { createContext, useContext } from 'react';
import type { KanbanSharedProps } from './types';

export const KanbanContext = createContext<KanbanSharedProps | undefined>(
  undefined
);

/** Reads the shared board configuration. Throws outside a Kanban board. */
export const useKanbanContext = (): KanbanSharedProps => {
  const context = useContext(KanbanContext);
  if (!context)
    throw new Error('useKanbanContext must be used within a Kanban board');
  return context;
};
