import styles from "./CreateForm.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";

export default function CreateForm() {
  const { addToInventory } = useInventory();
  const { cookies } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0.0,
    desc: "",
    qty: 0,
    img: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        formData.title &&
        formData.category &&
        formData.desc &&
        formData.img
      ) {
        let res = await axios.post(`http://localhost:3000/api/game`, formData, {
          headers: { token: cookies.token },
        });

        addToInventory(res.data);
        
        nav("/dashboard");
      } else {
        return alert("Please Fill In Fields");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <h3>Add New Game</h3>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title..."
          value={formData.title}
        />
        <select onChange={handleChange} name="category">
          <option value="">...Choose One</option>
          <option value="Board">Board</option>
          <option value="Dice">Dice</option>
          <option value="Card">Card</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Video">Video</option>
          <option value="Other">Other</option>
        </select>
        <label>
          Price:
          <input
            onChange={handleChange}
            type="number"
            name="price"
            value={formData.price}
          />
        </label>
        <input
          onChange={handleChange}
          type="textarea"
          name="desc"
          placeholder="Please Enter a Description"
          value={formData.desc}
        />
        <label>
          Quantity:
          <input
            onChange={handleChange}
            type="number"
            name="qty"
            min={0}
            value={formData.qty}
          />{" "}
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="img"
          placeholder="Image Url..."
          value={formData.img}
        />
        <input type="Submit" value="Add Game" />
        <button>Cancel</button>
      </form>
    </>
  );
}
