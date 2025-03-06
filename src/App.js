import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Home from "./telas/Home";
import Login from "./telas/Login";
import Cadastro from "./telas/Cadastro";
import DoacaoFinanceira from "./telas/DoacaoFinanceira";
import Perfil from "./telas/Perfil";
import LoginOng from "./telas/LoginOng";
import CadastroOng from "./telas/CadastroOng";
import NavBarTrans from "./layout/NavBarTrans";
import AreaOng from "./telas/AreaOng";

import HistoricoDoacoesDoador from "./telas/HistoricoDoacoesDoador"; 
import HomeADM from "./telas/HomeADM"; 
import ListarOngsADM from "./telas/ListarOngsADM";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/doacaoFinanceira" element={<DoacaoFinanceira />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/loginong" element={<LoginOng />} />
          <Route path="/CadastroOng" element={<CadastroOng />} />
          <Route path="/NavBarTrans" element={<NavBarTrans />} />
          <Route path="/AreaOng" element={<AreaOng />} />
          <Route path="/historicoDoacoesDoador" element={<HistoricoDoacoesDoador />} />
          <Route path="/homeADM" element={<HomeADM />} />
          <Route path="/listarOngsADM" element={<ListarOngsADM />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;