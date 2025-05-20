import axios from "axios";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [inventory, setInventory] = useState(null);

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
      return (
        <div>
          <h3>{game.title}</h3>
          <p>$ {game.price}</p>
          <p>Description: {game.desc}</p>
        </div>
      );
    });
  };

  return inventory ? loaded() : loading();
}
