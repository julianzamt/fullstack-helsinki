const CountriesList = ({ countries }) => {
  if (!countries) return;

  const list = countries.map((c) => <li key={c.name.common}>{c.name.common}</li>);
  return <ul>{list}</ul>;
};

export default CountriesList;
