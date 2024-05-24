// src/pages/Pedido.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Pedido() {
  return (
    <div className="container">
      <h1>Menu de Pedido</h1>
      <div className="mt-4">
        <Link className="btn btn-dark me-2" to="/fazerpedido">Fazer Pedido</Link>
        <Link className="btn btn-dark me-2" to="/fecharconta">Fechar Conta</Link>
      </div>
    </div>
  );
}