// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function PedidosAbertosPorMesa() {
//   const [mesas, setMesas] = useState([]);
//   const [mesaId, setMesaId] = useState('');
//   const [pedidos, setPedidos] = useState([]);
//   const [produtos, setProdutos] = useState([]);
//   const [produtoNomes, setProdutoNomes] = useState({});

//   useEffect(() => {
//     const fetchMesas = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/mesas');
//         setMesas(response.data);
//       } catch (error) {
//         console.error('Erro ao buscar mesas:', error);
//       }
//     };

//     fetchMesas();
//   }, []);

//   useEffect(() => {
//     const fetchPedidosAbertos = async () => {
//       if (mesaId) {
//         try {
//           const response = await axios.get(`http://localhost:8080/pedido_garcom_mesa/mesa/${mesaId}/abertos`);
//           setPedidos(response.data);
//           const pedidoIds = response.data.map(pedido => pedido.fk_pedido_id_pedido);
//           if (pedidoIds.length > 0) {
//             const produtosResponse = await axios.post('http://localhost:8080/pedido_produto/pedidos', pedidoIds);
//             setProdutos(produtosResponse.data);

//             const produtoIds = [...new Set(produtosResponse.data.map(produto => produto.fk_produtos_id_prod))];
//             if (produtoIds.length > 0) {
//               const nomesResponse = await axios.post('http://localhost:8080/produtos/byIds', produtoIds);
//               const nomesMap = {};
//               nomesResponse.data.forEach(produto => {
//                 nomesMap[produto.idProd] = produto.nome;
//               });
//               setProdutoNomes(nomesMap);
//             }
//           } else {
//             setProdutos([]);
//             setProdutoNomes({});
//           }
//         } catch (error) {
//           console.error('Erro ao buscar pedidos abertos:', error);
//         }
//       } else {
//         setPedidos([]);
//         setProdutos([]);
//         setProdutoNomes({});
//       }
//     };

//     fetchPedidosAbertos();
//   }, [mesaId]);

//   const handleMesaIdChange = (e) => {
//     setMesaId(e.target.value);
//   };

//   return (
//     <div className="container">
//       <h2>Pedidos Abertos por Mesa</h2>
//       <div className="mb-3">
//         <label htmlFor="mesaId" className="form-label">ID da Mesa:</label>
//         <select
//           className="form-control"
//           id="mesaId"
//           value={mesaId}
//           onChange={handleMesaIdChange}
//         >
//           <option value="">Selecione a Mesa</option>
//           {mesas.map((mesa) => (
//             <option key={mesa.id_mesa} value={mesa.id_mesa}>
//               {mesa.id_mesa}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mt-4">
//         <h4>Pedidos Abertos:</h4>
//         <ul className="list-group">
//           {pedidos.map((pedido, index) => (
//             <li key={index} className="list-group-item">
//               Pedido ID: {pedido.fk_pedido_id_pedido}, Garçom CPF: {pedido.fk_funcionario_cpf}, Mesa ID: {pedido.fk_mesa_id_mesa}, Status: {pedido.status}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="mt-4">
//         <h4>Itens dos Pedidos Abertos:</h4>
//         <ul className="list-group">
//           {produtos.map((produto, index) => (
//             <li key={index} className="list-group-item">
//               Produto: {produtoNomes[produto.fk_produtos_id_prod] || produto.fk_produtos_id_prod}, Pedido ID: {produto.fk_pedido_id_pedido}, Quantidade: {produto.qtd_produto}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PedidosAbertosPorMesa() {
  const [mesas, setMesas] = useState([]);
  const [mesaId, setMesaId] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtoNomes, setProdutoNomes] = useState({});

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
              const nomesMap = {};
              nomesResponse.data.forEach(produto => {
                nomesMap[produto.idProd] = produto.nome;
              });
              setProdutoNomes(nomesMap);
            }
          } else {
            setProdutos([]);
            setProdutoNomes({});
          }
        } catch (error) {
          console.error('Erro ao buscar pedidos abertos:', error);
        }
      } else {
        setPedidos([]);
        setProdutos([]);
        setProdutoNomes({});
      }
    };

    fetchPedidosAbertos();
  }, [mesaId]);

  const handleMesaIdChange = (e) => {
    setMesaId(e.target.value);
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
          {produtos.map((produto, index) => (
            <li key={index} className="list-group-item">
              Produto: {produtoNomes[produto.fk_produtos_id_prod] || `ID: ${produto.fk_produtos_id_prod}`}, Pedido ID: {produto.fk_pedido_id_pedido}, Quantidade: {produto.qtd_produto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
