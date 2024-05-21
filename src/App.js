
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddFuncionario from './funcionarios/AddFuncionario';
import EditFuncionario from './funcionarios/EditFuncionario';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/addfuncionario" element={<AddFuncionario/>} />
          <Route exact path="/editfuncionario/:cpf" element={<EditFuncionario />} />
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
