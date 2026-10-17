const assert = require('node:assert');
const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const helpers = require('./test_helpers');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const users = await Promise.all(
    helpers.initialUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );
  await User.insertMany(users);
});

describe('users-api', () => {
  test('cannot register a user with a password with length < 3', async () => {
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

  test('Can register a user', async () => {
    const usersBef = await User.find({});

    const newUser = {
      username: 'pablo',
      name: 'Pablo Paz',
      password: 'ppp',
    };

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/);

    const usersAft = await User.find({});

    assert.strictEqual(usersBef.length, usersAft.length - 1);
    assert(usersAft.some((u) => u.username === 'pablo'));
  });
});

after(async () => {
  await mongoose.connection.close();
});
