import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CadastrarProduto = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        loadProdutos();
    }, []);

    const loadProdutos = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProdutos(result.data);
    };

    return (
        <div className="container">
            <h2>Cadastrar Produto</h2>
            <Link to="/addproduto" className="btn btn-primary mb-3">Cadastrar Produto</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo de Produto</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id_prod}>
                            <td>{produto.id_prod}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.produtos_tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CadastrarProduto;
