import { useParams } from "react-router-dom";
import { useInventory } from "../context/inventory/inventoryContext";
import InventoryItem from "../components/InventoryItem/InventoryItem";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { category } = useParams();
  const { getCategory, inventory } = useInventory();

  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!inventory) {
      return;
    }

    let res = getCategory(category);

    setItems(res);
  }, [inventory, category]);

  function displayItems() {
    return items.map((game) => {
      return <InventoryItem key={game._id} game={game} />;
    });
  }

  return items ? (
    <div className="inventoryGrid">{displayItems()}</div>
  ) : (
    <h3>Loading...</h3>
  );
}

// return inventory ? {loaded()} : loading();
