import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blog with hidden details by default', () => {
  const blog = {
    title: 'Rich and happy',
    author: 'J.L. Curtis',
    url: 'www.loco.com',
    likes: 0,
    user: {
      name: 'Rolando',
      id: '1',
    },
  };

  render(<Blog blog={blog} user={blog.user} />);

  expect(screen.getByText(/Rich and happy/)).toBeVisible();
  expect(screen.getByText(/J\.L\. Curtis/)).toBeVisible();
  expect(screen.getByText(blog.url)).not.toBeVisible();
  expect(screen.getByText(String(blog.likes))).not.toBeVisible();
});
