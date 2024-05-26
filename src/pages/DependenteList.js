import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export default function DependenteList() {
    const { cpf } = useParams();
    const navigate = useNavigate(); // Use navigate for navigation
    const [dependentes, setDependentes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [novoDependente, setNovoDependente] = useState({ nome: '', cpf_dependente: '' });

    const loadDependentes = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8080/dependenteByFuncionario/${cpf}`);
            setDependentes(Array.isArray(result.data) ? result.data : []);
        } catch (error) {
            console.error('Erro ao carregar os dependentes:', error);
            alert('Erro ao carregar os dependentes');
        }
    }, [cpf]);

    useEffect(() => {
        loadDependentes();
    }, [loadDependentes]);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoDependente({ ...novoDependente, [name]: value });
    };

    const handleAddDependente = async () => {
        try {
            await axios.post('http://localhost:8080/dependente', { ...novoDependente, fk_funcionario_cpf: cpf });
            loadDependentes();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao adicionar o dependente:', error);
            alert('Erro ao adicionar o dependente');
        }
    };

    const handleDeleteDependente = async (cpf_dependente) => {
        try {
            await axios.delete(`http://localhost:8080/dependenteDelete/${cpf_dependente}`);
            loadDependentes();
        } catch (error) {
            console.error('Erro ao deletar o dependente:', error);
            alert('Erro ao deletar o dependente');
        }
    };

    const handleBack = () => {
        navigate('/funcionarios');
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <h3>Dependentes do Funcionário {cpf}</h3>
                <button className='btn btn-primary mb-3' onClick={handleOpenModal}>
                    Adicionar Dependente
                </button>
                <button className='btn btn-secondary mb-3 ml-2' onClick={handleBack}>
                    Voltar para Funcionários
                </button>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF Dependente</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dependentes.map((dependente, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{dependente.nome}</td>
                                <td>{dependente.cpf_dependente}</td>
                                <td>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => handleDeleteDependente(dependente.cpf_dependente)}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h2>Adicionar Dependente</h2>
                <form>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={novoDependente.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>CPF Dependente</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cpf_dependente"
                            value={novoDependente.cpf_dependente}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddDependente}>
                        Adicionar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                        Cancelar
                    </button>
                </form>
            </Modal>
        </div>
    );
}
