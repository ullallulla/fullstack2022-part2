const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    <Part
      part={parts}
    />
  </>

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      {course.parts.map(part =>
        <Content key={part.id} parts={part} />
      )}
      <Total parts={course.parts}/>

    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}


export default App