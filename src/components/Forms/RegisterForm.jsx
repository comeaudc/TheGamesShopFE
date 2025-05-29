import style from "./Form.module.css";
import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setNewUser }) {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let msg = "";

    if (!formData.username.trim()) {
      msg += `Please include UserName \n`;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      msg += `Please include valid Email \n`;
    }

    if (!formData.password || formData.password !== formData.password2) {
      msg += `Please include a password and make sure they match`;
    }

    if (msg) {
      return alert(msg);
    }

    try {
      await signup(formData);

      nav("/dashboard");
    } catch (err) {
      alert("Regsiter Failed, Make sure you dont have an account already");
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="UserName..."
      />
      <input
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="Email..."
      />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password..."
      />
      <input
        onChange={handleChange}
        type="password"
        name="password2"
        placeholder="Confirm Password..."
      />
      <input type="submit" value="Register" />
      <p>
        Already A User?{" "}
        <span
          className={style.toggle}
          onClick={() => {
            setNewUser(false);
          }}
        >
          Login
        </span>
      </p>
    </form>
  );
}
