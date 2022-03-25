import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}


const Countries = ({ countries, filter }) => {
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log('countriesToShow', countriesToShow)

  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (countriesToShow.length < 10 && countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.common}>{country.name.common}</div>
        )}
      </div>
    )
  }

  const languages = countriesToShow.map(country => country.languages)
  const flag = countriesToShow.map(country => country.flags.png)
  console.log(languages)

  return (
    <div>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          capital {country.capital} <br />
          area {country.area}
        </div>
      )}
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(languages[0]).map(([key, value]) =>
            <li>{value}</li>
          )}
        </ul>
      </div>
      <div>
        <img src={flag} width="100" height="100" />
      </div>
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

      <Countries countries={countries} filter={newFilter} />

    </div>
  )
}

export default App