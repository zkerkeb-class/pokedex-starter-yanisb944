import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export function getAllPokemons() {
  return axios.get(`${API_BASE_URL}/pokemons`);
}

export function getPokemonById(id) {
  return axios.get(`${API_BASE_URL}/pokemons/${id}`);
}

export function createPokemon(data) {
  return axios.post(`${API_BASE_URL}/pokemons`, data);
}

export function updatePokemon(id, data) {
  return axios.put(`${API_BASE_URL}/pokemons/${id}`, data);
}

export function deletePokemon(id) {
  return axios.delete(`${API_BASE_URL}/pokemons/${id}`);
}
