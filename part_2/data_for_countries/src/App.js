// --------------------- 2.12 DATA FOR COUNTRIES, STEP 1 ------------------------- //
// // Create an application, in which one can look at data of various countries. 
// // The application should probably get the data from the endpoint all.

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Display from './components/Display';

// const App = () => {
//   const [newFilter, setNewFilter] = useState('');
//   const [countries, setCountries] = useState([]);

//   const handleFilterChange = (event) => {
//     setNewFilter(event.target.value);
//   };

//   const handleButtonClick = (country) => {
//     setNewFilter(country.name);
//   };

//   // pass newFilter as a dependency
//   useEffect(() => {
//     axios
//       .get('https://restcountries.eu/rest/v2/all')
//       .then(response => {
//         setCountries(response.data);
//       });
//   }, [newFilter]);

//   // if (countries.length)
//   const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));
//   return (
//     <div>
//       <p>find countries <input value={newFilter} onChange={handleFilterChange} /></p>
//       <Display countries={filteredCountries} handleButtonClick={handleButtonClick} />
//     </div>
//   );
// };

// export default App;

// --------------------- 2.14 DATA FOR COUNTRIES, STEP 3 ------------------------- //
// Add to the view showing the data of a single country, the weather report for the 
// capital of that country. There are dozens of providers for weather data.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';

const App = () => {
  const [newFilter, setNewFilter] = useState('');
  const [responseCountriesData, setResponseCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    const filteredCountries = responseCountriesData.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));
    setCountries(filteredCountries);
  };

  const handleButtonClick = (country) => {
    setNewFilter(country.name);
    const copy = [country];
    setCountries(copy);
  };

  // pass newFilter as a dependency
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResponseCountriesData(response.data);
      });
  }, []);

  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital;
      axios
        .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + capital)
        .then(response => {
          setWeather(response.data);
        });
    }
  }, [countries]);

  return (
    <div>
      <p>find countries <input value={newFilter} onChange={handleFilterChange} /></p>
      <Display countries={countries} weather={weather} handleButtonClick={handleButtonClick} />
    </div>
  );
};

export default App;