import { useState, useEffect } from "react";
import CountriesForm from "./components/CountriesForm";
import CountriesList from "./components/CountriesList";
import Feedback from "./components/Feedback";
import Country from "./components/Country";
import axios from "axios";

function App() {
  // const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);

  const onChange = (e) => {
    // setSearch(e.target.value);

    if (e.target.value === "") {
      setFilteredCountries(null);
      setFeedback(null);
      return;
    }

    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()),
    );

    if (filtered.length <= 10) {
      setFilteredCountries(filtered);
      setFeedback(null);
    } else {
      setFeedback({
        msg: "Too many matches, specify another filter",
        type: "error",
      });
      setFilteredCountries(null);
    }

    if (filtered.length === 1) {
      setFilteredCountries(null);
      setFeedback(null);
      setCountry(filtered[0]);
    }

    console.log(filtered);
  };

  return (
    <>
      <CountriesForm onChange={onChange} />
      <Feedback feedback={feedback} />
      <CountriesList countries={filteredCountries} />
      <Country country={country} />
    </>
  );
}

export default App;
