import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadFuncionarios();
    }, []);

    const loadFuncionarios = async () => {
        const result = await axios.get('http://localhost:8080/funcionarios');
        setFuncionarios(result.data);
    };

    const deleteFuncionarios = async (cpf) => {
        await axios.delete(`http://localhost:8080/funcionarioDelete/${cpf}`);
        loadFuncionarios();
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredFuncionarios = funcionarios.filter((funcionario) =>
        funcionario.cpf.includes(search)
    );

    return (
        <div className='container'>
            <div className='py-4'>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por CPF"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link className="btn btn-success mb-3" to="/addfuncionario">
                    Adicionar Funcionário
                </Link>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">cpf</th>
                            <th scope="col">salario</th>
                            <th scope="col">celular</th>
                            <th scope="col">nome</th>
                            <th scope="col">senha</th>
                            <th scope="col">email principal</th>
                            <th scope="col">email secundario</th>
                            <th scope="col">rua</th>
                            <th scope="col">numero</th>
                            <th scope="col">cep</th>
                            <th scope="col">bairro</th>
                            <th scope="col">ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFuncionarios.map((funcionario, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{funcionario.cpf}</td>
                                <td>{funcionario.salario}</td>
                                <td>{funcionario.celular}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.senha}</td>
                                <td>{funcionario.emailPrincipal}</td>
                                <td>{funcionario.emailSecundario}</td>
                                <td>{funcionario.rua}</td>
                                <td>{funcionario.numero}</td>
                                <td>{funcionario.cep}</td>
                                <td>{funcionario.bairro}</td>
                                <td>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editfuncionario/${funcionario.cpf}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteFuncionarios(funcionario.cpf)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
