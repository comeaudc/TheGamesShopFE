import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";
import axios from "axios";

export default function AdminDashItem({ title, price, category, qty, _id }) {
  const { cookies } = useAuth();
  const { removeFromInventory } = useInventory();
  const nav = useNavigate();
  function handleEdit() {
    nav(`/update/${_id}`);
  }

  async function handleDelete() {
    try {
      let answer = confirm(`Are you sure you want to delete this item?`);

      if (answer) {
        await axios.delete(`http://localhost:3000/api/game/${_id}`, {
          headers: { token: cookies.token },
        });
        removeFromInventory(_id);
        alert("Delete Successfull");
      }

      return;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <tr>
      <td>{title}</td>
      <td>{category}</td>
      <td>$ {price}</td>
      <td>{qty}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}
