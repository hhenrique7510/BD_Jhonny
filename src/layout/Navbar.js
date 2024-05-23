// src/layout/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';  // Ensure the CSS file is imported

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            Full Stack Application
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/cadastrarproduto">
                  Cadastrar Produtos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}