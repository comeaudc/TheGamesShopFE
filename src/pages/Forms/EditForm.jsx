import styles from "./CreateForm.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";

export default function EditForm() {
  const { updateInventory } = useInventory();
  const { id } = useParams();
  const { cookies } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    async function getInfo() {
      try {
        let res = await axios.get(
          `https://thegamesshopbe.onrender.com/api/game/${id}`
        );

        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getInfo();
  }, []);

  const [formData, setFormData] = useState(null);

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
        let res = await axios.put(
          `https://thegamesshopbe.onrender.com/api/game/${id}`,
          formData,
          {
            headers: { token: cookies.token },
          }
        );

        updateInventory(id, formData);

        nav(`/product/${id}`);
      } else {
        return alert("Please Fill In Fields");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    nav("/");
  }

  return (
    <>
      {formData ? (
        <form onSubmit={handleSubmit} className={styles.createForm}>
          <h3>Edit Game</h3>

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

          <input type="submit" value="Update Game" />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
