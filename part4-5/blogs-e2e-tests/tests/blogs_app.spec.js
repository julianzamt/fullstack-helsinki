const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, addBlog, likeBlog } = require('./helpers');

describe('Blogs app', () => {
  beforeEach(async ({ page, request }) => {
    const reset = await request.post('/api/testing/reset');
    expect(reset.ok()).toBeTruthy();
    const createdUser = await request.post('/api/users', {
      data: {
        name: 'Juan',
        username: 'juan',
        password: 'pepe',
      },
    });

    expect(createdUser.ok()).toBeTruthy();
    await page.goto('/');
  });

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Blogs')).toBeVisible();
  });

  describe('Login', () => {
    test('user can log in', async ({ page }) => {
      await loginWith(page, 'juan', 'pepe');
      await expect(page.getByText('Juan is logged in')).toBeVisible();
    });

    test('user cannot log in with wrong password', async ({ page }) => {
      await loginWith(page, 'juan', 'pipe');
      await expect(page.getByText('Wrong username or password')).toBeVisible();
      await expect(page.getByText('Juan is logged in')).not.toBeVisible();
    });
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'juan', 'pepe');
    });

    test('a new blog can be added', async ({ page }) => {
      await addBlog(page, 'a blog test', 'playwright', 'www.playwright.com');
      await expect(page.getByText('a blog test playwright')).toBeVisible();
    });

    describe('...and a blog is added', async () => {
      beforeEach(async ({ page }) => {
        await addBlog(page, 'a blog test', 'playwright', 'www.playwright.com');
        await page.getByRole('link', { name: 'a blog test playwright', exact: true }).click();
      });

      test('unauthenticated users see blog information and likes but no buttons', async ({ page }) => {
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.getByRole('heading', { name: 'playwright: a blog test' })).toBeVisible();
        await expect(page.getByText('www.playwright.com', { exact: true })).toBeVisible();
        await expect(page.getByText('Juan', { exact: true })).toBeVisible();
        await expect(page.getByTestId('blog-likes')).toHaveText('0 Likes');
        await expect(page.getByRole('button')).toHaveCount(0);
      });

      test('the creator sees both the like and delete buttons', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Like', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();
      });

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'Like', exact: true }).click();
        await expect(page.getByTestId('blog-likes')).toHaveText('1 Like');
      });

      test('it can be deleted', async ({ page }) => {
        page.once('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm');
          await dialog.accept();
        });

        await page.getByRole('button', { name: 'Delete' }).click();

        await expect(page).toHaveURL('http://localhost:5174/');
        await expect(page.getByRole('link', { name: 'a blog test playwright', exact: true })).toHaveCount(0);
      });

      test('deletion can be cancelled', async ({ page }) => {
        page.once('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm');
          await dialog.dismiss();
        });

        await page.getByRole('button', { name: 'Delete' }).click();

        await expect(page.getByRole('heading', { name: 'playwright: a blog test' })).toBeVisible();
      });

      test('other than the blog creator cannot see the delete button', async ({
        page,
        request,
      }) => {
        await request.post('/api/users', {
          data: {
            name: 'Pepe',
            username: 'pepe',
            password: 'pepe',
          },
        });

        await page.getByRole('button', { name: 'Logout' }).click();
        await loginWith(page, 'pepe', 'pepe');
        await page.getByRole('link', { name: 'a blog test playwright', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Like', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
        await expect(page.getByRole('button')).toHaveCount(2);
      });
    });

    describe('...and many blogs are added', () => {
      beforeEach(async ({ page }) => {
        test.setTimeout(30000);

        const blogs = page.getByRole('listitem');
        for (const title of ['First blog', 'Second blog', 'Third blog']) {
          await addBlog(page, title, 'playwright', 'https://playwright.dev');
          await expect(blogs.filter({ hasText: title })).toBeVisible();
        }
      });

      test('blogs are ordered by likes, most liked first', async ({ page }) => {
        const blogs = page.getByRole('listitem');
        await likeBlog(page, 'Second blog', 1);
        await likeBlog(page, 'Third blog', 2);

        await expect(blogs).toHaveCount(3);
        await expect(blogs).toContainText([
          'Third blog',
          'Second blog',
          'First blog',
        ]);

        // The order must update when another blog becomes the most liked.
        await likeBlog(page, 'First blog', 3);
        await expect(blogs).toContainText([
          'First blog',
          'Third blog',
          'Second blog',
        ]);
      });
    });
  });
});
