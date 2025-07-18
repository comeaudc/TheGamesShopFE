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
        let res = await axios.post(
          `https://thegamesshopbe.onrender.com/api/game`,
          formData,
          {
            headers: { token: cookies.token },
          }
        );

        addToInventory(res.data);

        nav("/dashboard");
      } else {
        return alert("Please Fill In Fields");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    nav("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.createForm}>
      <h3>Add New Game</h3>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="Title..."
        value={formData.title}
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        onChange={handleChange}
        name="category"
        value={formData.category}
      >
        <option value="">...Choose One</option>
        <option value="Board">Board</option>
        <option value="Dice">Dice</option>
        <option value="Card">Card</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Video">Video</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="price">Price:</label>
      <input
        id="price"
        onChange={handleChange}
        type="number"
        name="price"
        value={formData.price}
      />

      <label htmlFor="desc">Description:</label>
      <textarea
        id="desc"
        onChange={handleChange}
        name="desc"
        placeholder="Please Enter a Description"
        value={formData.desc}
      />

      <label htmlFor="qty">Quantity:</label>
      <input
        id="qty"
        onChange={handleChange}
        type="number"
        name="qty"
        min={0}
        value={formData.qty}
      />

      <label htmlFor="img">Image Url:</label>
      <input
        id="img"
        onChange={handleChange}
        type="text"
        name="img"
        placeholder="Image Url..."
        value={formData.img}
      />

      <input type="submit" value="Add Game" />
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
