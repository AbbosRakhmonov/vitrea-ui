import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { dayjs } from '../../lib/day';
import { Calendar } from './calendar';

describe('dayjs (lib/day)', () => {
  it('parses a string with a custom format', () => {
    const parsed = dayjs('15-11-2000', 'DD-MM-YYYY');
    expect(parsed.isValid()).toBe(true);
    expect(parsed.format('YYYY-MM-DD')).toBe('2000-11-15');
  });
});

describe('Calendar', () => {
  it('opens on the month of a formatted string value', () => {
    render(
      <Calendar mode="single" format="DD-MM-YYYY" selected="15-11-2000" />
    );
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(grid.querySelector('[data-day="2000-11-15"]')).toBeInTheDocument();
  });

  it('emits the picked day in the given format', () => {
    const onSelect = vi.fn();
    render(
      <Calendar
        mode="single"
        format="DD-MM-YYYY"
        selected="15-11-2000"
        onSelect={onSelect}
      />
    );
    const day = screen
      .getByRole('grid')
      .querySelector('[data-day="2000-11-20"] button');
    fireEvent.click(day!);
    expect(onSelect).toHaveBeenCalledWith('20-11-2000');
  });

  it('renders the current month for an unparseable value', () => {
    render(
      <Calendar mode="single" format="DD-MM-YYYY" selected="not a date" />
    );
    const today = dayjs().format('YYYY-MM-DD');
    expect(
      screen.getByRole('grid').querySelector(`[data-day="${today}"]`)
    ).toBeInTheDocument();
  });

  it('opens on defaultMonth when nothing is selected', () => {
    render(<Calendar mode="single" defaultMonth={new Date(2013, 10, 1)} />);
    expect(
      screen.getByRole('grid').querySelector('[data-day="2013-11-15"]')
    ).toBeInTheDocument();
  });

  it('keeps the navigated month when defaultMonth is re-created', () => {
    const { rerender } = render(
      <Calendar mode="single" defaultMonth={new Date(2013, 10, 1, 9)} />
    );
    fireEvent.click(screen.getByRole('button', { name: /next month/i }));
    expect(
      screen.getByRole('grid').querySelector('[data-day="2013-12-15"]')
    ).toBeInTheDocument();
    rerender(
      <Calendar mode="single" defaultMonth={new Date(2013, 10, 1, 10)} />
    );
    expect(
      screen.getByRole('grid').querySelector('[data-day="2013-12-15"]')
    ).toBeInTheDocument();
  });

  it('prefers the selected value over defaultMonth', () => {
    render(
      <Calendar
        mode="single"
        format="DD-MM-YYYY"
        selected="15-11-2000"
        defaultMonth={new Date(2013, 10, 1)}
      />
    );
    expect(
      screen.getByRole('grid').querySelector('[data-day="2000-11-15"]')
    ).toBeInTheDocument();
  });

  it('renders without a value', () => {
    render(<Calendar mode="single" />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
