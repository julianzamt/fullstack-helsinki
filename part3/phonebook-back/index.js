const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/persons');

app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  }),
);

app.get('/api/persons', (req, res) => {
  return Person.find({}).then((persons) => res.json(persons));
});

app.get('/api/persons/:id', (req, res, next) => {
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

app.delete('/api/persons/:id', (req, res) => {
  return Person.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});

app.post('/api/persons', (req, res, next) => {
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

app.put('/api/persons/:id', (req, res, next) => {
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

app.get('/info', (req, res) => {
  return Person.countDocuments({}).then((count) =>
    res.send(
      `<h1> Phonebook has info for ${count} persons</h1> <h2>${new Date()}</h2>`,
    ),
  );
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
