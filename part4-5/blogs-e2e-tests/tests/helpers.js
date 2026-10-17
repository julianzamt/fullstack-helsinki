const { expect } = require('@playwright/test');

const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const addBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add new blog' }).click();

  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);

  await page.getByRole('button', { name: 'Submit' }).click();
};

const likeBlog = async (page, title, likes) => {
  const blog = page.getByTestId('blog').filter({ hasText: title });
  await blog.getByRole('button', { name: 'Show details' }).click();
  for (let count = 1; count <= likes; count++) {
    await blog.getByRole('button', { name: 'Like', exact: true }).click();
    await expect(blog.getByTestId('blog-likes')).toHaveText(`${count} Like`);
  }
};

export { loginWith, addBlog, likeBlog };
