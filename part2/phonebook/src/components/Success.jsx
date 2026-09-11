const Success = ({ message }) => {
  if (!message) return null;

  const style = {
    fontWeight: "bold",
    color: "green",
  };

  return <div style={style}>{message}</div>;
};

export default Success;
