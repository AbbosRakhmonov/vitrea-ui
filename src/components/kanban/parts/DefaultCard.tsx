// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import type { CardRenderProps } from '../types';
import { withPrefix } from '../utils';

/** Fallback card renderer used when a card `type` has no entry in the configMap. */
const DefaultCard = ({ data }: CardRenderProps) => (
  <div className={withPrefix('default-card')}>{data?.title}</div>
);

export default DefaultCard;
