import React, { createContext, useState } from 'react';

/**
 * User Context Properties
 */
export interface ContextProps {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  streetNo: string;
  streetName: string;
  postcode: string;
  phone: string;
  role: {
    id: number;
    name: string;
  };
};

/**
 * User State
 */
const userState: ContextProps | null = null;

/**
 * User Context
 */
export const UserContext = createContext<{
  user: ContextProps | null;
  setUser: React.Dispatch<ContextProps | null>
}>({
  user: userState,
  setUser: () => null
});

/**
 * User Provider
 */
export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ContextProps | null>(userState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  )
};