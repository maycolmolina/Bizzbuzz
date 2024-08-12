import { Route,Routes } from "react-router-native";
import LoginCliente from "../login/loginCliente";
import Home from "../home/home";
import CreacionNegocio from "../login/mainloginemprendedor";
import LoginHow from "../loginHow/loginHow";
import ElegirtipoDeCuenta from '../loginHow/clientePropietario'
import ControlNegocio from "../componentsForEmprendedor/agendaEinventario/controlNegocio";
import AjustesE from "../componentsForEmprendedor/ajustes/ajustesE";
import AyudaEmprendedor from "../componentsForEmprendedor/ayudaYtutoriales/GuiasYAyuda";
import Notificaciones from "../componentsForEmprendedor/notificaciones/notificacioneSMS";


export default function RouterOulet() {
  return (
    <Routes>
      <Route path="/logincliente" element={<LoginCliente />} />
      <Route path="/loginEmprendedor" element={<CreacionNegocio/>} />
      <Route path="/login" element={<LoginHow/>} />
      <Route path="/crearuser" element={<ElegirtipoDeCuenta />} />
      <Route path="/controlNegocio" element={<ControlNegocio />} />
      <Route path="/AjustesE" element={<AjustesE />} />
      <Route path="/GuiayAyuda" element={<AyudaEmprendedor />} />
      <Route path="/notificacionesE" element={<Notificaciones />} />
      <Route path="/" element={<Home/>}/> 
    </Routes>
  );
}