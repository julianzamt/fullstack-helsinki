const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUser = async (req) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(400).json({ error: 'UserId missing or not valid' });
  }

  return user;
};

module.exports = { getUser };
