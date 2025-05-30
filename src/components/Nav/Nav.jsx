import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Nav.module.css";
import { useAuth } from "../../context/auth/authContext";
import { userInfo } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, setCart, setUser } = userInfo();
  const { cookies, logout } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (cookies.token && !user) {
        try {
          let res = await axios.get(`http://localhost:3000/api/user`, {
            headers: { token: cookies.token },
          });

          const { username, admin, email } = res.data;

          setCart(res.data.cart.items);
          setUser({ username, email, admin });
        } catch (err) {
          console.error(err.message);
        }
      }
    }

    checkUser();
  }, []);

  function handleLogout() {
    logout();

    nav("/");
  }
  return (
    <nav className={styles.mainNav}>
      <ul>
        <li>
          <Link to="/">HomePage</Link>
        </li>

        {cookies.token ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {user && user.admin ? (
              <li>
                <Link to="/create">Create Form</Link>
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
