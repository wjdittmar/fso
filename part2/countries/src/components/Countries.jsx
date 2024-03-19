import Country from "./Country";

const Countries = ({ countries }) => {
  const isShort = countries.length == 1;
  return (
    <ul>
      {countries.map((country) => (
        <div key={country.fifa}>
          <Country country={country} isShort={isShort} />
        </div>
      ))}
    </ul>
  );
};

export default Countries;
