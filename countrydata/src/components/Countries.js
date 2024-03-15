import Weather from "./Weather"
import axios from "axios"
import { useState, useEffect } from "react"

const Countries = ({ countries, filter, handleFilter, apiKey, weather, setWeather }) => {
    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
    const handleButton = (country) => {    
      const handler = () => {
        handleFilter(country.name.common)
      }
      return handler
    }
  
  
    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    if (countriesToShow.length < 10 && countriesToShow.length > 1) {
      return (
        <div>
          {countriesToShow.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={handleButton(country)}>show</button>
              
            </div>
          )}
        </div>
      )
    }
  
    return (
      <div>
        {countriesToShow.map(country =>
          <Country key={country.name.common} country={country} apiKey={apiKey} weather={weather} setWeather={setWeather}/>
        )}
      </div>
    )
  }

  const Country = ({ country}) => {
    const [weather, setWeather] = useState(null)

    const languages = country.languages
    const flag = country.flags.png

    useEffect(() => {

    const api_key = process.env.REACT_APP_API_KEY
    const latitude = country.capitalInfo.latlng[0]
    const longitude = country.capitalInfo.latlng[1]

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }, [country])
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        capital {country.capital} <br />
        area {country.area}
  
        <h3>languages:</h3>
        <ul>
          {Object.entries(languages).map(([key, value]) =>
            <li key={value}>{value}</li>
          )}
        </ul>
        <img src={flag} width="100" height="100" alt={`flag of ${country}`} />

        {weather && <Weather  weather={weather} capital={country.capital}/>}
      </div>
    )
  }


export default Countries