import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const gradientsByType = {
  grass: "linear-gradient(to bottom, #7ac74c, #4e8234)",
  fire: "linear-gradient(to bottom, #f08030, #c03028)",
  water: "linear-gradient(to bottom, #6890f0, #386ceb)",
  electric: "linear-gradient(to bottom, #f8d030, #e0c000)",
  ice: "linear-gradient(to bottom, #98d8d8, #78c8c8)",
  poison: "linear-gradient(to bottom, #a040a0, #682a68)",
  fighting: "linear-gradient(to bottom, #c03028, #7d1f1a)",
  psychic: "linear-gradient(to bottom, #f85888, #a13959)",
  rock: "linear-gradient(to bottom, #b8a038, #786824)",
  ground: "linear-gradient(to bottom, #e0c068, #927d44)",
  bug: "linear-gradient(to bottom, #a8b820, #6d7815)",
  fairy: "linear-gradient(to bottom, #f0b6bc, #d685ad)",
  dragon: "linear-gradient(to bottom, #7038f8, #4a30a0)",
  dark: "linear-gradient(to bottom, #705848, #49392f)",
  ghost: "linear-gradient(to bottom, #705898, #493963)",
  steel: "linear-gradient(to bottom, #b8b8d0, #787887)",
  normal: "linear-gradient(to bottom, #a8a878, #6d6d4e)",
};

const PokemonCard = ({
  id,
  name,
  image,
  types,
  hp,
  attack,
  defense,
  onDelete,
}) => {
  const [currentHp, setCurrentHp] = useState(hp);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentHp <= 0) {
      alert(`${name || "Le Pokémon"} est mort meskine`);
    }
  }, [currentHp, name]);

  const imageUrl = id
    ? new URL(`/src/assets/pokemons/${id}.png`, import.meta.url).href
    : "/images/default-pokemon.png";

  const mainType = types?.[0]?.toLowerCase() || "default";
  const glitterImage = `url('/src/assets/glitter-${mainType}.png')`;
  const typeGradient = gradientsByType[mainType] || gradientsByType.normal;

  return (
    <div
      className="pokemon-card-container"
      style={{
        "--glitter-image": glitterImage,
        "--type-gradient": typeGradient,
      }}
    >
      <Link
        to={`/pokemon/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="pokemon-card">
          <div className="pokemon-name-container">
            <span className="pokemon-name">{name || "Nom inconnu"}</span>
          </div>
          <img
            className="pokemon-image"
            src={imageUrl}
            alt={name || "pokemon"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-pokemon.png";
            }}
          />
          <div className="pokemon-types-container">
            {types?.map((type) => (
              <span className="pokemon-type" key={type}>
                {type}
              </span>
            ))}
          </div>
          <div className="pokemon-stats-container">
            <span>PV : {currentHp}</span>
            <span>Attaque : {attack}</span>
            <span>Défense : {defense}</span>
          </div>
        </div>
      </Link>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          className="pokemon-button attack"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentHp(currentHp - 10);
          }}
        >
          ⚔️ Attaquer
        </button>
        <button
          className="pokemon-button edit"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit/${id}`);
          }}
        >
          ✏️ Modifier
        </button>
        {onDelete && (
          <button
            className="pokemon-button delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            🗑 Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
