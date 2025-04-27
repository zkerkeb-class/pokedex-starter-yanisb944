import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePokemon } from "../../services/api"; // 👈 On importe la fonction
import "./index.css";

const PokemonCard = ({ id, name, image, types, hp, attack, defense }) => {
  const [currentHp, setCurrentHp] = useState(hp);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentHp <= 0) {
      alert(`${name} est mort meskine`);
    }
  }, [currentHp]);

  const handleDelete = () => {
    if (confirm(`Voulez-vous vraiment supprimer ${name} ?`)) {
      deletePokemon(id)
        .then(() => {
          alert("Pokémon supprimé !");
          window.location.reload(); // 👈 recharge la page pour mettre à jour la liste
        })
        .catch((err) => {
          console.error("Erreur de suppression :", err);
          alert("Échec de la suppression.");
        });
    }
  };

  return (
    <div className="pokemon-card-container">
      <Link
        to={`/pokemon/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="pokemon-card blue-background">
          <div className="pokemon-name-container">
            <span className="pokemon-name">{name}</span>
          </div>
          <img className="pokemon-image" src={image} alt={name} />
          <div className="pokemon-types-container">
            {types.map((type) => (
              <span className="pokemon-type" key={type}>
                {type}
              </span>
            ))}
          </div>
          <div className="pokemon-stats-container">
            <span>HP: {currentHp}</span>
            <span>Attack: {attack}</span>
            <span>Defense: {defense}</span>
          </div>
        </div>
      </Link>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          className="attack-button"
          onClick={() => setCurrentHp(currentHp - 10)}
        >
          Attack
        </button>
        <button
          className="edit-button"
          onClick={() => navigate(`/edit/${id}`)}
        >
          ✏️ Modifier
        </button>
        <button
          className="delete-button"
          style={{ backgroundColor: "#e74c3c", color: "white" }}
          onClick={handleDelete}
        >
          🗑 Supprimer
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
