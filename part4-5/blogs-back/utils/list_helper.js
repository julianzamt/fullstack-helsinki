const _ = require('lodash');

const totalLikes = (blogs) => {
  return blogs.reduce((acc, b) => acc + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  let fav = null;

  blogs.forEach((b) => {
    if (b.likes >= (fav?.likes || 0)) {
      fav = b;
    }
  });

  return fav;
};

const mostBlogs = (blogs) => {
  const counts = new Map();
  blogs.forEach((b) => counts.set(b.author, (counts.get(b.author) || 0) + 1));

  let res = null;

  for (const [author, count] of counts.entries()) {
    if (res === null || count > res.blogs) {
      res = {
        author,
        blogs: count,
      };
    }
  }

  return res;
};

const mostLikes = (blogs) => {
  const counts = new Map();
  blogs.forEach((b) =>
    counts.set(b.author, (counts.get(b.author) || 0) + b.likes),
  );

  let res = null;

  for (const [author, count] of counts.entries()) {
    if (res === null || count > res.likes) {
      res = {
        author,
        likes: count,
      };
    }
  }

  return res;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
