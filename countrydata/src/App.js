import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}


const Countries = ({ countries, filter, handleFilter }) => {
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
        <Country country={country} />
      )}
    </div>
  )
}

const Country = ({ country }) => {
  const languages = country.languages
  const flag = country.flags.png
  console.log(languages)

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
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

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

      <Countries countries={countries} filter={newFilter} handleFilter={setNewFilter} />

    </div>
  )
}

export default App