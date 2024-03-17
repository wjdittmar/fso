import { useState, useEffect } from "react";
import personService from "./services/persons";
import { v4 as uuidv4 } from "uuid";
const App = () => {
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [toFilter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleNewName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };
    if (persons.some((val) => val.name == newName)) {
      alert(`${newName} is already added to the phonebook!`);
      const person = persons.find((p) => p.name === newName);
      console.log(person);
      personService
        .update({ ...person, number: newNumber }, person.id)
        .then((updatedPerson) => {
          console.log(updatedPerson.data);
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson.data))
          );
        });
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
  };

  const handleDelete = (person, event) => {
    event.preventDefault();
    const ok = window.confirm(`remove ${person.name} from phonebook?`);
    personService.remove(person.id).then((response) => {
      setPersons(persons.filter((n) => n.id !== person.id));
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowAll(event.target.value.length == 0);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().startsWith(toFilter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={toFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};
const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input value={props.val} onChange={props.onChange} />
    </div>
  );
};

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

const PersonForm = ({
  newName,
  handleNewName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default App;
