// src/pages/cadastrarproduto.js
import React from 'react';
import { Link } from 'react-router-dom';

const CadastrarProduto = () => {
  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
      <Link to="/AddProduto" className="btn btn-primary">Cadastrar Produto</Link>
    </div>
  );
};

export default CadastrarProduto;