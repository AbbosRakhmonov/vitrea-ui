import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MyPagination } from './MyPagination';

describe('MyPagination', () => {
  it('marks the current page and calls onPageChange for another page', () => {
    const onPageChange = vi.fn();
    render(
      <MyPagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        showPageSelect={false}
      />
    );
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange for the page already shown', () => {
    const onPageChange = vi.fn();
    render(
      <MyPagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        showPageSelect={false}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('disables previous on the first page and next on the last', () => {
    const { rerender } = render(
      <MyPagination
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
        showPageSelect={false}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Go to previous page' })
    ).toBeDisabled();
    rerender(
      <MyPagination
        currentPage={3}
        totalPages={3}
        onPageChange={() => {}}
        showPageSelect={false}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Go to next page' })
    ).toBeDisabled();
  });

  it('collapses distant pages into an ellipsis', () => {
    render(
      <MyPagination
        currentPage={5}
        totalPages={10}
        onPageChange={() => {}}
        showPageSelect={false}
      />
    );
    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
  });

  it('shows the page select by default', () => {
    render(
      <MyPagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );
    expect(screen.getByText('Go to page')).toBeInTheDocument();
  });
});
