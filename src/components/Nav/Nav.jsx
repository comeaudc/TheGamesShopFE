import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { cookies, logout } = useAuth();
  const nav = useNavigate();

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
            <li>
              <Link to="/create">Create Form</Link>
            </li>
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
