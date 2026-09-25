const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
  return Person.find({}).then((persons) => res.json(persons));
});

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => {
      if (p) {
        res.json(p);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

personsRouter.delete('/:id', (req, res) => {
  return Person.findByIdAndDelete(req.params.id).then(() =>
    res.status(204).end(),
  );
});

personsRouter.post('/', (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((p) => res.json(p))
    .catch((e) => next(e));
});

personsRouter.put('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => {
      if (p) {
        const body = req.body;

        p.number = body.number;

        return p
          .save()
          .then((updatedP) => res.json(updatedP))
          .catch((e) => next(e));
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

module.exports = personsRouter;
