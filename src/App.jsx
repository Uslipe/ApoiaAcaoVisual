import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Home from "./telas/Home";
import Login from "./telas/Login";
import Cadastro from "./telas/Cadastro";
import DoacaoFinanceira from "./telas/DoacaoFinanceira";
import Perfil from "./telas/Perfil";
import LoginOng from "./telas/LoginOng";
import CadastroOng from "./telas/CadastroOng";
import NavBarTrans from "./layout/NavBarTrans";
import NavbarOng from "./layout/NavbarOng";
import NavbarLog from "./layout/NavbarLog"; // Corrigir a importação
import AreaOng from "./telas/AreaOng";
import VLibras from "@djpfs/react-vlibras"; // VLibras
import "aos/dist/aos.css"; // AOS CSS
import AOS from "aos";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome
import HistoricoDoacoesDoador from "./telas/HistoricoDoacoesDoador";
import HomeADM from "./telas/HomeADM";
import ListarOngsADM from "./telas/ListarOngsADM";
import ListarUsuariosADM from "./telas/ListarUsuariosADM";
import DoacaoItens from "./telas/DoacaoItens";
import ValidarOngADM from "./telas/ValidarOngADM";

function App() {
  useEffect(() => {
    AOS.init(); // Inicializa a animação AOS
  }, []);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
          <Route path="/NavbarOng" element={<NavbarOng />} />
          <Route path="/NavbarLog" element={<NavbarLog />} />
          <Route path="/AreaOng" element={<AreaOng />} />
          <Route
            path="/historicoDoacoesDoador"
            element={<HistoricoDoacoesDoador />}
          />
          <Route path="/homeADM" element={<HomeADM />} />
          <Route path="/listarOngsADM" element={<ListarOngsADM />} />
          <Route path="/listarUsuariosADM" element={<ListarUsuariosADM />} />
          <Route path="/doacaoItens" element={<DoacaoItens />} />
          <Route path="/validarOngADM" element={<ValidarOngADM />} />
        </Routes>
        <div className="App">
          {loaded && <VLibras forceOnload={true} />}
          <header className="App-header">
          </header>
          {/* <header className="App-header"></header> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
