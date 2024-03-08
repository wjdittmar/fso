const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Content = (props) => {
    return (
      <>
        <Part name={part1} number={exercises1} />
        <Part name={part2} number={exercises2} />
        <Part name={part3} number={exercises3} />
      </>
    );
  };

  return (
    <div>
      <Header name={course} />
      <Content />
      <Total num1={exercises1} num2={exercises2} num3={exercises3} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.num1 + props.num2 + props.num3}</p>;
};
export default App;
