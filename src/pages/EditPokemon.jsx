// src/pages/EditPokemon.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonById, updatePokemon } from "../services/api";

const EditPokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await getPokemonById(id);
      setForm(res.data);
    };
    fetchPokemon();
  }, [id]);

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
    await updatePokemon(id, form);
    navigate("/");
  };

  if (!form) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Modifier {form.name?.french || "ce Pokémon"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom (français) :</label>
          <input
            type="text"
            name="name"
            value={form.name?.french || ""}
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
          <label>Types (séparés par des virgules) :</label>
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
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditPokemon;
