import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFuncionario() {
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        cpf: "", celular: "", nome: "", senha: "", emailPrincipal: "",
        bairro: "", salario: "", rua: "", numero: "", cep: "", emailSecundario: "", tipo: ""
    });
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!funcionario.cpf) {
            setError("O CPF não pode ser nulo.");
            return;
        }

        const data = {
            ...funcionario,
            salario: parseFloat(funcionario.salario),
            numero: parseInt(funcionario.numero, 10),
            cep: parseInt(funcionario.cep, 10)
        };

        try {
            // Primeiro, criar o funcionário
            await axios.post("http://localhost:8080/funcionario", data, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Se o tipo for "Garcom", criar o garçom
            if (funcionario.tipo === "Garcom") {
                // Verificar se já existe um gerente
                const gerenteResponse = await axios.get("http://localhost:8080/garcom/gerente");
                const gerente = gerenteResponse.data;

                const garcomData = {
                    fk_funcionario_cpf: funcionario.cpf,
                    fk_gerente_cpf: gerente ? gerente.fk_funcionario_cpf : null
                };

                await axios.post("http://localhost:8080/garcom", garcomData, {
                    headers: { 'Content-Type': 'application/json' },
                });

                // Se não houver gerente, tornar o novo garçom o gerente
                if (!gerente) {
                    await axios.put(`http://localhost:8080/garcom/${funcionario.cpf}`, {
                        fk_funcionario_cpf: funcionario.cpf,
                        fk_gerente_cpf: null,
                        pontos: 0
                    }, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
            }

            // Se o tipo for "Nutricionista", criar o nutricionista
            if (funcionario.tipo === "Nutricionista") {
                const nutricionistaData = {
                    fkFuncionarioCpf: funcionario.cpf
                };

                await axios.post("http://localhost:8080/nutricionista", nutricionistaData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            navigate("/");
        } catch (error) {
            console.error('Erro:', error.response ? error.response.data : error.message);
            setError("Ocorreu um erro ao enviar os dados.");
        }
    };

    return (
        <div className='container'>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Registrar Funcionário</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={onSubmit}>
                    {["cpf", "celular", "nome", "senha", "emailPrincipal","emailSecundario", "bairro", "salario", "rua", "numero", "cep"].map((field, index) => (
                        <div className="mb-3" key={index}>
                            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input
                                type="text"
                                className="form-control"
                                name={field}
                                value={funcionario[field]}
                                onChange={onInputChange}
                                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} do funcionário`}
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Tipo:</label>
                        <select className="form-control" name="tipo" value={funcionario.tipo} onChange={onInputChange}>
                            <option value="">Selecione o tipo</option>
                            <option value="Nutricionista">Nutricionista</option>
                            <option value="Garcom">Garçom</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/funcionarios")}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
