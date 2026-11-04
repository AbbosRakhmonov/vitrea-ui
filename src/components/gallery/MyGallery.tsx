import { saveAs } from 'file-saver';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import {
  type HTMLAttributes,
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '../../lib';

/**
 * Interface representing an image item in the gallery.
 */
export interface GalleryItem {
  /** Unique identifier for the image. */
  id: string;
  /** URL of the full-resolution image. */
  src: string;
  /** URL of the thumbnail image. */
  thumbnail: string;
  /** Alt text for the image. */
  alt: string;
  /** Optional title or description for the image. */
  title?: string;
}

/**
 * Props for the Thumbnail component.
 */
export interface ThumbnailProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The gallery item to display as a thumbnail. */
  image: GalleryItem;
  /** The index of the item in the gallery. */
  index: number;
  /** Callback executed when the thumbnail is clicked. */
  onClick: (index: number) => void;
  /** URL used when the thumbnail image fails to load. */
  fallbackImage?: string;
}

/**
 * Interface representing a custom action button in the fullscreen view.
 */
export interface GalleryActionButton {
  /** Icon to display on the button. */
  icon: ReactNode;
  /** Label for the button (used as title/tooltip). */
  label: string;
  /** Callback executed when the button is clicked. */
  onClick: (image: GalleryItem) => void;
  /** Custom CSS class name for the button. */
  className?: string;
}

/**
 * Props for the MyGallery component.
 */
export type MyGalleryProps = HTMLAttributes<HTMLDivElement> & {
  /** Array of gallery items to display. */
  images: GalleryItem[];
  /** Additional props to pass to each thumbnail component. */
  thumbnailProps?: ThumbnailProps;
  /** URL used when an image fails to load. */
  fallbackImage?: string;
  /** Custom action buttons rendered in fullscreen. */
  actionButtons?: GalleryActionButton[];
  /** Whether to show image title overlay on thumbnails. */
  hasInfo?: true;
};

/**
 * Creates the default action buttons for the gallery fullscreen view.
 * @returns {GalleryActionButton[]} Array containing the default download button
 */
const createDefaultActions = (): GalleryActionButton[] => [
  {
    icon: <Download size={20} />,
    onClick: (image) => {
      saveAs(image.src, image.title);
    },
    label: 'Download',
  },
];

/**
 * FullscreenImage component that displays an image with fallback support.
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for the image
 * @param {string} [props.fallbackImage] - URL to use if the main image fails to load
 * @returns {JSX.Element} An img element with error handling
 */
