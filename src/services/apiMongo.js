import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

// Récup les Pokémon capturés
export const getCapturedPokemons = () => API.get("/capturedpokemons");

// Ajouter Pokémon capturé
export const addCapturedPokemon = (pokemon) => API.post("/capturedpokemons", pokemon);

// maj
export const updateCapturedPokemon = (id, updatedData) => API.put(`/capturedpokemons/${id}`, updatedData);

// Suprr
export const deleteCapturedPokemon = (id) => API.delete(`/capturedpokemons/${id}`);
