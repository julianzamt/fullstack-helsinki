import { useState } from "react";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterStr, setFilterStr] = useState("");

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const isAdded = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} already added`);
        return true;
      }
    }

    return false;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!isAdded()) setPersons(persons.concat(newPerson));
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
      <div>
        filter: <input onChange={handleFilter} />
      </div>

      <h2>Add a new</h2>

      <form>
        <div>
          name: <input onChange={handleName} />
        </div>
        <div>
          {" "}
          number: <input onChange={handleNumber} />
        </div>

        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
