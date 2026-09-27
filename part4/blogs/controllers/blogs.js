const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res, next) => {
  return Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((e) => next(e));
});

blogsRouter.post('/', (req, res, next) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
  });

  newBlog.save()
    .then((nb) => res.status(201).json(nb))
    .catch((e) => next(e));
});

module.exports = blogsRouter;
