import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={(evt) => handleDelete(person, evt)}
        />
      ))}
    </ul>
  );
};

export default Persons;
