// src/App.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header onSearch={(query) => setSearchQuery(query)} />
      <Outlet context={{ searchQuery }} />
    </>
  );
}

export default App;
