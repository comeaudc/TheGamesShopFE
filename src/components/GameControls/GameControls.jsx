import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";
import axios from "axios";
import style from "./GameControls.module.css";

export default function GameControls({ admin, gameId, inStock }) {
  const { removeFromInventory } = useInventory();
  const { cookies } = useAuth();
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  function handleChange(e) {
    setQty(e.target.value);
  }

  async function handleDelete() {
    try {
      let answer = confirm(`Are you sure you want to delete this item?`);

      if (answer) {
        await axios.delete(
          `https://thegamesshopbe.onrender.com/api/game/${gameId}`,
          {
            headers: { token: cookies.token },
          }
        );
        removeFromInventory(gameId);
        alert("Delete Successfull");
        nav("/dashboard");
      }

      return;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `https://thegamesshopbe.onrender.com/api/cart/${gameId}`,
        { qty: qty },
        { headers: { token: cookies.token } }
      );

      let anwser = confirm("Successfully Added to Cart!\nContinue Shopping?");

      if (!anwser) nav("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }
  function handleEdit() {
    nav(`/update/${gameId}`);
  }

  return (
    <div className={style.gameControls}>
      {admin ? (
        <>
          <p>
            <strong>In Stock:</strong> {inStock}
          </p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            onChange={handleChange}
            name="number"
            value={qty}
            min="1"
          />
          <input type="submit" value="Add to Cart" />
        </form>
      )}
    </div>
  );
}
