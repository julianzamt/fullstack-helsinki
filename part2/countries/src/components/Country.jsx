const Country = ({ country }) => {
  if (!country) return;

  console.log({ country });

  const langs = Object.values(country.languages).map((l) => (
    <li key={l}>{l}</li>
  ));

  const style = {
    fontSize: 100,
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div style={style}>{country.flag}</div>
      <h3>Capital: {country.capital[0]}</h3>
      <h3>Population: {country.population}</h3>
      <h4>Languages</h4>
      <ul>{langs}</ul>
    </div>
  );
};

export default Country;
