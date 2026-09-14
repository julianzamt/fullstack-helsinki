import Weather from "./Weather";

const Country = ({ country }) => {
  if (!country) return null;

  const langs = Object.values(country.languages).map((l) => (
    <li key={l}>{l}</li>
  ));

  const style = {
    fontSize: 100,
  };

  const capital = country.capital[0];

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div style={style}>{country.flag}</div>
      <h3>Capital: {capital}</h3>
      <h3>Population: {country.population}</h3>
      <h4>Languages</h4>
      <ul>{langs}</ul>
      <Weather
        key={`${country.latlng[0]}-${country.latlng[1]}`}
        city={capital}
        lat={country.latlng[0]}
        lon={country.latlng[1]}
      />
    </div>
  );
};

export default Country;
