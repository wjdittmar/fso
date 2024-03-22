import { useState } from "react";

const App = () => {
  const [reviews, setReviews] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => {
    const newReviews = {
      ...reviews,
      good: reviews.good + 1,
    };
    setReviews(newReviews);
  };
  const handleNeutral = () => {
    const newReviews = {
      ...reviews,
      neutral: reviews.neutral + 1,
    };
    setReviews(newReviews);
  };
  const handleBad = () => {
    const newReviews = {
      ...reviews,
      bad: reviews.bad + 1,
    };

    setReviews(newReviews);
  };

  const handleReviews = {
    handleGood,
    handleNeutral,
    handleBad,
  };
  return (
    <div>
      <Feedback onClick={handleReviews} />
      <Statistics reviews={reviews} />
    </div>
  );
};

const Button = ({ label, handleClick }) => {
  return <button onClick={handleClick}> {label} </button>;
};

const Feedback = (reviews) => {
  // save clicks of each button to its own state
  return (
    <>
      <p> give feedback</p>
      <Button label="good" handleClick={reviews.onClick.handleGood} />
      <Button label="neutral" handleClick={reviews.onClick.handleNeutral} />
      <Button label="bad" handleClick={reviews.onClick.handleBad} />
    </>
  );
};

const Statistics = ({ reviews }) => {
  var stats = "";

  if (reviews.good + reviews.bad + reviews.neutral > 0) {
    stats = (
      <>
        <tr>
          {"average " +
            parseFloat(
              reviews.good +
                (reviews.bad * -1) /
                  (reviews.good + reviews.bad + reviews.neutral)
            )}
        </tr>
        <tr>
          positive
          {(reviews.good / (reviews.good + reviews.bad + reviews.neutral)) *
            100}{" "}
          %
        </tr>
      </>
    );
  } else {
    stats = "No feedback given";
  }
  console.log(stats);
  return (
    <table>
      <StatisticsLine text="good" value={reviews.good} />
      <StatisticsLine text="neutral" value={reviews.neutral} />
      <StatisticsLine text="bad" value={reviews.bad} />
      <tr>{stats}</tr>
    </table>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
