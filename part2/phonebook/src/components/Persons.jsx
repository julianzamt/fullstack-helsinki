const Person = ({ name }) => {
  return <li>{name}</li>;
};

const Persons = ({ persons }) => {
  const numbers = persons.map((p) => <Person key={p.name} name={p.name} />);
  return <ul>{numbers}</ul>;
};

export default Persons;
