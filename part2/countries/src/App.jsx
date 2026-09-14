import { useState, useEffect } from "react";
import CountriesForm from "./components/CountriesForm";
import CountriesList from "./components/CountriesList";
import Feedback from "./components/Feedback";
import Country from "./components/Country";
import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    countriesService.get().then((cs) => setCountries(cs));
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCountry(null);
  };

  const handleShow = (country) => {
    setCountry(country);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().startsWith(search.toLowerCase()),
  );

  const countryToShow =
    country || (filteredCountries.length === 1 ? filteredCountries[0] : null);

  return (
    <>
      <CountriesForm onChange={onChange} search={search} />

      {filteredCountries.length > 10 && (
        <Feedback msg="Too many matches, specify another filter" />
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <CountriesList countries={filteredCountries} onShow={handleShow} />
      )}

      <Country country={countryToShow} />
    </>
  );
}

export default App;
