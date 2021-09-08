// // --------------------- 2.6 PHONEBOOK STEP 1 ------------------------- //
// import React, { useState } from 'react';
// import Person from './components/Person';

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas' }
//   ]);
//   const [newName, setNewName] = useState('');

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const addName = (event) => {
//     event.preventDefault();
//     const personObject = {
//       name: newName
//     };
//     setPersons(persons.concat(personObject));
//     setNewName('');
//   };

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addName}>
//         <div>
//           name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           <button type='submit'>add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {persons.map(person => <Person key={person.name} person={person} />)}
//     </div>
//   );
// };

// export default App;

// // --------------------- 2.7 PHONEBOOK STEP 2 ------------------------- //
// // Issue a warning with the alert command
// import React, { useState } from 'react';
// import Person from './components/Person';

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas' }
//   ]);
//   const [newName, setNewName] = useState('');

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const addName = (event) => {
//     event.preventDefault();
//     const validateNameDuplicates = persons.some(person => person.name === newName);
//     if (validateNameDuplicates) {
//       // template strings use backtick
//       window.alert(`${newName} is already added to phonebook`);
//     } else {
//       const personObject = {
//         name: newName
//       };
//       setPersons(persons.concat(personObject));
//       setNewName('');
//     }
//   };


//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addName}>
//         <div>
//           name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           <button type='submit'>add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {persons.map(person => <Person key={person.name} person={person} />)}
//     </div>
//   );
// };

// export default App;

// // --------------------- 2.8 PHONEBOOK STEP 3 ------------------------- //
// // Expand your application by allowing users to add phone numbers to the phone book. 
// // You will need to add a second input element to the form (along with its 
// // own event handler):

// import React, { useState } from 'react';
// import Person from './components/Person';

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456' },
//     { name: 'Ada Lovelace', number: '39-44-5323523' },
//     { name: 'Dan Abramov', number: '12-43-234345' },
//     { name: 'Mary Poppendieck', number: '39-23-6423122' }
//   ]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value);
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
//       setPersons(persons.concat(personObject));
//       setNewName('');
//       setNewNumber('');
//     }
//   };


//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addName}>
//         <div>
//           name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           number: <input value={newNumber} onChange={handleNumberChange} />
//         </div>
//         <div>
//           <button type='submit'>add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {persons.map(person => <Person key={person.name} person={person} />)}
//     </div>
//   );
// };

// export default App;

// --------------------- 2.9 PHONEBOOK STEP 4 ------------------------- //
// Implement a search field that can be used to filter the list of people by name:

import React, { useState } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const validateNameDuplicates = persons.some(person => person.name === newName);
    if (validateNameDuplicates) {
      // template strings use backtick
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
  console.log(filteredPersons);


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* {persons.map(person => <Person key={person.name} person={person} />)} */}
      {filteredPersons.map(person => <Person key={person.name} person={person} />)}
    </div>
  );
};

export default App;