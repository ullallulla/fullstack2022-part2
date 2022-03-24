import React, { useState } from 'react'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter} />
    </div>
  )
}

const PersonForm = ({addPerson, name, number, handleName, handleNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filter}) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
    {personsToShow.map(person =>
      <div key={person.name}>{person.name} {person.number}</div>
    )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter filter={newFilter} handleFilter={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} />
      
    </div>
  )
}

export default App