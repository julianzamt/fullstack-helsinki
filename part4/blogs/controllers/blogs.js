const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await utils.getUser(req);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    user: user._id,
  });

  const nb = await newBlog.save();

  user.blogs = user.blogs.concat(nb._id);
  await user.save();

  return res.status(201).json(nb);
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  const user = await utils.getUser(req);

  if (blog.user.toString() !== user.id)
    return res.status(403).json({ error: 'forbidden action' });

  await blog.deleteOne();

  return res.status(204).end();
});

module.exports = blogsRouter;
