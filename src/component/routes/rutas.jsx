import { Route,Routes } from "react-router-native";
import LoginCliente from "../login/loginCliente";
import Home from "../home/home";
import CreacionNegocio from "../login/mainloginemprendedor";
import LoginHow from "../loginHow/loginHow";
import ElegirtipoDeCuenta from '../loginHow/clientePropietario'


export default function RouterOulet() {
  return (
    <Routes>
      <Route path="/logincliente" element={<LoginCliente />} />
      <Route path="/loginEmprendedor" element={<CreacionNegocio/>} />
      <Route path="/login" element={<LoginHow/>} />
      <Route path="/crearuser" element={<ElegirtipoDeCuenta />} />
      {/* ruta de inicio */}
      <Route path="/" element={<Home/>}/> 
    </Routes>
  );
}