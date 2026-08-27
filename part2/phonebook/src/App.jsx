import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterStr, setFilterStr] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const isAdded = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        return true;
      }
    }

    return false;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (isAdded()) {
      alert(`${newName} already added`);
      return;
    }
    if (newName === "") {
      alert(`No empty additions`);
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (e) => {
    setFilterStr(e.target.value);
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
