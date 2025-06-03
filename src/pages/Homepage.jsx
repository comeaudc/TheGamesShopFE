import axios from "axios";
import { useState, useEffect } from "react";
import { useInventory } from "../context/inventory/inventoryContext";
import InventoryItem from "../components/InventoryItem/InventoryItem";

export default function Homepage() {
  const { inventory, setInventory } = useInventory();

  let getData = async () => {
    try {
      let res = await axios("http://localhost:3000/api/game");

      setInventory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let loading = () => {
    return <p>Loading Data</p>;
  };

  let loaded = () => {
    return inventory.map((game) => {
      return <InventoryItem key={game._id} game={game} />;
    });
  };

  return inventory ? loaded() : loading();
}
