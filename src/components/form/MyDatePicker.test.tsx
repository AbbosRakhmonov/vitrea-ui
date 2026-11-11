import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';
import { Form } from '../../ui/form';
import { MyDatePicker, type MyDatePickerProps } from './MyDatePicker';

type Values = { date: Date | string | undefined };

let current: () => Values;

const Harness = ({
  defaultValue,
  ...props
}: Partial<MyDatePickerProps<Values>> & { defaultValue?: Values['date'] }) => {
  const form = useForm<Values>({ defaultValues: { date: defaultValue } });
  current = form.getValues;
  return (
    <Form {...form}>
      <MyDatePicker<Values> {...props} control={form.control} name="date" />
    </Form>
  );
};

const open = () => fireEvent.click(screen.getByRole('textbox'));
const day = (iso: string) =>
  document.querySelector(`[data-day="${iso}"] button`) as HTMLButtonElement;

describe('MyDatePicker', () => {
  it('keeps a Date value when valueFormat is not set', () => {
    render(
      <Harness defaultValue={new Date(2000, 10, 15)} format="DD/MM/YYYY" />
    );
    expect(screen.getByRole('textbox')).toHaveValue('15/11/2000');
    open();
    fireEvent.click(day('2000-11-20'));
    const value = current().date;
    expect(value).toBeInstanceOf(Date);
    expect((value as Date).getDate()).toBe(20);
  });

  it('reads and writes a string in valueFormat', () => {
    render(
      <Harness
        defaultValue="15-11-2000"
        valueFormat="DD-MM-YYYY"
        format="DD.MM.YYYY"
      />
    );
    expect(screen.getByRole('textbox')).toHaveValue('15.11.2000');
    open();
    expect(day('2000-11-15')).toBeInTheDocument();
    fireEvent.click(day('2000-11-20'));
    expect(current().date).toBe('20-11-2000');
    expect(screen.getByRole('textbox')).toHaveValue('20.11.2000');
  });

  it('shows an empty input for an unparseable value', () => {
    render(<Harness defaultValue="not a date" valueFormat="DD-MM-YYYY" />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('blocks the days matched by disabledDates', () => {
    render(
      <Harness
        defaultValue="15-11-2000"
        valueFormat="DD-MM-YYYY"
        disabledDates={{ after: new Date(2000, 10, 17) }}
      />
    );
    open();
    expect(day('2000-11-20')).toBeDisabled();
    expect(day('2000-11-16')).toBeEnabled();
  });

  it('keeps the icon in the input box, apart from the error message', () => {
    render(<Harness />);
    const input = screen.getByRole('textbox');
    const box = input.closest('div.relative')!.parentElement!;
    expect(box.querySelector('svg')).toBeInTheDocument();
    expect(box.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders the helper text', () => {
    render(<Harness helperText="At least 13 years old" />);
    expect(screen.getByText('At least 13 years old')).toBeInTheDocument();
  });
});
