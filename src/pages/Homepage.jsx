import { useInventory } from "../context/inventory/inventoryContext";
import InventoryItem from "../components/InventoryItem/InventoryItem";

export default function Homepage() {
  const { inventory } = useInventory();

  let loading = () => {
    return <p>Loading Data</p>;
  };

  let loaded = () => {
    return inventory.map((game) => {
      return (
          <InventoryItem key={game._id} game={game} />
      );
    });
  };

  return inventory ? <div className="inventoryGrid">{loaded()}</div> : loading();
}
