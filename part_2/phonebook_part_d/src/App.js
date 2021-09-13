// // ---------------- 2.15 PHONEBOOK STEP 7, 8 and 9 -------------------- //
// // Modify the application such that the initial state of the data is fetched 
// // from the server using the axios-library. Complete the fetching with an Effect hook.
// // tHEN, extract the code that handles communication with backeend 
// // into its own module
// // Make it possible for users to delete entries from the phonebook.
// //  The deletion can be done through a dedicated button for each person 
// // in the phonebook list. 

// import React, { useState, useEffect } from 'react';
// import Person from './components/Person';
// import Filter from './components/Filter';
// import PersonForm from './components/PersonForm';
// import personService from './services/persons';


// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');
//   const [newFilter, setNewFilter] = useState('');

//   useEffect(() => {
//     personService
//       .getAll()
//       .then(initialPersons => {
//         setPersons(initialPersons);
//       });
//   }, []);

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setNewFilter(event.target.value);
//   };

//   const handleDeletePerson = (person) => {
//     if (window.confirm(`Delete ${person.name}?`)) {
//       personService
//         .remove(person)
//         .then(
//           personService
//             .getAll()
//             .then(
//               () => {
//                 setPersons(persons.filter(person_obj => person_obj.id !== person.id));
//               }
//             )
//         );
//     }
//   };


//   const addName = (event) => {
//     event.preventDefault();
//     const validateNameDuplicates = persons.some(person => person.name === newName);
//     if (validateNameDuplicates) {
//       // template strings use backtick
//       window.alert(`${newName} is already added to phonebook`);
//     } else {
//       const personObject = {
//         name: newName,
//         number: newNumber
//       };
//       personService
//         .create(personObject)
//         .then(returnedPerson => {
//           setPersons(persons.concat(returnedPerson));
//           setNewName('');
//           setNewNumber('');
//         });
//     }
//   };

//   const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Filter filter={newFilter} onChange={handleFilterChange} />
//       <h2>add a new</h2>
//       <PersonForm addName={addName} newName={newName} newNumber={newNumber}
//         handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
//       />
//       <h2>Numbers</h2>
//       {filteredPersons.map(person => {
//         return (
//           <Person
//             key={person.name}
//             person={person}
//             handleDeletePerson={handleDeletePerson} />);
//       })}
//     </div>
//   );
// };

// export default App;

// ---------------- 2.17 PHONEBOOK STEP 10 -------------------- //
// Change the functionality so that if a number is added to an
//  already existing user, the new number will replace the old number.

import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
          .then(returnedPerson =>
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          );
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
        });
    }
  };

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
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