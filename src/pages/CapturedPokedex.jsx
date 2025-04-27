import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCapturedPokemons,
  updateCapturedPokemon,
  deleteCapturedPokemon,
} from "../services/apiMongo"; // ✅ import API Mongo
import "./CapturedPokedex.css";

const CapturedPokedex = () => {
  const [capturedPokemons, setCapturedPokemons] = useState([]);
  const [healingIndex, setHealingIndex] = useState(null);
  const navigate = useNavigate();
  const updatedIntervals = {};

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await getCapturedPokemons();
      setCapturedPokemons(res.data);
    };
    fetchPokemons();
  }, []);

  const startHealing = (index) => {
    if (healingIndex !== null) return;

    setHealingIndex(index);

    const interval = setInterval(async () => {
      setCapturedPokemons((prev) => {
        const updated = [...prev];
        if (updated[index].hp < 100) {
          updated[index].hp = Math.min(updated[index].hp + 2, 100);
        }

        if (updated[index].hp === 100) {
          clearInterval(interval);
          setHealingIndex(null);
          alert(`✨ ${updated[index].name} est complètement soigné !`);
        }

        return updated;
      });

      const id = capturedPokemons[index]._id;
      if (id) {
        await updateCapturedPokemon(id, { hp: 100 });
      }
    }, 100);

    updatedIntervals[index] = interval;
  };

  const stopHealing = (index) => {
    clearInterval(updatedIntervals[index]);
    setHealingIndex(null);
  };

  const deletePokemon = async (id) => {
    await deleteCapturedPokemon(id);
    setCapturedPokemons((prev) => prev.filter(p => p._id !== id));
  };

  return (
    <div className="catch-container">
      <h2>🎒 Pokédex des Capturés</h2>

      {capturedPokemons.length === 0 ? (
        <p>Aucun Pokémon capturé pour l’instant...</p>
      ) : (
        <div className="pokedex-captured-grid">
          {capturedPokemons.map((p, idx) => (
            <div key={p._id} className="pokedex-captured-card">
              <img
                src={p.img}
                alt={p.name}
                className={`pokedex-captured-img ${healingIndex === idx ? "healing" : ""}`}
                onMouseDown={() => startHealing(idx)}
                onMouseUp={() => stopHealing(idx)}
                onMouseLeave={() => stopHealing(idx)}
              />
              <h5>{p.name}</h5>
              <p>PV : {p.hp}/100</p>
              <button
                className="delete-button"
                onClick={() => deletePokemon(p._id)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="return-button" onClick={() => navigate("/catch")}>
        Retour à la Chasse
      </button>
    </div>
  );
};

export default CapturedPokedex;
