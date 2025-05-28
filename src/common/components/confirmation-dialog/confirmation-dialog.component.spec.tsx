import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Confirm action',
    labels: {
      closeButton: 'Cancel',
      acceptButton: 'Accept',
    },
    children: <p>Are you sure you want to continue?</p>,
  };

  it('should render title, content and buttons', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...defaultProps} />);

    // Assert
    expect(screen.getByText('Confirm action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
  });

  it('should call onClose when clicking "Cancel"', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...defaultProps} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Assert
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should call onAccept and then onClose when clicking "Accept"', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...defaultProps} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    // Assert
    expect(defaultProps.onAccept).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
