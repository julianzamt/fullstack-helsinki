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

test('unauthenticated users see blog information and likes but no buttons', () => {
  render(<Blog blog={blog} user={null} />);

  expect(screen.getByText(/Rich and happy/)).toBeVisible();
  expect(screen.getByText(/J\.L\. Curtis/)).toBeVisible();
  expect(screen.getByText(blog.url)).toBeVisible();
  expect(screen.getByText(blog.user.name)).toBeVisible();
  expect(screen.getByTestId('blog-likes')).toBeVisible();
  expect(screen.getByTestId('blog-likes')).toHaveTextContent(/^0\s+Likes$/);
  expect(screen.queryAllByRole('button')).toHaveLength(0);
});

test('authenticated users who are not the creator see only the like button', () => {
  render(<Blog blog={blog} user={{ id: '2', name: 'Another user' }} />);

  expect(screen.getByRole('button', { name: 'Like' })).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('button')).toHaveLength(1);
});

test('the blog creator sees both the like and delete buttons', () => {
  render(<Blog blog={blog} user={blog.user} />);

  expect(screen.getByRole('button', { name: 'Like' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Delete' })).toBeVisible();
  expect(screen.getAllByRole('button')).toHaveLength(2);
});

test('clicking twice on the like button calls its eventHandler twice', async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();
  render(<Blog blog={blog} user={blog.user} likeBlog={mockHandler} />);
  const button = screen.getByRole('button', { name: 'Like' });

  await user.click(button);
  await user.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(2);
  expect(mockHandler).toHaveBeenNthCalledWith(1, blog);
  expect(mockHandler).toHaveBeenNthCalledWith(2, blog);
});
