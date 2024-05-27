import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Relatorio = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [filteredRelatorios, setFilteredRelatorios] = useState([]);
  const [garcom, setGarcom] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [mesa, setMesa] = useState('');
  const [garcomComMaisPontos, setGarcomComMaisPontos] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/relatorios')
      .then(response => {
        setRelatorios(response.data);
        setFilteredRelatorios(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os relatórios!", error);
      });
      
    axios.get('http://localhost:8080/garcom/maisPontos')
      .then(response => {
        setGarcomComMaisPontos(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar o garçom com mais pontos!", error);
      });
  }, []);

  useEffect(() => {
    filterRelatorios();
  }, [garcom, dataInicio, dataFim, valorMin, valorMax, mesa]);

  const filterRelatorios = () => {
    let filtered = relatorios;

    if (garcom) {
      filtered = filtered.filter(relatorio => 
        relatorio.garcom.toLowerCase().includes(garcom.toLowerCase())
      );
    }

    if (dataInicio) {
      filtered = filtered.filter(relatorio => 
        new Date(relatorio.dataHora) >= new Date(dataInicio)
      );
    }

    if (dataFim) {
      filtered = filtered.filter(relatorio => 
        new Date(relatorio.dataHora) <= new Date(dataFim)
      );
    }

    if (valorMin) {
      filtered = filtered.filter(relatorio => 
        relatorio.valorTotal >= parseFloat(valorMin)
      );
    }

    if (valorMax) {
      filtered = filtered.filter(relatorio => 
        relatorio.valorTotal <= parseFloat(valorMax)
      );
    }

    if (mesa) {
      filtered = filtered.filter(relatorio => 
        relatorio.mesa === parseInt(mesa)
      );
    }

    setFilteredRelatorios(filtered);
  };

  const calcularTotalFaturamento = () => {
    return filteredRelatorios.reduce((total, relatorio) => total + relatorio.valorTotal, 0).toFixed(2);
  };

  return (
    <div className="container">
      <h2>Relatório de Pedidos</h2>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Garçom" 
          value={garcom}
          onChange={(e) => setGarcom(e.target.value)}
        />
        <input 
          type="date" 
          placeholder="Data Início" 
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <input 
          type="date" 
          placeholder="Data Fim" 
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Valor Mínimo" 
          value={valorMin}
          onChange={(e) => setValorMin(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Valor Máximo" 
          value={valorMax}
          onChange={(e) => setValorMax(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Mesa" 
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Pedido ID</th>
            <th>Data/Hora</th>
            <th>Mesa</th>
            <th>Valor Total</th>
            <th>Garçom</th>
          </tr>
        </thead>
        <tbody>
          {filteredRelatorios.map(relatorio => (
            <tr key={relatorio.pedidoId}>
              <td>{relatorio.pedidoId}</td>
              <td>{new Date(relatorio.dataHora).toLocaleString()}</td>
              <td>{relatorio.mesa}</td>
              <td>R$ {relatorio.valorTotal.toFixed(2)}</td>
              <td>{relatorio.garcom}</td> 
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Faturamento</strong></td>
            <td colSpan="2"><strong>R$ {calcularTotalFaturamento()}</strong></td>
          </tr>
        </tbody>
      </table>

      {garcomComMaisPontos && (
        <div className="mt-4">
          <h3>Garçom com mais pontos</h3>
          <p>{garcomComMaisPontos.fk_funcionario_cpf} com {garcomComMaisPontos.pontos} pontos</p>
        </div>
      )}
    </div>
  );
}

export default Relatorio;
