const Feedback = ({ feedback }) => {
  if (!feedback) return;

  const style = {
    color: "red",
  };

  return <div style={style}>{feedback.msg}</div>;
};

export default Feedback;
