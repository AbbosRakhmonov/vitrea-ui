import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib';
import { Button } from '../button';

/**
 * Tabs root component from Radix UI.
 * Combines with TabsList, TabsTrigger, and TabsContent to build tabbed interfaces.
 */
const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  'inline-flex items-center justify-center gap-1 p-1 text-[var(--label-2)]',
  {
    variants: {
      type: {
        default: '',
        // The system segmented control (liquid-material .lq-segmented); its
        // tabs are styled in liquid-bridge.css. Radius and fill variants do
        // not apply to it.
        segmented: 'lq-segmented lq-segmented--inset h-auto p-0.5',
        line: "[&>button]:data-[state=active]:after:absolute [&>button]:data-[state=active]:after:-bottom-1.5 [&>button]:data-[state=active]:after:content-['']  [&>button]:data-[state=active]:after:w-full [&>button]:data-[state=active]:after:h-0.5 [&>button]:data-[state=active]:after:bg-primary",
      },
      variant: {
        default: '[&>button]:data-[state=active]:bg-background',
        soft: '[&>button]:data-[state=active]:bg-item-tertiary [&>button]:data-[state=active]:border [&>button]:data-[state=active]:border-alpha-strong',
      },
      rounded: {
        default: 'rounded-md [&>button]:rounded-md',
        pill: 'rounded-full [&>button]:rounded-full',
      },
    },
    defaultVariants: {
      type: 'default',
      variant: 'default',
      rounded: 'default',
    },
  }
);

/**
 * Props for TabsList component.
 * Extends Radix Tabs.List props and supports visual variants and behavior flags.
 *
 * @property {'default'|'segmented'|'line'} [type] - Visual style of the list.
 * @property {'default'|'soft'} [variant] - Coloring variant.
 * @property {'default'|'pill'} [rounded] - Border radius style.
 * @property {true} [full] - If provided, makes the list expand to full width.
 * @property {true} [scrollable] - Enables horizontal scroll with navigation buttons.
 * @property {string} [scrollButtonClassName] - Additional classes for scroll buttons.
 */
export interface TabsListProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  full?: true;
  scrollable?: true;
  scrollButtonClassName?: string;
}

/**
 * Displays a list of tab triggers with optional segmented, line, and scrollable variants.
 * When scrollable, left/right buttons appear when content overflows.
 * @returns {JSX.Element} The rendered TabsList component.
 * @component
 */
const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(
  (
    {
      className,
      rounded,
      variant,
      type,
      full,
      scrollable,
      scrollButtonClassName,
      ...props
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const checkScrollButtons = useCallback(() => {
      if (scrollContainerRef.current && scrollable) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }, [scrollable]);

    useEffect(() => {
      if (scrollable) {
        checkScrollButtons();
        const handleResize = () => checkScrollButtons();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [checkScrollButtons, scrollable]);

    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };

    if (scrollable) {
      return (
        <div className="relative flex items-center">
          {/* Left Scroll Button */}
          {showLeftButton && (
            <Button
              type="button"
              size={'icon'}
              variant="secondary"
              onClick={scrollLeft}
              className={cn(
                'absolute left-0 z-10 h-full w-6',
                scrollButtonClassName
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="text-secondary h-4 w-4" />
            </Button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: showLeftButton ? '32px' : '0',
              paddingRight: showRightButton ? '32px' : '0',
            }}
            onScroll={checkScrollButtons}
          >
            <TabsPrimitive.List
              ref={ref}
              className={cn(
                full && '!flex',
                // A full-width segmented control shares its width between the
                // tabs; without this they kept their own width, bunched in the
                // middle of a stretched track.
                full && type === 'segmented' && 'lq-segmented--fill',
                'min-w-max',
                tabsListVariants({
                  rounded: type === 'segmented' ? null : rounded,
                  variant: type === 'segmented' ? null : variant,
                  type,
                  className,
                })
              )}
              {...props}
            />
          </div>

          {/* Right Scroll Button */}
          {showRightButton && (
            <Button
              type="button"
              size={'icon'}
              variant="secondary"
              onClick={scrollRight}
              className={cn(
                'absolute right-0 z-10 h-full w-6',
                scrollButtonClassName
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="text-secondary size-4" />
            </Button>
          )}

          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      );
    }

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          full && '!flex',
          // A full-width segmented control shares its width between the
          // tabs; without this they kept their own width, bunched in the
          // middle of a stretched track.
          full && type === 'segmented' && 'lq-segmented--fill',
          tabsListVariants({
            rounded: type === 'segmented' ? null : rounded,
            variant: type === 'segmented' ? null : variant,
            type,
            className,
          })
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * A single tab trigger/button.
 * Forwards refs to Radix Tabs.Trigger.
 * @returns {JSX.Element} The rendered TabsTrigger component.
 */
const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'text-body-xs-medium relative box-border inline-flex h-7 flex-1 cursor-pointer items-center justify-center px-3 py-1 whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
      'data-[state=inactive]:hover:!bg-item-tertiary-hover data-[state=inactive]:hover:text-primary',
      'data-[state=active]:text-primary',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * Content panel associated with a TabsTrigger.
 * Forwards refs to Radix Tabs.Content.
 * @returns {JSX.Element} The rendered TabsContent component.
 */
const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
