import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage, avatarVariants } from './avatar';

describe('Avatar Component', () => {
  describe('Avatar', () => {
    it('renders without crashing', () => {
      render(<Avatar data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('applies default size variant', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('size-10');
    });

    it('applies correct size variants', () => {
      const sizes = ['sm', 'default', 'md', 'lg', 'xl'] as const;
      const expectedClasses = {
        sm: ['size-8'],
        default: ['size-10'],
        md: ['size-13'],
        lg: ['size-16'],
        xl: ['size-20'],
      };

      sizes.forEach((size) => {
        const { unmount } = render(
          <Avatar size={size} data-testid={`avatar-${size}`} />
        );
        const avatar = screen.getByTestId(`avatar-${size}`);

        expectedClasses[size].forEach((className) => {
          expect(avatar).toHaveClass(className);
        });

        unmount();
      });
    });

    it('applies base classes', () => {
      render(<Avatar data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass(
        'relative',
        'flex',
        'shrink-0',
        'overflow-hidden',
        'rounded-full'
      );
    });

    it('accepts and applies custom className', () => {
      render(<Avatar className="custom-class" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Avatar ref={ref} data-testid="avatar" />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current).toBe(screen.getByTestId('avatar'));
    });

    it('passes through additional props', () => {
      render(
        <Avatar data-testid="avatar" aria-label="User avatar" role="img" />
      );
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('has correct display name', () => {
      // Assuming Radix UI Root has displayName, we check if it's preserved
      expect(Avatar.displayName).toBeDefined();
    });
  });

  describe('AvatarImage', () => {
    it('has correct display name', () => {
      expect(AvatarImage.displayName).toBeDefined();
    });
  });

  describe('AvatarFallback', () => {
    it('renders fallback content', () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>
      );

      const fallback = screen.getByTestId('fallback');
      expect(fallback).toHaveClass(
        'flex',
        'size-full',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-muted'
      );
    });

    it('accepts and applies custom className', () => {
      render(
        <Avatar>
          <AvatarFallback
            className="custom-fallback-class"
            data-testid="fallback"
          >
            JD
          </AvatarFallback>
        </Avatar>
      );

      const fallback = screen.getByTestId('fallback');
      expect(fallback).toHaveClass('custom-fallback-class');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLSpanElement>();
      render(
        <Avatar>
          <AvatarFallback ref={ref}>JD</AvatarFallback>
        </Avatar>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('renders complex content', () => {
      render(
        <Avatar>
          <AvatarFallback>
            <span data-testid="icon">👤</span>
            <span>User</span>
          </AvatarFallback>
        </Avatar>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(AvatarFallback.displayName).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('shows fallback when image fails to load', async () => {
      render(
        <Avatar>
          <AvatarImage src="/non-existent-image.jpg" alt="Test image" />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      );

      // Initially, fallback might be visible (depending on Radix UI implementation)
      // In a real scenario, you might need to simulate image load failure
      await waitFor(() => {
        expect(screen.getByText('FB')).toBeInTheDocument();
      });
    });

    it('works with different size variants and content', () => {
      render(
        <div>
          <Avatar size="sm" data-testid="small-avatar">
            <AvatarImage src="/small.jpg" alt="Small" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>

          <Avatar size="lg" data-testid="large-avatar">
            <AvatarImage src="/large.jpg" alt="Large" />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </div>
      );

      const smallAvatar = screen.getByTestId('small-avatar');
      const largeAvatar = screen.getByTestId('large-avatar');

      expect(smallAvatar).toHaveClass('size-8');
      expect(largeAvatar).toHaveClass('size-16');
    });

    it('handles custom styling on all components', () => {
      render(
        <Avatar
          className="border-2 border-blue-500"
          size="md"
          data-testid="styled-avatar"
        >
          <AvatarImage
            src="/test.jpg"
            alt="Test"
            className="object-cover grayscale"
          />
          <AvatarFallback className="bg-red-500 font-bold text-white">
            ST
          </AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByTestId('styled-avatar');
      expect(avatar).toHaveClass('border-2', 'border-blue-500', 'size-13');

      const fallback = screen.getByText('ST');
      expect(fallback).toHaveClass('bg-red-500', 'text-white', 'font-bold');
    });
  });

  describe('avatarVariants', () => {
    it('generates correct classes for each size variant', () => {
      expect(avatarVariants({ size: 'sm' })).toContain('size-8');
      expect(avatarVariants({ size: 'default' })).toContain('size-10');
      expect(avatarVariants({ size: 'md' })).toContain('size-13');
      expect(avatarVariants({ size: 'lg' })).toContain('size-16');
      expect(avatarVariants({ size: 'xl' })).toContain('size-20');
    });

    it('includes base classes', () => {
      const result = avatarVariants();
      expect(result).toContain('relative');
      expect(result).toContain('flex');
      expect(result).toContain('shrink-0');
      expect(result).toContain('overflow-hidden');
      expect(result).toContain('rounded-full');
    });

    it('uses default variant when no size specified', () => {
      const result = avatarVariants();
      expect(result).toContain('size-10');
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(
        <Avatar
          role="img"
          aria-label="User profile picture"
          data-testid="accessible-avatar"
        >
          <AvatarImage src="/profile.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );

      const avatar = screen.getByTestId('accessible-avatar');
      expect(avatar).toHaveAttribute('role', 'img');
      expect(avatar).toHaveAttribute('aria-label', 'User profile picture');
    });
  });
});
