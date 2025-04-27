import { useEffect, useState } from "react";
import { getPokemonById } from "../services/api";

const PokemonDetails = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonById(id)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error("Erreur:", err));
  }, [id]);

  if (!pokemon) return <div>Chargement...</div>;

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name.french}</h2>
      <img
        src={`/src/assets/pokemons/${pokemon.id}.png`}
        alt={pokemon.name.french}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/default-pokemon.png";
        }}
      />
      <p><strong>Type:</strong> {pokemon.type.join(", ")}</p>
      <p><strong>HP:</strong> {pokemon.base.HP}</p>
      <p><strong>Attack:</strong> {pokemon.base.Attack}</p>
      <p><strong>Defense:</strong> {pokemon.base.Defense}</p>
    </div>
  );
};

export default PokemonDetails;
