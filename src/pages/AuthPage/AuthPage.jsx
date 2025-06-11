import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import styles from "./AuthPage.module.css";
import { useState } from "react";

export default function AuthPage() {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className={styles.authPage}>
      {newUser ? (
        <RegisterForm setNewUser={setNewUser} />
      ) : (
        <LoginForm setNewUser={setNewUser} />
      )}
    </div>
  );
}
