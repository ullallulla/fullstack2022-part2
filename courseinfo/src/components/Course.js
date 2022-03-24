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
      <Total parts={course.parts} />

    </>
  )
}

export default Course