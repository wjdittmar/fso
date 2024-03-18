const Person = (person) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button type="submit" onClick={person.handleDelete}>
        delete
      </button>
    </li>
  );
};
export default Person;
