import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduto() {
    let navigate = useNavigate();
    const [produto, setProduto] = useState({
        id: "",
        nome: "",
        valor: "",
        produtos_tipo: ""  // Ensure the key name matches the backend model
    });
    const [error, setError] = useState("");

    const { id, nome, valor, produtos_tipo } = produto;

    const onInputChange = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message

        const data = {
            id,
            nome,
            valor: parseFloat(valor),
            produtos_tipo  // Ensure this key matches the backend field
        };

        try {
            console.log("Dados enviados:", data); 
            const response = await axios.post("http://localhost:8080/product", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Resposta do servidor:', response.data);
            navigate("/cadastrarproduto");
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside the range of 2xx
                console.error('Erro na resposta do servidor:', error.response.data);
                console.error('Código de status:', error.response.status);
                console.error('Headers:', error.response.headers);
                setError(`Erro: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Nenhuma resposta recebida:', error.request);
                setError('Erro: Nenhuma resposta recebida do servidor.');
            } else {
                // Something happened in setting up the request
                console.error('Erro ao configurar a solicitação:', error.message);
                setError(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className='container'>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Adicionar Produto</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID do Produto:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            value={id}
                            onChange={(e) => onInputChange(e)}
                            placeholder="ID do produto"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={nome}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Nome do produto"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="valor" className="form-label">Valor:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="valor"
                            value={valor}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Valor do produto"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="produtos_tipo" className="form-label">Tipo de Produto:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="produtos_tipo"
                            value={produtos_tipo}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Tipo de produto"
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">
                        Cadastrar
                    </button>
                    <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/cadastrarproduto")}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}
