import { type TooltipContentProps } from '@radix-ui/react-tooltip';
import { type ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

/**
 * Props for the MyTooltip component.
 */
export type MyTooltipProps = Omit<TooltipContentProps, 'content'> & {
  /** Element that triggers the tooltip. */
  children: ReactNode;
  /** Content shown inside the tooltip. */
  content: ReactNode;
  /** Whether to render the tooltip; if false, renders children only. */
  show?: boolean;
  asChild?: boolean;
};

/**
 * MyTooltip wraps children with a tooltip that can be conditionally shown.
 *
 * @param props.content - Content shown inside the tooltip.
 * @param props.children - Element that triggers the tooltip.
 * @param props.show - Whether to render the tooltip; if false, renders children only.
 * @param props.asChild - Whether to render the tooltip trigger as child element.
 * @returns {JSX.Element} Either a tooltip-wrapped element or just the children
 */
export const MyTooltip = ({
  content,
  children,
  show = true,
  asChild,
  ...props
}: MyTooltipProps) => {
  return show ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent {...props}>{content}</TooltipContent>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  ) : (
    children
  );
};
