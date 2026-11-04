import type { HTMLAttributes } from 'react';
import styled from 'styled-components';
import type { ElementDataType } from '../../types';

const FilepondWrapper = styled.div<{ $invalid: boolean }>`
  .filepond {
    &--drop-label {
      label {
        color: ${({ $invalid }) =>
          $invalid
            ? 'var(--color-item-primary-destructive)'
            : 'inherit'} !important;
      }
    }

    &--root {
      margin-bottom: 0.5rem;
      border-radius: 0.75rem;
    }

    &--panel {
      border-radius: 0.8rem;
      overflow: hidden;

      &-root {
        background-color: transparent;
      }
    }

    &--drip {
      border: 1px solid
        ${({ $invalid }) =>
          $invalid
            ? 'var(--color-item-primary-destructive)'
            : 'var(--color-border-alpha-strong)'};
      background-color: transparent;
      opacity: 1;
      outline-offset: 2px;
      border-radius: 0.75rem;
    }
  }

  &:focus-within {
    .filepond {
      &--drip {
        outline: 2px solid
          ${({ $invalid }) =>
            $invalid
              ? 'var(--color-item-primary-destructive)'
              : 'var(--color-item-primary-primary)'};
      }
    }
  }
`;

/**
 * Props for FilepondContainer component wrapper.
 * Extends standard div HTML attributes.
 *
 * @property {'default' | 'failure'} [variant='default'] - Visual state; when set to 'failure', the inner FilePond drip/label uses destructive colors.
 */
type FilepondContainerProps = HTMLAttributes<HTMLDivElement> &
  ElementDataType & {
    variant?: 'default' | 'failure';
  };

/**
 * Styled wrapper for FilePond root container that adapts styles based on validation state.
 *
 * @component
 * @param {FilepondContainerProps} props - Component props.
 * @param {'default'|'failure'} [props.variant='default'] - Controls error visualization.
 * @returns {JSX.Element}
 */
function FilepondContainer({
  variant = 'default',
  ...props
}: FilepondContainerProps) {
  return <FilepondWrapper $invalid={variant === 'failure'} {...props} />;
}

FilepondContainer.displayName = 'FilepondContainer';

export { FilepondContainer, type FilepondContainerProps };
