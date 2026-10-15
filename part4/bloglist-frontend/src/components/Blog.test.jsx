import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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

const user = userEvent.setup();

beforeEach(() => {
  render(<Blog blog={blog} user={blog.user} />);
});

test('renders a blog with hidden details by default', () => {
  expect(screen.getByText(/Rich and happy/)).toBeVisible();
  expect(screen.getByText(/J\.L\. Curtis/)).toBeVisible();
  expect(screen.getByText(blog.url)).not.toBeVisible();
  expect(screen.getByText(String(blog.likes))).not.toBeVisible();
});

test('a blog url and likes are shown when show details is clicked', async () => {
  const button = screen.getByText('Show details');
  await user.click(button);

  expect(screen.getByText(blog.url)).toBeVisible();
  expect(screen.getByText(String(blog.likes))).toBeVisible();
  expect(screen.getByText(blog.user.name)).toBeVisible();
});
