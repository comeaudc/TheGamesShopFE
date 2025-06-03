import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";
import axios from "axios";

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
        await axios.delete(`http://localhost:3000/api/game/${gameId}`, {
          headers: { token: cookies.token },
        });
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
        `http://localhost:3000/api/cart/${gameId}`,
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

  return admin ? (
    <div>
      <p><strong>In Stock:</strong> {inStock}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <input type="number" onChange={handleChange} name="number" value={qty} />
      <input type="submit" value="Add to Cart" />
    </form>
  );
}
