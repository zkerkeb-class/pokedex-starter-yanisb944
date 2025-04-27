//HomePage.jsx
import { useEffect, useState } from "react";
import { getAllPokemons, deletePokemon } from "../services/api";
import PokemonCard from "../components/pokemonCard";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // local ou via props plus tard

  const fetchPokemons = async () => {
    try {
      const response = await getAllPokemons();
      setPokemons(response.data);
    } catch (error) {
      console.error("Erreur de chargement des Pokémon :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce Pokémon ?")) {
      try {
        await deletePokemon(id);
        fetchPokemons();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filtered = pokemons.filter((p) => {
    const name = p.name?.french?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";
    return name.includes(query);
  });

  return (
    <div>
      <h1>Liste des Pokémon</h1>
      <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filtered.map((p) => (
          <PokemonCard
            key={p._id || p.id}
            id={p.id || p._id}
            name={p.name?.french}
            image={p.image}
            types={p.type}
            hp={p.base.HP}
            attack={p.base.Attack}
            defense={p.base.Defense}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
