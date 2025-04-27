import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/apiAuth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Erreur de connexion !");
    }
  };

  return (
    <div className="form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="username"
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      <p className="auth-link">
        Pas encore inscrit ?{" "}
        <span onClick={() => navigate("/register")}>Créer un compte</span>
      </p>
    </div>
  );
};

export default Login;
