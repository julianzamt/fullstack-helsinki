const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const user = (await User.find({}))[0];

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
  await Blog.findByIdAndDelete(id);
  return res.status(204).end();
});

module.exports = blogsRouter;
