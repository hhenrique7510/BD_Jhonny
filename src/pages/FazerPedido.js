import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FazerPedido() {
  const [cpf, setCpf] = useState('');
  const [garcons, setGarcons] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [showProdutos, setShowProdutos] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const fetchGarcons = async () => {
    try {
      const response = await axios.get('http://localhost:8080/garcons');
      setGarcons(response.data);
    } catch (error) {
      console.error('Erro ao buscar garçons:', error);
    }
  };

  const fetchMesas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mesas');
      setMesas(response.data);
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchGarcons();
    fetchMesas();
  }, []);

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handleMesaChange = (e) => {
    setMesa(e.target.value);
  };

  const handleQuantidadeChange = (e, produtoId) => {
    setQuantidades({ ...quantidades, [produtoId]: e.target.value });
  };

  const handleAddProduto = (produto) => {
    const produtoExistente = pedido.find(p => p.id_prod === produto.id_prod);
    const quantidade = parseInt(quantidades[produto.id_prod], 10);

    if (quantidade && quantidade > 0) {
      if (produtoExistente) {
        setPedido(
          pedido.map(p =>
            p.id_prod === produto.id_prod
              ? { ...p, quantidade: quantidade, valorParcial: quantidade * produto.valor }
              : p
          )
        );
      } else {
        setPedido([...pedido, { ...produto, quantidade: quantidade, valorParcial: quantidade * produto.valor }]);
      }
      setQuantidades({ ...quantidades, [produto.id_prod]: '' }); // Reset quantidade after adding
    }
  };

  const handleRemoveProduto = (index) => {
    setPedido(pedido.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (pedido.length === 0) {
      setErro('O pedido não pode ser enviado sem produtos.');
      return;
    }

    try {
      // Primeiro, cria o pedido e obtém o ID do pedido criado
      const response = await axios.post('http://localhost:8080/pedido', {});
      const pedidoId = response.data;

      // Em seguida, cria as associações de produtos com o pedido
      await Promise.all(pedido.map(produto => {
        return axios.post('http://localhost:8080/pedido_produto', {
          fk_produtos_id_prod: produto.id_prod,
          fk_pedido_id_pedido: pedidoId,
          qtd_produto: produto.quantidade
        });
      }));

      // Cria a associação do pedido com o garçom e a mesa
      await axios.post('http://localhost:8080/pedido_garcom_mesa', {
        fk_funcionario_cpf: cpf,
        fk_mesa_id_mesa: mesa,
        fk_pedido_id_pedido: pedidoId,
        status: 'aberto'
      });

      // Após enviar todos os dados, redirecione para a página inicial
      navigate('/');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  };

  const calcularTotalParcial = () => {
    return pedido.reduce((total, produto) => total + produto.valorParcial, 0).toFixed(2);
  };

  return (
    <div className="container">
      <h2>Fazer Pedido</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF do Garçom:</label>
          <select
            className="form-control"
            id="cpf"
            value={cpf}
            onChange={handleCpfChange}
          >
            <option value="">Selecione o CPF do Garçom</option>
            {garcons.map((garcom) => (
              <option key={garcom.fk_funcionario_cpf} value={garcom.fk_funcionario_cpf}>
                {garcom.fk_funcionario_cpf}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="mesa" className="form-label">Mesa:</label>
          <select
            className="form-control"
            id="mesa"
            value={mesa}
            onChange={handleMesaChange}
          >
            <option value="">Selecione a Mesa</option>
            {mesas.map((mesa) => (
              <option key={mesa.id_mesa} value={mesa.id_mesa}>
                {mesa.id_mesa}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowProdutos(!showProdutos);
              if (!showProdutos) {
                fetchProdutos();
              }
            }}
          >
            {showProdutos ? 'Esconder Produtos' : 'Listar Produtos'}
          </button>
        </div>
        {showProdutos && (
          <div className="mb-3">
            <label className="form-label">Produtos:</label>
            <div className="list-group">
              {produtos.map((produto) => (
                <div key={produto.id_prod} className="list-group-item">
                  <span>{produto.nome} - R$ {produto.valor.toFixed(2)}</span>
                  <input
                    type="number"
                    min="1"
                    className="form-control d-inline w-auto ml-3"
                    value={quantidades[produto.id_prod] || ''}
                    onChange={(e) => handleQuantidadeChange(e, produto.id_prod)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary ml-2"
                    onClick={() => handleAddProduto(produto)}
                    disabled={pedido.some(p => p.id_prod === produto.id_prod)}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4">
          <h4>Produtos no Pedido:</h4>
          <ul className="list-group">
            {pedido.map((produto, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {produto.nome} - Quantidade: {produto.quantidade} - Parcial: R$ {produto.valorParcial.toFixed(2)}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveProduto(index)}>Remover</button>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <h5>Total Parcial: R$ {calcularTotalParcial()}</h5>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4" disabled={pedido.length === 0}>Enviar Pedido</button>
      </form>
    </div>
  );
}
