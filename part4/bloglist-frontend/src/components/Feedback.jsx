import { SUCCESS } from '../constants';

const Feedback = ({ feedback: { text, type } }) => {
  const style = {
    border: '1px solid black',
    padding: '10px',
    color: type === SUCCESS ? 'green' : 'red',
  };

  return <div style={style}>{text}</div>;
};

export default Feedback;
