import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from './api';

// Create the UserContext
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const localUser = localStorage.getItem('username');
    // if user data is missing
    if (localUser && (!user || !user?.displayName)) {
        getUserInfo(localUser).then((data) => {
            setUser(data);
          });
    }
  }, [user])

  const removeUser = () => {
    setUser();
  }
  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, removeUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
