
import { Route,Routes } from "react-router-native";
import Loginemprendedor from "../login/loginemprendedor";
import LoginCliente from "../login/loginCliente";
import Home from "../home/home";

export default function RouterOulet() {
  return (
    <Routes>
      <Route path="/logincliente" element={<LoginCliente />} />
      <Route path="/loginEmprendedor" element={<Loginemprendedor/>} />
      <Route path="/" element={<Home/>} />
    </Routes>
  );
}