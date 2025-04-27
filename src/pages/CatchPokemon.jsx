import "./CatchPokemon.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCapturedPokemon } from "../services/apiMongo"; // ✅ nouvel import
import pokemonsList from "../assets/pokemons.js";

const CatchPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [balls, setBalls] = useState([]);
  const [caught, setCaught] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const random = pokemonsList
      .sort(() => 0.5 - Math.random())
      .slice(0, 20)
      .map((p) => ({
        name: p.name.french,
        img: p.image,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
      }));

    setPokemons(random);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPokemons((current) =>
        current.map((p) => ({
          ...p,
          x: Math.min(90, Math.max(0, p.x + (Math.random() * 20 - 10))),
          y: Math.min(80, Math.max(0, p.y + (Math.random() * 20 - 10))),
        }))
      );
    }, 800);
    return () => clearInterval(moveInterval);
  }, []);

  const handleArenaClick = (e) => {
    const arena = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - arena.left) / arena.width) * 100;
    const y = ((e.clientY - arena.top) / arena.height) * 100;

    setBalls((prev) => [...prev, { x, y, id: Date.now() }]);

    setTimeout(() => {
      setBalls((prev) => prev.slice(1));
    }, 1000);
  };

  const checkCollision = (ball) => {
    for (let p of pokemons) {
      const dx = p.x - ball.x;
      const dy = p.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 5) {
        capturePokemon(p.name);
      }
    }
  };

  const capturePokemon = async (name) => {
    if (!caught.includes(name)) {
      setCaught((prev) => [...prev, name]);
      setMessages((prev) => [...prev, { name, id: Date.now() }]);
  
      const currentPokemon = pokemons.find(p => p.name === name);
      if (currentPokemon) {
        const hp = Math.floor(Math.random() * 50) + 20;
        const newPokemon = { ...currentPokemon, hp };
        
        console.log("🔵 Envoi vers MongoDB :", newPokemon);
  
        try {
          const res = await addCapturedPokemon(newPokemon);
          console.log("🟢 Réponse serveur :", res.data);
        } catch (error) {
          console.error("🔴 Erreur API :", error);
        }
      }
    }
  };
  

  useEffect(() => {
    if (balls.length === 0) return;
    const latestBall = balls[balls.length - 1];
    checkCollision(latestBall);
  }, [balls]);

  return (
    <div className="catch-container">
      <h2>Attrape les Pokémon !</h2>

      <div className="arena" onClick={handleArenaClick}>
        {pokemons.map((p, idx) => (
          <img
            key={idx}
            src={p.img}
            alt={p.name}
            className="pokemon"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}

        {balls.map((b) => (
          <div
            key={b.id}
            className="pokeball"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          />
        ))}

        {messages.map((m) => (
          <div key={m.id} className="capture-message" style={{ left: "50%", top: "10%" }}>
            🎯 {m.name} capturé !
          </div>
        ))}
      </div>

      <div className="caught-list">
        <h3>Pokémon capturés :</h3>
        {caught.length === 0 ? (
          <p>Aucun pour l'instant...</p>
        ) : (
          <ul>
            {caught.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={() => navigate("/captured")}>
        Voir Pokédex Capturés
      </button>
    </div>
  );
};

export default CatchPokemon;
