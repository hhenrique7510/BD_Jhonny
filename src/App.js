// src/App.js
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './layout/Footer.css';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer'; // Importar o Footer
import Home from './pages/Home';
import Funcionarios from './pages/Funcionarios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFuncionario from './funcionarios/AddFuncionario';
import EditFuncionario from './funcionarios/EditFuncionario';
import CadastrarProduto from './pages/cadastrarproduto';
import AddProduto from './pages/AddProduto'; 
import EditProduto from './pages/EditProduto';
import FazerPedido from './pages/FazerPedido';
import Pedido from './pages/Pedido';
import PedidoAbertosPorMesa from './pages/PedidosAbertosPorMesa';
import PedidoGerencia from './pages/PedidoGerencia';
import DependenteList from './pages/DependenteList.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/funcionarios" element={<Funcionarios/>} />
          <Route exact path="/addfuncionario" element={<AddFuncionario />} />
          <Route exact path="/editfuncionario/:cpf" element={<EditFuncionario />} />
          <Route exact path="/cadastrarproduto" element={<CadastrarProduto />} />
          <Route exact path="/addproduto" element={<AddProduto />} /> 
          <Route exact path="/editproduto/:id_prod" element={<EditProduto />} /> 
          <Route exact path="/pedido" element={<Pedido />} /> 
          <Route exact path="/fazerpedido" element={<FazerPedido />} /> 
          <Route exact path="/pedidogerencia" element={<PedidoGerencia />} /> 
          <Route exact path="/pedidosabertospormesa" element={<PedidoAbertosPorMesa />} />
          <Route exact path="/dependentes/:cpf" element={<DependenteList />} />
        </Routes>
        <Footer />  {/* Adicionar o Footer aqui */}
      </Router>
    </div>
  );
}

export default App;
