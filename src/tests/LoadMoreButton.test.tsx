
import { test,vi } from "vitest";
import { fireEvent, render } from '@testing-library/react';
import LoadMoreButton from '../components/LoadMoreButton';

test('renders correctly when not loading', async () => {
  const onClickMock = vi.fn();
  const { getByRole } = render(<LoadMoreButton isLoading={false} onClick={onClickMock} />);

  const buttonElement = getByRole('button', { name: /Load more/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).not.toHaveClass('animate-spin');

  await fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
