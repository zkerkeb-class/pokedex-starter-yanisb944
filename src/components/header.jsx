import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import logo from "../assets/el-pokedexo-logo-transparent-v2.png";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="app-header">
      <div className="header-content">
        <img
          src={logo}
          alt="El Pokédexo"
          className="header-logo"
          onClick={() => navigate("/")}
        />

        <form className="search-bar-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {!isAuthPage && isLoggedIn && (
          <>
            <button
              className="catch-button"
              onClick={() => navigate("/catch")}
            >
              Attraper Pokémon
            </button>

            <button className="logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
