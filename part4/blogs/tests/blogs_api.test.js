const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const helpers = require('./test_helpers');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const api = supertest(app);

let rickyToken = '';

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const users = await Promise.all(
    helpers.initialUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );

  const savedUsers = await User.insertMany(users);
  const ricky = savedUsers.find((user) => user.username === 'ricky');

  const blogs = await Blog.insertMany(
    helpers.initialBlogs.map((blog) => ({
      ...blog,
      user: ricky._id,
    })),
  );

  ricky.blogs = blogs.map((blog) => blog._id);
  await ricky.save();

  const res = await api
    .post('/api/login/')
    .send({ username: 'ricky', password: 'pupi' })
    .expect(200);

  rickyToken = res.body.token;
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
      .set('Authorization', `Bearer ${rickyToken}`)
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
      .set('Authorization', `Bearer ${rickyToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const b = response.body.find((b) => b.title === 'Matarete');

    assert.strictEqual(b.likes, 0);
  });

  test('title and url are required fields', async () => {
    let newBlog = {
      author: 'Rubén Paz',
      url: 'www.test.caca',
    };

    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${rickyToken}`)
      .send(newBlog)
      .expect(400);

    newBlog = {
      title: 'La vida es buena',
      author: 'Rubén Paz',
    };

    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${rickyToken}`)
      .send(newBlog)
      .expect(400);
  });

  test('deletes a resource correctly', async () => {
    const blogsAtStart = await helpers.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${rickyToken}`)
      .expect(204);

    const blogsAtEnd = await helpers.blogsInDb();

    const ids = blogsAtEnd.map((n) => n.id);
    assert(!ids.includes(blogToDelete.id));

    assert.strictEqual(blogsAtEnd.length, helpers.initialBlogs.length - 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
