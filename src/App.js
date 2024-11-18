// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewsList from "./NewsList"; // Import NewsList component
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-layout">
          <Header />
          <div className="main-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/news" element={<NewsList />} /> {/* Add NewsList route */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
