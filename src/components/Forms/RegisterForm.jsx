import style from "./Form.module.css";
import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

export default function RegisterForm({ setNewUser }) {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [error, setError] = useState(null);
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
    let errors = [];

    if (!formData.username.trim()) {
      errors.push(`Please include UserName`);
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push(`Please include valid Email`);
    }

    if (!formData.password || formData.password !== formData.password2) {
      errors.push(`Please include a password and make sure they match`);
    }

    if (errors.length) {
      let alert = errors.map((err) => {
        return <ErrorBanner msg={err} />;
      });

      setError(alert);
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
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
    <>
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
          minLength={6}
          placeholder="Password..."
        />
        <input
          onChange={handleChange}
          type="password"
          name="password2"
          minLength={6}
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
      {error && error}
    </>
  );
}
