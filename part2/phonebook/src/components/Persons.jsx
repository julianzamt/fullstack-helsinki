const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

const Persons = ({ persons }) => {
  const ps = persons.map((p) => (
    <Person key={p.id} name={p.name} number={p.number} />
  ));
  return <ul>{ps}</ul>;
};

export default Persons;
