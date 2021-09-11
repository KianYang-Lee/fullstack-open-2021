import React from 'react';

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="country flag" width='128px' height='128px' />
    </div>
  );
};

const Weather = ({ weather }) => {
  if (Object.keys(weather).length) {
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p><strong>temperature: </strong>{weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons[0]} alt='weather icon' width='128px' height='128px' />
        <p><strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    );
  }
  return null;

};

const Display = ({ countries, handleButtonClick, weather }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (countries.length > 1) {
    return (
      <div>{countries.map(country =>
        <p key={country.name}>{country.name}<button onClick={() => handleButtonClick(country)}>show</button></p>)
      }
      </div >
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} weather={weather} />
        <Weather weather={weather} />
      </div>
    );

  }
  return null;
};

export default Display;