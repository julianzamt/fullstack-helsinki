import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Feedback from './components/Feedback.jsx';
import { ERR, SUCCESS } from './constants.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterStr, setFilterStr] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const updatePerson = (existingPerson, newPerson) => {
    personService
      .update(existingPerson.id, newPerson)
      .then(() => {
        setPersons((currentPersons) =>
          currentPersons.map((p) => (p.id === newPerson.id ? newPerson : p)),
        );
      })
      .catch((e) => {
        showFeedback(
          `${existingPerson.name} already removed - ${e.response?.data?.error ?? e.message}`,
          ERR,
        );
      });

    setNewName('');
    setNewNumber('');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (newName === '') {
      alert(`No empty additions`);
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (!confirm(`${newPerson.name} already added, replace the number?`))
        return;
      updatePerson(existingPerson, newPerson);
      return;
    }

    personService
      .create(newPerson)
      .then((np) => setPersons((currentPersons) => currentPersons.concat(np)));

    setNewName('');
    setNewNumber('');

    showFeedback(`${newName} added`, SUCCESS);
  };

  const showFeedback = (msg, type) => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleFilter = (e) => {
    setFilterStr(e.target.value);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() =>
          setPersons((currentPersons) =>
            currentPersons.filter((p) => p.id !== id),
          ),
        )
        .catch((e) =>
          showFeedback(
            `Could not delete ${name} - ${e.response?.data?.error ?? e.message}`,
            ERR,
          ),
        );
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filterStr.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback feedback={feedback} />
      <Filter onFilterChange={handleFilter} filterStr={filterStr} />

      <h2>Add a new person</h2>
      <PersonForm
        onNameChange={handleName}
        onNumberChange={handleNumber}
        onSubmit={handleAdd}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
