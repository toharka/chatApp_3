import React from 'react';

const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  users: [],
  setUsers: () => {},
});

export default UserContext;
