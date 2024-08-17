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
import Addpro from "../componentsForEmprendedor/publicar/serviceOrProdcut";
import CambiarImgEmprendedor from "../componentsForEmprendedor/imageperfilemprendedor";
import CambiarImgTienda from "../componentsForEmprendedor/tiendaimagen";
import Salir from "../logout/salir";
import EditarUsuario from "../componentsForEmprendedor/editarmicuenta/editarusuario";
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
      <Route path="/Addpro" element={<Addpro />} />
      <Route path="/CambiarImgEmprendedor" element={<CambiarImgEmprendedor />} />  
      <Route path="/CambiarImgTienda" element={<CambiarImgTienda />} />
      <Route path="/salir" element={<Salir />} />  
      <Route path="/" element={<Home/>}/> 
      <Route path="/editarUsuario" element={<EditarUsuario />} />
    </Routes>
  );
}