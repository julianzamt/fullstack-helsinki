const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'La vida de Brian',
    author: 'Jorge Falsete',
    url: 'www.test.test',
    like: 10,
  },
  {
    title: 'Carcaboy',
    author: 'Juan Pérez',
    url: 'www.test.com',
    like: 17,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
