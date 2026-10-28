import { Alert } from '@mui/material';

const Feedback = ({ feedback: { text, type } }) => (
  <Alert severity={type}>{text}</Alert>
);

export default Feedback;
