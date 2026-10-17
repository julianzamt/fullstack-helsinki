const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 15,
  },
  name: {
    type: String,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const testCollection =
  process.env.NODE_ENV === 'test' ? 'users-tests' : undefined;

const User = mongoose.model('User', userSchema, testCollection);

module.exports = User;
