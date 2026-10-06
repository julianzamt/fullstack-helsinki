const UserInfo = ({ user, onLogout }) => (
  <div>
    {user.name} is logged in <button onClick={onLogout}>Logout</button>
  </div>
);

export default UserInfo;
