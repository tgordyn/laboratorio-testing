import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import { usePromiseTracker } from 'react-promise-tracker';
import { vi, Mock } from 'vitest';


vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('SpinnerComponent', () => {
  it('should render the spinner when promise is in progress', () => {
    // Arrange
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: true });

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('should not render the spinner when promise is not in progress', () => {
    // Arrange
    (usePromiseTracker as Mock).mockReturnValue({ promiseInProgress: false });

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
