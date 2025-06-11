import styles from "./ShowOne.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameControls from "../../components/GameControls/GameControls";
import axios from "axios";
import { userInfo } from "../../context/user/userContext";

export default function ShowOnePage() {
  const { user } = userInfo();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function getOne() {
      try {
        const res = await axios.get(`http://localhost:3000/api/game/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getOne();
  }, [id]);

  if (!item) return <h3 className={styles.loading}>Loading...</h3>;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={item.img} alt={item.title} />
      <section className={styles.details}>
        <h1 className={styles.title}>{item.title}</h1>

        <p className={styles.price}>
          <strong>Price: </strong>${item.price.toFixed(2)}
        </p>

        {user && (
          <GameControls
            admin={user.admin}
            gameId={item._id}
            inStock={item.qty}
          />
        )}

        <p className={styles.category}>
          <strong>Category: </strong> {item.category} Game
        </p>
        <p className={styles.description}>
          <strong>Description: </strong> {item.desc}
        </p>
      </section>
    </div>
  );
}
