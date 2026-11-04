import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-item-primary');
  });

  it('renders with each variant', () => {
    const variants = [
      'default',
      'destructive',
      'secondary',
      'tertiary',
      'ghost',
    ] as const;
    variants.forEach((variant) => {
      const { unmount } = render(
        <Button role={'button'} variant={variant}>
          Test
        </Button>
      );
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with each size', () => {
    const sizes = ['lg', 'default', 'sm', 'xs', 'icon'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(
        <Button role={'button'} size={size}>
          Size
        </Button>
      );
      const button = screen.getByRole('button', { name: 'Size' });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(
      <Button role={'button'} className="custom-class">
        Click
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Click' });
    expect(button).toHaveClass('custom-class');
  });

  it('handles click events', () => {
    const handleClick = vi.fn(); // Use jest.fn() if you're using Jest
    render(
      <Button role={'button'} onClick={handleClick}>
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when 'disabled' prop is set", () => {
    render(
      <Button role={'button'} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', {
      name: 'Disabled',
    }) as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  it('renders using Slot when asChild is true', () => {
    render(
      <Button asChild role={'link'}>
        <a href="/test">Link</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});
