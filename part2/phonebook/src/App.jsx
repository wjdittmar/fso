import { useState, useEffect } from "react";
import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import {
  ErrorNotification,
  AddedNotification,
} from "./components/Notification";
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
  const [addMessage, setAddMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: uuidv4(),
    };
    if (persons.some((val) => val.name == newName)) {
      const ok = window.confirm(
        `${newName} is already added to the phonebook. Proceed with updating phone number?`
      );
      if (ok) {
        const person = persons.find((p) => p.name === newName);
        personService
          .update({ ...person, number: newNumber }, person.id)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : updatedPerson))
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of {newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setAddMessage(newName);
          setTimeout(() => {
            setAddMessage("");
          }, 2000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        });
    }
  };

  const handleDelete = (person, event) => {
    event.preventDefault();
    const ok = window.confirm(`remove ${person.name} from phonebook?`);

    if (ok) {
      personService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((n) => n.id !== person.id));
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        });
    }
  };

  const personsToShow = toFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(toFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter val={toFilter} onChange={setFilter} />
      <h3>Add a new</h3>
      <AddedNotification message={addMessage}></AddedNotification>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        handleNameChange={setNewName}
        newNumber={newNumber}
        handleNumberChange={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
