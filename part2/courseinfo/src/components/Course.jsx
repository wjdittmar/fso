const Course = ({ name, parts }) => {
  console.log(name);
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>
        total of {parts.reduce((partialSum, a) => partialSum + a.exercises, 0)}{" "}
        exercises
      </p>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Course;
