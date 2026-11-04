import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import { Button, type ButtonProps } from '../button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

/**
 * @typedef {object} CarouselProps
 * @property {CarouselOptions} [opts] - Options for the Embla Carousel.
 * @property {CarouselPlugin} [plugins] - Plugins for the Embla Carousel.
 * @property {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the carousel.
 * @property {(api: CarouselApi) => void} [setApi] - Callback to get the Embla Carousel API.
 */
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

/**
 * @typedef {object} CarouselContextProps
 * @property {ReturnType<typeof useEmblaCarousel>[0]} carouselRef - The ref for the carousel container.
 * @property {ReturnType<typeof useEmblaCarousel>[1]} api - The Embla Carousel API instance.
 * @property {() => void} scrollPrev - Function to scroll to the previous slide.
 * @property {() => void} scrollNext - Function to scroll to the next slide.
 * @property {boolean} canScrollPrev - Indicates if there is a previous slide to scroll to.
 * @property {boolean} canScrollNext - Indicates if there is a next slide to scroll to.
 */
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * Custom hook to access the Carousel context.
 * @returns {CarouselContextProps} The carousel context.
 * @throws {Error} if used outside of a Carousel component.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

/**
 * A flexible and extensible carousel component built with Embla Carousel.
 * @augments {React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & CarouselProps & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The props for the Carousel component.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - The orientation of the carousel.
 * @param {CarouselOptions} [props.opts] - Options for the Embla Carousel.
 * @param {(api: CarouselApi) => void} [props.setApi] - Callback to get the Embla Carousel API.
 * @param {CarouselPlugin} [props.plugins] - Plugins for the Embla Carousel.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.children] - The child elements to be rendered within the carousel.
 * @returns {JSX.Element} The Carousel component.
 */
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    // A stable context value keeps the carousel's children (content, items,
    // prev / next buttons) from re-rendering on every Carousel render.
    const contextValue = React.useMemo(
      () => ({
        carouselRef,
        api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      ]
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

/**
 * Renders the content of the carousel.
 * @augments {React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The props for the CarouselContent component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.children] - The child elements (CarouselItems) to be rendered.
 * @returns {JSX.Element} The CarouselContent component.
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

/**
 * Represents an individual item or slide within the CarouselContent.
 * @augments {React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The props for the CarouselItem component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {React.ReactNode} [props.children] - The content of the carousel item.
 * @returns {JSX.Element} The CarouselItem component.
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

/**
 * Navigation button for the carousel to go to the previous slide.
 * @augments {React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>}
 * @param {object} props - The props for the CarouselPrevious component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'} [props.variant='outline'] - The visual style of the button.
 * @param {'default' | 'sm' | 'lg' | 'icon'} [props.size='icon'] - The size of the button.
 * @returns {JSX.Element} The CarouselPrevious component.
 */
const CarouselPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'icon', ...props }, ref) => {
    const { t } = useTranslation();
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? 'top-1/2 -left-12 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">{t('Previous slide')}</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

/**
 * Navigation button for the carousel to go to the next slide.
 * @augments {React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>}
 * @param {object} props - The props for the CarouselNext component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'} [props.variant='outline'] - The visual style of the button.
 * @param {'default' | 'sm' | 'lg' | 'icon'} [props.size='icon'] - The size of the button.
 * @returns {JSX.Element} The CarouselNext component.
 */
const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'icon', ...props }, ref) => {
    const { t } = useTranslation();
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? 'top-1/2 -right-12 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">{t('Next slide')}</span>
      </Button>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  type CarouselProps,
};
