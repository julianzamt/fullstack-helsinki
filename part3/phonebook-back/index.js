const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return String(Math.floor(Math.random() * 1_000_000));
};

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);

  if (!person) return res.status(404).end();

  return res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((p) => p.id !== req.params.id);

  return res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number)
    return res.status(400).json({
      error: "content missing",
    });

  if (persons.some((p) => p.name === body.name))
    return res.status(400).json({
      error: "name must be unique",
    });

  const newPerson = {
    ...body,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  return res.json(newPerson);
});

app.get("/info", (req, res) => {
  return res.send(
    `<h1> Phonebook has info for ${persons.length} persons</h1> <h2>${new Date()}</h2>`,
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
