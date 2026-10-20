const UserInfo = ({ user, onLogout }) => (
  <span style={{ textAlign: 'right' }}>
    {user.name} is logged in <button onClick={onLogout}>Logout</button>
  </span>
);

export default UserInfo;
