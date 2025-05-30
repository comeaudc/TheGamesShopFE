import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [currentShow, setCurrentShow] = useState(null);

  const value = {
    user,
    setUser,

    cart,
    setCart,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function userInfo() {
  return useContext(UserContext);
}
