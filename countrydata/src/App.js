import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'






const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
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

      <Countries countries={countries} filter={newFilter} handleFilter={setNewFilter}/>

    </div>
  )
}

export default App