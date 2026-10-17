const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
  },
  author: {
    type: String,
    maxLength: 50,
  },
  url: {
    type: String,
    required: true,
    maxLength: 100,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// TODO - change to a different DB for testing
// To use a different collection on tests
let testCollection =
  process.env.NODE_ENV === 'test' ? 'blogs-tests' : undefined;

const Blog = mongoose.model('Blog', blogSchema, testCollection);

module.exports = Blog;
