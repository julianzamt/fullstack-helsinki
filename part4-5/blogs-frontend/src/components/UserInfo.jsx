import { Button, Typography } from '@mui/material';

const UserInfo = ({ user, onLogout }) => (
  <>
    <Typography component="span">{user.name} is logged in</Typography>
    <Button color="inherit" onClick={onLogout}>
      Logout
    </Button>
  </>
);

export default UserInfo;
