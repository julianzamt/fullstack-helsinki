import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.name}</button>
    </>
  );
};

const StatisticLine = ({ name, val }) => {
  return (
    <tr>
      <th scope="row">{name}:</th>
      <td>{val}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const getAvg = () => (good - bad) / total || 0;
  const getPositive = () => (good / total) * 100 || 0;

  if (total > 0) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine name={"good"} val={good} />
            <StatisticLine name={"neutral"} val={neutral} />
            <StatisticLine name={"bad"} val={bad} />
            <StatisticLine name={"all"} val={total} />
            <StatisticLine name={"average"} val={getAvg()} />
            <StatisticLine name={"positive"} val={getPositive()} />
          </tbody>
        </table>
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  console.log("g: ", good);
  console.log("n: ", neutral);
  console.log("b: ", bad);

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name="good" />
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button onClick={() => setBad(bad + 1)} name="bad" />

      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
