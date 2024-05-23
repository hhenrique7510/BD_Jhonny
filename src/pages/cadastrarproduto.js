import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CadastrarProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProdutos();
    }, []);

    const loadProdutos = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProdutos(result.data);
    };

    const deleteProduto = async (id_prod) => {
        await axios.delete(`http://localhost:8080/product/${id_prod}`);
        loadProdutos(); 
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id_prod}>
                            <td>{produto.id_prod}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.produtos_tipo}</td>
                            <td>
                                <button 
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteProduto(produto.id_prod)}
                                >
                                    Excluir
                                </button>
                                <button 
                                    className="btn btn-warning mx-2"
                                    onClick={() => navigate(`/editproduto/${produto.id_prod}`)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CadastrarProduto;
