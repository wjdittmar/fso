const Country = ({ country, isShort }) => {
  if (!isShort) {
    return (
      <li>
        {country.name.common} <button>show</button>
      </li>
    );
  } else {
    return (
      <>
        <p> {country.name.common} </p>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map((short, full) => (
            <li key={short}> {country.languages[short]} </li>
          ))}
        </ul>
        <img src={country.flags.png} />
      </>
    );
  }
};
export default Country;
