import { fireEvent, render, screen } from '@testing-library/react';
import { App } from '../../App';

describe('HomePage', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Search bar', () => {
    const searchBar = screen.getByPlaceholderText('Search for a card name');

    // Search bar exists
    expect(searchBar).toBeInTheDocument();

    // Test typing 'Test' into search
    fireEvent.change(searchBar, {
      target: { value: 'Test' },
    });
    expect(searchBar).toHaveAttribute('value', 'Test');
  });

  test('Check boxes', () => {
    const redCheckbox = screen.getByLabelText('Red');
    const blueCheckbox = screen.getByLabelText('Blue');

    // Check boxes exist
    expect(redCheckbox).toBeInTheDocument();
    expect(blueCheckbox).toBeInTheDocument();
    expect(screen.getByLabelText('Black')).toBeInTheDocument();
    expect(screen.getByLabelText('White')).toBeInTheDocument();
    expect(screen.getByLabelText('Green')).toBeInTheDocument();

    expect(redCheckbox.checked).toEqual(false);
    expect(blueCheckbox.checked).toEqual(false);

    // Test clicking on checkboxes
    fireEvent.click(redCheckbox);
    expect(redCheckbox.checked).toEqual(true);
    fireEvent.click(blueCheckbox);
    expect(blueCheckbox.checked).toEqual(true);
  });

  test('Renders Search button', () => {
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
