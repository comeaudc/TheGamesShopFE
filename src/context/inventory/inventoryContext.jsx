import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export default function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState(null);

  let removeFromInventory = (id) => {
    setInventory((i) => i.filter((el) => el._id !== id));
  };

  let getCategory = (category) => {
    return inventory.filter((i) => i.category == category);
  };
  
  return (
    <InventoryContext.Provider
      value={{ inventory, setInventory, removeFromInventory, getCategory }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