const FullscreenImage = memo(
  ({
    src,
    alt,
    fallbackImage,
  }: {
    src: string;
    alt: string;
    fallbackImage?: string;
  }) => {
    const [imgError, setImgError] = useState(false);

    const handleError = () => {
      setImgError(true);
    };

    return (
      <img
        src={imgError && fallbackImage ? fallbackImage : src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onError={handleError}
      />
    );
  }
);

/**
 * Thumbnail component that displays a clickable gallery image preview.
 * @param {ThumbnailProps} props - Component props
 * @returns {JSX.Element} A clickable thumbnail with error handling
 */
const Thumbnail = memo(
  ({
    image,
    index,
    onClick,
    fallbackImage,
    className,
    ...props
  }: ThumbnailProps) => {
    const [imgError, setImgError] = useState(false);

    const handleError = () => {
      setImgError(true);
    };

    return (
      <div
        {...props}
        key={image.id}
        className={cn(
          'aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-80',
          className
        )}
        onClick={() => onClick(index)}
      >
        <img
          src={
            imgError && fallbackImage
              ? fallbackImage
              : image.thumbnail || image.src
          }
          alt={image.alt || `Image ${index + 1}`}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      </div>
    );
  }
);

// Main component implementation
/**
 * MyGallery displays a grid of image thumbnails with an immersive fullscreen viewer.
 * Includes keyboard navigation, download action, optional info overlay, and fallbacks.
 *
 * @param props.images - Array of gallery items to display.
 * @param props.thumbnailProps - Additional props to pass to each thumbnail component.
 * @param props.fallbackImage - URL used when an image fails to load.
 * @param props.actionButtons - Custom action buttons rendered in fullscreen.
 * @param props.hasInfo - Whether to show image title overlay on thumbnails.
 * @returns {JSX.Element} A gallery component with thumbnail grid and fullscreen viewer
 */
const MyGalleryComponent = ({
  images,
  thumbnailProps,
  actionButtons = [],
  fallbackImage,
  className,
  hasInfo,
  ...props
}: MyGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Memoize default actions to prevent recreation on each render
  const defaultActions = useMemo(() => createDefaultActions(), []);

  // Memoize combined action buttons
  const allActionButtons = useMemo(
    () => [...defaultActions, ...actionButtons],
    [defaultActions, actionButtons]
  );

  // Memoize event handlers to prevent recreation on each render
  const openFullscreen = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToPrevious, goToNext, closeFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Memoize currentImage to prevent unnecessary calculations
  const currentImage = useMemo(
    () => (selectedIndex !== null ? images[selectedIndex] : null),
    [selectedIndex, images]
  );

  // Memoized FullscreenView component
  const FullscreenView = useMemo(() => {
    if (!isFullscreen || !currentImage) return null;

    return (
      <div className="bg-opacity-95 bg-bg fixed inset-0 z-50 flex flex-col items-center justify-center">
        <div
          className={
            'absolute top-0 flex w-full items-start justify-between p-3'
          }
        >
          <div>
            {currentImage.title && (
              <h2 className="text-body-lg-semi-bold">{currentImage.title}</h2>
            )}
          </div>

          {/* Top Bar with Actions and Close */}
          <div className="flex items-center gap-4 py-1">
            {/* Action Buttons */}
            {allActionButtons.map((action, index) => (
              <button
                key={index}
                onClick={() => action.onClick(currentImage)}
                className="cursor-pointer"
                title={action.label}
              >
                {action.icon}
              </button>
            ))}

            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="cursor-pointer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Left Navigation */}
        {(selectedIndex || 0) > 0 && (
          <button
            onClick={goToPrevious}
            className="bg-opacity-50 hover:bg-opacity-70 bg-bg text-secondary absolute top-1/2 left-2 z-50 -translate-y-1/2 rounded-full p-3 transition-all"
            title="Previous (←)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Navigation */}
        {(selectedIndex || 0) < images.length - 1 && (
          <button
            onClick={goToNext}
            className="bg-opacity-0 hover:bg-opacity-100 text-secondary bg-bg absolute top-1/2 right-2 z-50 -translate-y-1/2 rounded-full p-3 transition-all"
            title="Next (→)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="flex max-h-full max-w-full items-center justify-center overflow-hidden p-8">
          <FullscreenImage
            src={currentImage.src}
            alt={currentImage.alt || `Image ${selectedIndex}`}
            fallbackImage={fallbackImage}
          />
        </div>

        <div className={'bg-bg absolute bottom-0 w-full'}>
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className={cn(
                    `hover:border-item-primary h-16 min-w-16 shrink-0 cursor-pointer rounded border-3 border-transparent transition-all`,
                    index == selectedIndex && 'border-item-primary'
                  )}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className="size-full object-cover"
                    onError={(e) => {
                      if (fallbackImage) {
                        e.currentTarget.src = fallbackImage;
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }, [
    isFullscreen,
    fallbackImage,
    currentImage,
    allActionButtons,
    closeFullscreen,
    selectedIndex,
    goToPrevious,
    images,
    goToNext,
  ]);

  return (
    <div className={'w-full'}>
      <div
        {...props}
        className={cn(
          'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
          className
        )}
      >
        {images.map((image, index) => (
          <div className={'relative'} key={image.id}>
            <Thumbnail
              {...thumbnailProps}
              image={image}
              index={index}
              onClick={openFullscreen}
              fallbackImage={fallbackImage}
            />
            {hasInfo && image.title && (
              <div
                className={
                  'bg-bg/70 absolute bottom-0 flex min-h-10 w-full items-center justify-center text-center'
                }
              >
                {image.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {FullscreenView}
    </div>
  );
};

/**
 * Memoized MyGallery component.
 */
export const MyGallery = memo(MyGalleryComponent);
