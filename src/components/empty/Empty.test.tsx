import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Empty } from './Empty';

describe('Empty', () => {
  it('renders the compact default message', () => {
    render(<Empty />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders custom children in the compact layout', () => {
    render(<Empty>Nothing here</Empty>);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('switches to the rich layout with title, description and action', () => {
    render(
      <Empty
        title="No guide"
        description="Upload a PDF."
        action={<button type="button">Upload</button>}
      >
        ignored
      </Empty>
    );
    expect(screen.getByText('No guide')).toBeInTheDocument();
    expect(screen.getByText('Upload a PDF.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
    expect(screen.queryByText('ignored')).not.toBeInTheDocument();
  });
});
