const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.password)
    return res.status(400).json({ error: 'password is required' });

  if (body.password.length < 3)
    return res.status(400).json({ error: 'password too short' });

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: await bcrypt.hash(body.password, 10),
  });

  const nu = await newUser.save();

  return res.status(201).json(nu);
});

module.exports = usersRouter;
