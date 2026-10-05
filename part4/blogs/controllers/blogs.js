const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;

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

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const blog = await Blog.findById(id);

  if (!blog) return res.status(404).end();

  if (blog.user.toString() !== user.id)
    return res.status(403).json({ error: 'forbidden action' });

  await blog.deleteOne();

  return res.status(204).end();
});

module.exports = blogsRouter;
