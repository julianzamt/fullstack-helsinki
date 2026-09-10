import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import { getPersonByName, isAdded } from "./helpers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterStr, setFilterStr] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (isAdded(newName, persons)) {
      if (confirm(`${newName} already added, replace the number?`)) {
        const person = getPersonByName(newName, persons);

        personService.update(person, newPerson).then((updatedPerson) => {
          console.log({ updatedPerson });
          setPersons(
            persons.map((p) => (p.name === newPerson.name ? updatedPerson : p)),
          );
        });

        setNewName("");
        setNewNumber("");
        return;
      }
    }
    if (newName === "") {
      alert(`No empty additions`);
      return;
    }

    personService
      .create(newPerson)
      .then((np) => setPersons(persons.concat(np)));
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (e) => {
    setFilterStr(e.target.value);
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure to delete ${name}?`)) {
      personService
        .remove(id)
        .then((del) => setPersons(persons.filter((p) => p.id !== del.id)));
    }
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filterStr.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilter} filterStr={filterStr} />

      <h2>Add a new</h2>
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
