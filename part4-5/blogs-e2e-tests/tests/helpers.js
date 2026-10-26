const { expect } = require('@playwright/test');

const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: 'Login', exact: true }).click();
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const addBlog = async (page, title, author, url) => {
  await page.getByRole('link', { name: 'Add Blog', exact: true }).click();

  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('link', { name: `${title} ${author}`, exact: true })).toBeVisible();
};

const likeBlog = async (page, title, likes) => {
  await page.getByRole('link').filter({ hasText: title }).click();
  for (let count = 1; count <= likes; count++) {
    await page.getByRole('button', { name: 'Like', exact: true }).click();
    await expect(page.getByTestId('blog-likes')).toHaveText(`${count} Like`);
  }
  await page.getByRole('link', { name: 'Home', exact: true }).click();
};

export { loginWith, addBlog, likeBlog };
