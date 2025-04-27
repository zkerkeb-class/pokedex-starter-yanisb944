// src/config/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";
import CreatePokemon from "../pages/CreatePokemon";
import EditPokemon from "../pages/EditPokemon";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CatchPokemon from "../pages/CatchPokemon";
import CapturedPokedex from "../pages/CapturedPokedex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/pokemon/:id",
        element: <PokemonDetailsPage />,
      },
      {
        path: "/create",
        element: <CreatePokemon />,
      },
      {
        path: "/edit/:id",
        element: <EditPokemon />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/catch",
        element: <CatchPokemon />,
      },

      {
        path: "/captured",
        element: <CapturedPokedex />,
      },
    ],
  },
]);

export default router;
