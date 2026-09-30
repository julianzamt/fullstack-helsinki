const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: await bcrypt.hash(body.password, 10),
  });

  const nu = await newUser.save();

  return res.status(201).json(nu);
});

module.exports = usersRouter;
