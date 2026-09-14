const CountriesList = ({ countries, onShow }) => {
  if (!countries) return;

  const list = countries.map((c) => (
    <li key={c.name.common}>
      {c.name.common} <button onClick={() => onShow(c)}>Show</button>
    </li>
  ));
  return <ul>{list}</ul>;
};

export default CountriesList;
