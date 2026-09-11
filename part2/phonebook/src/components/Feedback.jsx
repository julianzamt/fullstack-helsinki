import { ERR } from "../constants";

const Feedback = ({ feedback }) => {
  if (!feedback) return null;

  const { msg, type } = feedback;

  let style = {
    fontWeight: "bold",
    padding: "5px",
    margin: "5px"
  };

  style =
    type === ERR
      ? {
          ...style,
          border: "1px solid red",
          color: "red",
        }
      : {
          ...style,
          color: "green",
          border: "1px solid green",
        };

  return <div style={style}>{msg}</div>;
};

export default Feedback;
