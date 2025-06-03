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

  let updateInventory = (id, newUpdate) => {
    let updatedInventory = inventory.map((game) =>{
      if(game._id == id){
        return newUpdate
      }

      return game
    })
    setInventory(updatedInventory)
  }
  
  return (
    <InventoryContext.Provider
      value={{ inventory, setInventory, removeFromInventory, getCategory, updateInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
