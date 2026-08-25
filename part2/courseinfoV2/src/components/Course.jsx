const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => {
  const fmtParts = parts.map((p) => (
    <Part key={p.id} name={p.name} exercises={p.exercises} />
  ));

  return <ul>{fmtParts}</ul>;
};

const Part = ({ name, exercises }) => (
  <li>
    {name} {exercises}
  </li>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const getTotal = (parts) => {
  const total = parts.reduce((acc, p) => acc + p.exercises, 0);
  return total;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total total={getTotal(course.parts)} />
    </div>
  );
};

export default Course;
