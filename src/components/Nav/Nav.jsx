import { Link } from "react-router-dom";
import bannerLogo from "../../assets/banner.png";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Nav.module.css";
import { useAuth } from "../../context/auth/authContext";
import { useInventory } from "../../context/inventory/inventoryContext";
import { userInfo } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, setCart, setUser } = userInfo();
  const { setInventory, inventory } = useInventory();
  const { cookies, logout } = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (cookies.token && !user) {
        try {
          let res = await axios.get(
            `https://thegamesshopbe.onrender.com/api/user`,
            {
              headers: { token: cookies.token },
            }
          );

          const { username, admin, email } = res.data;

          setCart(res.data.cart.items);
          setUser({ username, email, admin });
        } catch (err) {
          console.error(err.message);
        }
      }
      if (!inventory) {
        try {
          let res = await axios("https://thegamesshopbe.onrender.com/api/game");
          setInventory(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    }

    checkUser();
  }, []);

  function handleFilter(e) {
    if (e.target.value) nav(`/category/${e.target.value}`);
    else nav("/");
  }

  function handleLogout() {
    logout();

    nav("/");
  }
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li>
          <Link to="/">
            <img className={styles.navImg} src={bannerLogo} alt="TheGameShop" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <strong>View All</strong>
          </Link>
        </li>
        <li>
          <label>
            <strong>Filter By:</strong>
            <select onChange={handleFilter}>
              <option value="">...</option>
              <option value="Board">Board</option>
              <option value="Dice">Dice</option>
              <option value="Card">Card</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Video">Video</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </li>

        {cookies.token ? (
          <>
            <li>
              <Link to="/dashboard">
                <strong>Dashboard</strong>
              </Link>
            </li>
            {user && user.admin ? (
              <li>
                <Link to="/create">
                  <strong>Create Form</strong>
                </Link>
              </li>
            ) : null}

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">SignIn/SignUp</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
