import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-neutral-950');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders with all supported types', () => {
    const types = ['default', 'status', 'indicator', 'icon'] as const;
    types.forEach((type) => {
      render(<Badge type={type}>Type-{type}</Badge>);
      const badge = screen.getByText(`Type-${type}`);
      expect(badge).toBeInTheDocument();
    });
  });

  it('renders with all supported sizes', () => {
    const sizes = ['sm', 'lg'] as const;
    sizes.forEach((size) => {
      render(<Badge size={size}>Size-{size}</Badge>);
      const badge = screen.getByText(`Size-${size}`);
      expect(badge).toBeInTheDocument();
    });
  });

  it('renders with all supported rounded options', () => {
    const options = ['default', 'full'] as const;
    options.forEach((rounded) => {
      render(<Badge rounded={rounded}>Rounded-{rounded}</Badge>);
      const badge = screen.getByText(`Rounded-${rounded}`);
      expect(badge).toBeInTheDocument();
    });
  });

  it('renders with a color variant', () => {
    render(<Badge variant="blue">Blue</Badge>);
    const badge = screen.getByText('Blue');
    expect(badge).toHaveClass('bg-blue-500');
  });

  it('renders with an outlined variant', () => {
    render(<Badge variant="blue-outlined">Outlined</Badge>);
    const badge = screen.getByText('Outlined');
    expect(badge).toHaveClass('!bg-blue-100');
  });

  it('supports rendering an icon inside', () => {
    render(
      <Badge type="icon">
        <svg role="img" aria-label="icon" />
      </Badge>
    );
    const icon = screen.getByRole('img', { name: 'icon' });
    expect(icon).toBeInTheDocument();
  });
});
