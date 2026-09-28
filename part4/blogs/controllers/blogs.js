const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
  });

  const nb = await newBlog.save();

  return res.status(201).json(nb);
});

module.exports = blogsRouter;
