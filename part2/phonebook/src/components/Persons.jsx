const Person = ({ name, number, handleDelete, id }) => {
  return (
    <li>
      {name} {number}{" "}
      <button onClick={() => handleDelete(id, name)}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, handleDelete }) => {
  const ps = persons.map((p) => (
    <Person
      key={p.id}
      id={p.id}
      name={p.name}
      number={p.number}
      handleDelete={handleDelete}
    />
  ));
  return <ul>{ps}</ul>;
};

export default Persons;
