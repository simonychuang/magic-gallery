import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardDetails } from './CardDetails';

describe('CardDetails', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    render(<CardDetails cardName='test' cardImage='test.png' onClose={onClose}/>);
  })

  test('Renders the image element', () => {
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test.png');
    expect(imgElement).toHaveAttribute('alt', 'test-image');
  })

  test('Handles onClose', async () => {
    const imgElement = screen.getByRole('img');

    await userEvent.click(imgElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  })
})
