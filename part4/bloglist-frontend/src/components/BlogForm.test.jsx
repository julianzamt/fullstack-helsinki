import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

const user = userEvent.setup();

const mockHandler = vi.fn();

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

beforeEach(() => {
  render(<BlogForm createBlog={mockHandler} />);
});

test('calls the handler with correct args when submitted', async () => {
  const title = screen.getByLabelText('title');
  const author = screen.getByLabelText('author');
  const url = screen.getByLabelText('url');
  const button = screen.getByText('Submit');

  await user.type(title, blog.title);
  await user.type(author, blog.author);
  await user.type(url, blog.url);

  await user.click(button);

  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title);
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author);
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url);
});
