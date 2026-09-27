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

module.exports = {
  totalLikes,
  favoriteBlog,
};
