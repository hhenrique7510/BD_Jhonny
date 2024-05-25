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
        try {
            const funcionariosResult = await axios.get('http://localhost:8080/funcionarios');
            const garcomResult = await axios.get('http://localhost:8080/garcons');
            const nutricionistaResult = await axios.get('http://localhost:8080/nutricionistas');

            const funcionariosWithTipo = funcionariosResult.data.map(funcionario => {
                const isGarcom = garcomResult.data.some(garcom => garcom.fk_funcionario_cpf === funcionario.cpf);
                const isNutricionista = nutricionistaResult.data.some(nutricionista => nutricionista.fkFuncionarioCpf === funcionario.cpf);

                if (isGarcom) {
                    funcionario.tipo = 'Garcom';
                } else if (isNutricionista) {
                    funcionario.tipo = 'Nutricionista';
                } else {
                    funcionario.tipo = 'Outro';
                }

                return funcionario;
            });

            setFuncionarios(funcionariosWithTipo);
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
        }
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
                            <th scope="col">CPF</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Senha</th>
                            <th scope="col">Email Principal</th>
                            <th scope="col">Email Secundário</th>
                            <th scope="col">Rua</th>
                            <th scope="col">Número</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Bairro</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Ação</th>
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
                                <td>{funcionario.tipo}</td>
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
