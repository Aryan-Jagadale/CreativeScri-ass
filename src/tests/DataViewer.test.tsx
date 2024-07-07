import { test } from "vitest";
import { render } from "@testing-library/react";

import DataViewer from '../components/DataViewer';

test('renders "No results" message when data is empty', () => {
  const mockProps = {
    data: [] 
  };

  const { container } = render(<DataViewer {...mockProps} />);

  
  expect(container.innerHTML).toContain('No results');
});

test('renders posts when data is provided', () => {
  const mockData = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
  ];

  const mockProps = {
    data: mockData
  };

  const { container } = render(<DataViewer {...mockProps} />);

  mockData.forEach(post => {
    expect(container.innerHTML).toContain(post.title);
  });
});
