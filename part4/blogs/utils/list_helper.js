const totalLikes = (blogs) => {
  return blogs.reduce((acc, b) => acc + b.likes, 0);
};

module.exports = {
  totalLikes,
};
