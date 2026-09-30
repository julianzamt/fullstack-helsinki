const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const helpers = require('./test_helpers');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helpers.initialUsers);
});

describe('users-api', () => {
  test('cannot register a user with a passworg with length < 3', async () => {
    const newUser = {
      username: 'pablo',
      name: 'Pablo Paz',
      password: 'pp',
    };

    const res = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);

    assert.strictEqual(res.body.error, 'password too short');
  });

  test('cannot register a user without username', async () => {
    const newUser = {
      name: 'pablo',
      password: 'pppppp',
    };

    const res = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);

    assert(res.body.error.includes('`username` is required'));
  });

  test('cannot register a user without password', async () => {
    const newUser = {
      username: 'pablo',
      name: 'Pablo Paz',
    };

    const res = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);

    assert.strictEqual(res.body.error, 'password is required');
  });
});

after(async () => {
  await mongoose.connection.close();
});
