
import { Route,Routes } from "react-router-native";
import Loginemprendedor from "../login/loginemprendedor";
import LoginCliente from "../login/loginCliente";
import Home from "../home/home";
import InicioComponen from "../componente.inicio/startapp"
import CreacionNegocio from "../login/mainloginemprendedor";

export default function RouterOulet() {
  return (
    <Routes>
      <Route path="/logincliente" element={<LoginCliente />} />
      <Route path="/loginEmprendedor" element={<CreacionNegocio/>} />
      <Route path="/" element={<Home/>}/>
    </Routes>
  );
}