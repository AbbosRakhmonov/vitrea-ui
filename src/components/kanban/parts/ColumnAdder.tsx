// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import type { ReactNode } from 'react';
import { useKanbanContext } from '../context';
import { withPrefix } from '../utils';

interface ColumnAdderProps {
  renderColumnAdder?: () => ReactNode;
}

/** Trailing "add column" slot, shown when `allowColumnAdder` is enabled. */
const ColumnAdder = ({ renderColumnAdder }: ColumnAdderProps) => {
  const { allowColumnAdder } = useKanbanContext();
  if (!allowColumnAdder) return null;
  return (
    <div className={withPrefix('column-adder')}>{renderColumnAdder?.()}</div>
  );
};

export default ColumnAdder;
