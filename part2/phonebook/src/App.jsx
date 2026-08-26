import { useState } from "react";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "55-55-5555555" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>

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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
