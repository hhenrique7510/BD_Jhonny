import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Funcionarios from './pages/Funcionarios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFuncionario from './funcionarios/AddFuncionario';
import EditFuncionario from './funcionarios/EditFuncionario';
import CadastrarProduto from './pages/cadastrarproduto';
import AddProduto from './pages/AddProduto'; 
import EditProduto from './pages/EditProduto';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
