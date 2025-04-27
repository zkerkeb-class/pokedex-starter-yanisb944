// src/pages/CreatePokemon.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../services/api";

const CreatePokemon = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: {
      french: "",
    },
    image: "",
    types: [],
    hp: 50,
    attack: 50,
    defense: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          french: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPokemon(form);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
    }
  };

  return (
    <div>
      <h1>Créer un Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom (français) :</label>
          <input
            type="text"
            name="name"
            value={form.name.french}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image (URL) :</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Types (séparés par une virgule) :</label>
          <input
            type="text"
            name="types"
            value={form.types}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                types: e.target.value.split(",").map((t) => t.trim()),
              }))
            }
          />
        </div>
        <div>
          <label>PV :</label>
          <input
            type="number"
            name="hp"
            value={form.hp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attaque :</label>
          <input
            type="number"
            name="attack"
            value={form.attack}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Défense :</label>
          <input
            type="number"
            name="defense"
            value={form.defense}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreatePokemon;
