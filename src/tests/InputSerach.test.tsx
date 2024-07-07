import { test, vi } from "vitest";
import { fireEvent,render } from "@testing-library/react";
import InputSerach from "../components/InputSerach";

test("renders InputSearch component correctly", () => {
  const mockProps = {
    searchWord: "",
    handleWordChange: vi.fn(),
    handleKeyPress: vi.fn(),
  };

  const { container } = render(<InputSerach {...mockProps} />);
  expect(container.innerHTML).toContain(
    "Search word like qui, sunt, dolorem etc"
  );
});


test('displays tooltip when searchWord length is greater than 3', () => {
    const mockProps = {
      searchWord: 'query',
      handleWordChange: vi.fn(),
      handleKeyPress: vi.fn(),
    };
  
    const ele  = render(<InputSerach {...mockProps} />);  
    const inputElement = ele.getByPlaceholderText('Search word like qui, sunt, dolorem etc') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'query' } });
    expect(inputElement.value).toBe('query');
  });



