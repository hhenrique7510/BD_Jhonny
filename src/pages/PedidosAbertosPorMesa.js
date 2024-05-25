import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PedidosAbertosPorMesa() {
  const [mesas, setMesas] = useState([]);
  const [mesaId, setMesaId] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtoInfo, setProdutoInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mesas');
        setMesas(response.data);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
    };

    fetchMesas();
  }, []);

  useEffect(() => {
    const fetchPedidosAbertos = async () => {
      if (mesaId) {
        try {
          const response = await axios.get(`http://localhost:8080/pedido_garcom_mesa/mesa/${mesaId}/abertos`);
          setPedidos(response.data);
          const pedidoIds = response.data.map(pedido => pedido.fk_pedido_id_pedido);
          if (pedidoIds.length > 0) {
            const produtosResponse = await axios.post('http://localhost:8080/pedido_produto/pedidos', pedidoIds);
            setProdutos(produtosResponse.data);

            const produtoIds = [...new Set(produtosResponse.data.map(produto => produto.fk_produtos_id_prod))];
            if (produtoIds.length > 0) {
              const nomesResponse = await axios.post('http://localhost:8080/produtos/byIds', produtoIds);
              const infoMap = {};
              nomesResponse.data.forEach(produto => {
                infoMap[produto.id_prod] = { nome: produto.nome, valor: produto.valor };
              });
              setProdutoInfo(infoMap);
            }
          } else {
            setProdutos([]);
            setProdutoInfo({});
          }
        } catch (error) {
          console.error('Erro ao buscar pedidos abertos:', error);
        }
      } else {
        setPedidos([]);
        setProdutos([]);
        setProdutoInfo({});
      }
    };

    fetchPedidosAbertos();
  }, [mesaId]);

  const handleMesaIdChange = (e) => {
    setMesaId(e.target.value);
  };

  const agruparProdutos = () => {
    const agrupados = {};

    produtos.forEach(produto => {
      const info = produtoInfo[produto.fk_produtos_id_prod];
      if (info) {
        if (!agrupados[info.nome]) {
          agrupados[info.nome] = {
            nome: info.nome,
            valor: info.valor,
            quantidade: 0,
            valorParcial: 0
          };
        }
        agrupados[info.nome].quantidade += produto.qtd_produto;
        agrupados[info.nome].valorParcial = agrupados[info.nome].quantidade * info.valor;
      }
    });

    return Object.values(agrupados);
  };

  const calcularValorTotal = (produtosAgrupados) => {
    return produtosAgrupados.reduce((total, produto) => total + produto.valorParcial, 0).toFixed(2);
  };

  const calcularValorTotalComOpcional = (valorTotal) => {
    return (valorTotal * 1.1).toFixed(2);
  };

  const produtosAgrupados = agruparProdutos();
  const valorTotal = parseFloat(calcularValorTotal(produtosAgrupados));
  const valorTotalComOpcional = calcularValorTotalComOpcional(valorTotal);

  const handlePagarConta = async () => {
    try {
      await axios.put(`http://localhost:8080/pedido_garcom_mesa/fechar/${mesaId}`);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fechar pedidos:', error);
    }
  };

  return (
    <div className="container">
      <h2>Pedidos Abertos por Mesa</h2>
      <div className="mb-3">
        <label htmlFor="mesaId" className="form-label">ID da Mesa:</label>
        <select
          className="form-control"
          id="mesaId"
          value={mesaId}
          onChange={handleMesaIdChange}
        >
          <option value="">Selecione a Mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id_mesa} value={mesa.id_mesa}>
              {mesa.id_mesa}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <h4>Pedidos Abertos:</h4>
        <ul className="list-group">
          {pedidos.map((pedido, index) => (
            <li key={index} className="list-group-item">
              Pedido ID: {pedido.fk_pedido_id_pedido}, Garçom CPF: {pedido.fk_funcionario_cpf}, Mesa ID: {pedido.fk_mesa_id_mesa}, Status: {pedido.status}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4>Itens dos Pedidos Abertos:</h4>
        <ul className="list-group">
          {produtosAgrupados.map((produto, index) => (
            <li key={index} className="list-group-item">
              Produto: {produto.nome}, Quantidade: {produto.quantidade}, Valor Unitário: R$ {produto.valor.toFixed(2)}, Valor Parcial: R$ {produto.valorParcial.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4>Valor Total da Conta:</h4>
        <p>R$ {valorTotal}</p>
      </div>
      <div className="mt-4">
        <h4>Valor Total com 10% Opcional:</h4>
        <p>R$ {valorTotalComOpcional}</p>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={handlePagarConta} disabled={pedidos.length === 0}>Pagar a Conta</button>
      </div>
    </div>
  );
}
