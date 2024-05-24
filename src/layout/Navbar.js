// src/layout/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';  // Certifique-se de importar um arquivo CSS para estilização

export default function Navbar() {
  return (
    <div>
      <nav className="custom-navbar">
        <div className="container-fluid d-flex align-items-center">
          <Link className="navbar-brand custom-brand" to="/">
            Home Page
          </Link>
          <div className="custom-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/funcionarios">
                  Cadastrar Funcionarios
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/cadastrarproduto">
                  Cadastrar Produtos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-link" to="/pedido">
                  Pedidos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
