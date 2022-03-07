import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const onPageClick = jest.fn();

  beforeEach(() => {
    render(<Pagination onPageClick={onPageClick}/>);
  })

  test('Renders properly with default props', () => {
    // Prev page, next page, and 5 page buttons
    const allPageButtons = screen.getAllByRole('button');
    expect(allPageButtons).toHaveLength(7);

    // The previous page button is disabled on page 1
    expect(allPageButtons[0]).toHaveAttribute('disabled');
  });

  test('Handles button click', async () => {
    const pageTwoButton = screen.getByText('2');
    await userEvent.click(pageTwoButton);

    expect(onPageClick).toHaveBeenCalledTimes(1);
    expect(onPageClick).toHaveBeenCalledWith(2);
  })
})
