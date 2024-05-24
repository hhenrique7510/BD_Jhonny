// src/layout/Footer.js
import React from "react";
import './Footer.css'; // Certifique-se de importar um arquivo CSS para estilização

export default function Footer() {
  return (
    <footer className="footer-background text-white footer-margin">
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-6 text-center text-md-left">
            <p>&copy; {new Date().getFullYear()} - Malo</p>
          </div>
          <div className="col-md-6 text-center text-md-right">
            <p>Desenvolvido por <a href="https://github.com/VictorHTenorio" className="developer-link">Victor</a><br/>
            <a href="https://github.com/hhenrique7510" className="developer-link">Henrique</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
