// ---------------- 3: PHONEBOOK STEP 12 -------------------- //

import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person)
        .then(
          personService
            .getAll()
            .then(
              () => {
                setPersons(persons.filter(person_obj => person_obj.id !== person.id));
              }
            )
        );
    }
  };


  const addName = (event) => {
    event.preventDefault();
    const validateNameDuplicates = persons.some(person => person.name === newName);
    if (validateNameDuplicates) {
      // template strings use backtick
      window.alert(`${newName} is already added to phonebook`);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        const id = person.id;
        const personObject = { ...person, number: newNumber };
        personService
          .modify(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
            setMessage(`Modified ${returnedPerson.name}'s phone number`);
            setTimeout(() => setMessage(null), 5000);
          }
          )
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has 
            already been removed from server`);
            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch(error => console.log(error.response.data));
    }
  };

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification errorMessage={errorMessage} />
      <Notification message={message} />
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {filteredPersons.map(person => {
        return (
          <Person
            key={person.name}
            person={person}
            handleDeletePerson={handleDeletePerson} />);
      })}
    </div>
  );
};

export default App;