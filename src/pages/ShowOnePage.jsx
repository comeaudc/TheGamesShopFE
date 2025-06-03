import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameControls from "../components/GameControls/GameControls";
import axios from "axios";
import { userInfo } from "../context/user/userContext";

export default function ShowOnePage() {
  const { user } = userInfo();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function getOne() {
      try {
        let res = await axios.get(`http://localhost:3000/api/game/${id}`);

        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getOne();
  }, []);

  function populateItem() {
    return (
      <div>
        <h1>{item.title}</h1>
        <p>
          <strong>Price: $</strong>
          {item.price}
        </p>
        {user && (
          <GameControls
            admin={user.admin}
            gameId={item._id}
            inStock={item.qty}
          />
        )}
        <p>
          <strong>Category: </strong> {item.category} Game
        </p>
        <p>
          <strong>Description: </strong> {item.desc}
        </p>
      </div>
    );
  }
  return item ? populateItem() : <h3>Loading...</h3>;
}
