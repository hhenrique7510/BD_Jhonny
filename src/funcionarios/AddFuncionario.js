import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFuncionario() {
    let navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        cpf: "",
        celular: "",
        nome: "",
        senha: "",
        emailPrincipal: "",
        emailSecundario: null,
        bairro: "",
        salario: "",
        rua: "",  
        numero: "",  
        cep: ""  
    });
    const [error, setError] = useState("");

    const { cpf, celular, nome, senha, emailPrincipal, bairro, salario, rua, numero, cep, emailSecundario } = funcionario;

    const onInputChange = (e) => {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message

        const data = {
            cpf,
            salario: parseFloat(salario),
            celular,
            nome,
            senha,
            emailPrincipal,
            emailSecundario,
            rua,
            numero: parseInt(numero, 10),
            cep: parseInt(cep, 10),
            bairro
        };

        try {
            console.log("Dados enviados:", data);  // Log dos dados enviados para depuração
            const response = await axios.post("http://localhost:8080/funcionario", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Resposta do servidor:', response.data);
            navigate("/");
        } catch (error) {
            if (error.response) {
                // O servidor respondeu com um código de status fora do intervalo 2xx
                console.error('Erro na resposta do servidor:', error.response.data);
                console.error('Código de status:', error.response.status);
                console.error('Headers:', error.response.headers);
                setError(`Erro: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                // A solicitação foi feita, mas nenhuma resposta foi recebida
                console.error('Nenhuma resposta recebida:', error.request);
                setError('Erro: Nenhuma resposta recebida do servidor.');
            } else {
                // Algo aconteceu ao configurar a solicitação
                console.error('Erro ao configurar a solicitação:', error.message);
                setError(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className='container'>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Registrar Funcionário</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cpf"
                            value={cpf}
                            onChange={(e) => onInputChange(e)}
                            placeholder="CPF do funcionário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="celular" className="form-label">Celular:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="celular"
                            value={celular}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Celular do funcionário"
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
                            placeholder="Nome do funcionário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="senha"
                            value={senha}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Senha do funcionário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailPrincipal" className="form-label">Email Principal:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="emailPrincipal"
                            value={emailPrincipal}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Email principal do funcionário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bairro" className="form-label">Bairro:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="bairro"
                            value={bairro}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Bairro do funcionário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salario" className="form-label">Salário:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="salario"
                            value={salario}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Salario do funcionario"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rua" className="form-label">Rua:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="rua"
                            value={rua}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Rua do funcionario"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="numero" className="form-label">Número:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="numero"
                            value={numero}
                            onChange={(e) => onInputChange(e)}
                            placeholder="Numero da rua do funcionario"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cep" className="form-label">CEP:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cep"
                            value={cep}
                            onChange={(e) => onInputChange(e)}
                            placeholder="CEP do funcionario"
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-primary">
                        Submit
                    </button>
                    <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/")}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}
