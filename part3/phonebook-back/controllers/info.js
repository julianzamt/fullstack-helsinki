const infoRouter = require('express').Router();
const Person = require('../models/note');

infoRouter.get('/info', (req, res) => {
  return Person.countDocuments({}).then((count) =>
    res.send(
      `<h1> Phonebook has info for ${count} persons</h1> <h2>${new Date()}</h2>`,
    ),
  );
});

module.exports = infoRouter;
