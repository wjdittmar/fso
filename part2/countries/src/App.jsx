import "./App.css";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countryService from "./services/countries";
function App() {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const [toFilter, setFilter] = useState("");

  const countriesToShow = toFilter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(toFilter.toLowerCase())
      )
    : countries;
  const displayCountries =
    countriesToShow.length < 10 && countriesToShow.length >= 1
      ? countriesToShow
      : [];

  let countryData;
  if (countriesToShow.length == 1) {
    countryData = (
      <>
        <p> {countriesToShow[0].name.common} </p>
        <p>capital {countriesToShow[0].capital}</p>
        <p>area {countriesToShow[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(countriesToShow[0].languages).map((short, full) => (
            <li key={short}> {countriesToShow[0].languages[short]} </li>
          ))}
        </ul>
        <img src={countriesToShow[0].flags.png} />
      </>
    );
  } else if (countriesToShow.length < 10) {
    countryData = <Countries countries={displayCountries} />;
  } else if (countriesToShow.length >= 10 && toFilter) {
    countryData = "Too many matches";
  }

  return (
    <>
      <Filter val={toFilter} onChange={setFilter} />
      {/* {countryData} */}
      <Countries countries={displayCountries} />
    </>
  );
}

export default App;
