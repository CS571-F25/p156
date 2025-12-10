import { createContext, useContext } from "react";
import useUserState from '../hooks/useUserState';

const UserContext = createContext();

export function SignedInStatus({ children }) {
  const [user, setUser] = useUserState("signedInUser", {"uid": "", "name": "", "role": "", photo: ""});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
