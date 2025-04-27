import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/apiAuth";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      alert("Erreur lors de l'inscription !");
    }
  };

  return (
    <div className="form-container">
      <h2>Inscription</h2>
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
        <button type="submit">S'inscrire</button>
      </form>

      <p className="auth-link">
        Déjà inscrit ?{" "}
        <span onClick={() => navigate("/login")}>Se connecter</span>
      </p>
    </div>
  );
};

export default Register;
