import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [currentEdit, setCurrentEdit] = useState(null);

  const removeItem = (id) => {
    setCart((c) => c.filter((item) => item.game._id !== id));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.qty * item.game.price, 0);
  };

  const adjustQty = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.game._id === id ? { ...item, qty } : item))
    );
  };

  const value = {
    user,
    setUser,

    cart,
    setCart,

    currentEdit,
    setCurrentEdit,

    removeItem,
    getTotal,
    adjustQty,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function userInfo() {
  return useContext(UserContext);
}
