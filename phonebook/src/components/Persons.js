const Persons = ({ persons, filter, deletePerson }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {personsToShow.map(person =>
                <div key={person.name}>{person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons