const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const helpers = require('./test_helpers');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helpers.initialBlogs);
});

describe('blogs-api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs/');

    assert.strictEqual(response.body.length, 2);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs/');
    const titles = response.body.map((i) => i.title);

    assert(titles.includes('La vida de Brian'));
  });

  test('elements has ".id" as identifier instead of"._id"', async () => {
    const response = await api.get('/api/blogs/');
    const blogs = response.body.map((i) => i);

    assert(blogs[0].id !== null && blogs[0].id !== undefined);
  });

  test('a new blog is saved correctly', async () => {
    const newBlog = {
      title: 'Matarete',
      author: 'Rubén Paz',
      url: 'www.test.caca',
      likes: 666,
    };
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, helpers.initialBlogs.length + 1);

    assert(titles.includes('Matarete'));
  });

  test('if no likes is specified, it is initialized to 0', async () => {
    const newBlog = {
      title: 'Matarete',
      author: 'Rubén Paz',
      url: 'www.test.caca',
    };
    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const b = response.body.find((b) => b.title === 'Matarete');

    assert.strictEqual(b.likes, 0);
  });

  test('title/url are required', async () => {
    let newBlog = {
      author: 'Rubén Paz',
      url: 'www.test.caca',
    };

    await api.post('/api/blogs/').send(newBlog).expect(400);

    newBlog = {
      title: 'La vida es buena',
      author: 'Rubén Paz',
    };

    await api.post('/api/blogs/').send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
