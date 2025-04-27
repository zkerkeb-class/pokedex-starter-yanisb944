import { useParams } from "react-router-dom";
import PokemonDetails from "../components/PokemonDetails";

function PokemonDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Détails du Pokémon #{id}</h2>
      <PokemonDetails id={id} /> {/* ⬅️ on passe l'id ici */}
    </div>
  );
}

export default PokemonDetailsPage;
