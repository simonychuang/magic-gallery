import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';

describe('HomePage', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Search bar', async () => {
    const searchBar = screen.getByPlaceholderText('Search for a card name');

    // Search bar exists
    expect(searchBar).toBeInTheDocument();

    // Test typing 'Test' into search
    await userEvent.type(searchBar, 'Test');
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
    userEvent.click(redCheckbox);
    expect(redCheckbox.checked).toEqual(true);
    userEvent.click(blueCheckbox);
    expect(blueCheckbox.checked).toEqual(true);
  });

  test('Renders Search button', () => {
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
