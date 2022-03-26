import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}


const Countries = ({ countries, filter, handleFilter, apiKey, weather, setWeather }) => {
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log('countriesToShow', countriesToShow)

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

const Country = ({ country, apiKey, weather, setWeather }) => {
  

  const languages = country.languages
  const flag = country.flags.png
  console.log(country.capitalInfo.latlng)
  const latitude = country.capitalInfo.latlng[0]
  const longitude = country.capitalInfo.latlng[1]
  console.log(languages)
  //console.log(latitude, longitude, apiKey)
  useEffect(() => {
    console.log('effectasd')
    axios
      //.get('https://restcountries.com/v3.1/all')
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => {
        console.log('promise fulfilled asd')
        console.log(response.data, 'response')
        /* setWeather(weather => (
          {
            weather,
            ...response.data
          }
        )) */
        let weatherData = []
        weatherData.push(response.data)
        setWeather(weatherData)

      })
  }, [])

  console.log(weather, 'this is weather')

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
      <img src={flag} width="100" height="100" />
      {weather.map(w => 
        <Weather key={w.name} weather={w} capital={country.capital}/>
        )}
      
    </div>
  )
}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const Weather = ({weather, capital}) => {
  console.log(weather, 'qwe')
  
  const weatherIcon = weather.weather[0].icon
  console.log(weatherIcon)
  const weatherIconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  console.log(weatherIcon, weatherIconURL)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {Math.round(((weather.main.temp - 273.15) + Number.EPSILON) * 100) / 100} Celcius</div>
      <img src={weatherIconURL} width="100" height="100" />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>

      <Filter filter={newFilter} handleFilter={handleFilterChange} />

      <Countries countries={countries} filter={newFilter} handleFilter={setNewFilter} apiKey={api_key} weather={weather} setWeather={setWeather}/>

    </div>
  )
}

export default App