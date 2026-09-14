const Feedback = ({ msg }) => {
  if (!msg) return;

  const style = {
    color: "red",
  };

  return <div style={style}>{msg}</div>;
};

export default Feedback;
