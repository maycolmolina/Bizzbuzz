import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import RouterOulet from "./routes/rutas";
import Navbar from "./appBars/appbbar";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { getData } from "../services/localstorage";
import NavbarEmprendedor from '../component/appBars/appbaremprendedor'
import { removeData } from "../services/localstorage";

export default function Main() {
  const [Islogin, setislogin] = useState(false);
  const [userTipo, setuserTipo] = useState('cliente');
  
  // componente principal que se cargara de inicio cuando arranque la aplicacion
  useEffect(() => {
    // removeData()
    // esta funcion verifica que se este actualizando en tiempo real si el usuario tiene una cuenta activa o si ya no esta logueado
    setInterval(verstatdoUsuario, 100);
    return () => {
      clearInterval(verstatdoUsuario);
    };

  }, [])

  function verstatdoUsuario() {
    loginis().then(isLoggedIn => {
      setislogin(isLoggedIn);
    }).catch(error => {
      console.error('Error al verificar el estado de inicio de sesión:', error);
    });
  }

  async function loginis() {
    try {
      const user = await getData('user');
      if (user === null) {
        setuserTipo('cliente')
        return false;
      } else {
        let tipo = JSON.parse(user).Id_descripcionNegocio
        if (tipo != null && tipo != undefined) {
          setuserTipo('emprendedor');
        } else {
          setuserTipo('cliente')
        }
        return true;
      }
    } catch (error) {
      console.error('Error al verificar el estado de inicio de sesión:', error);
      return false; // Si hay un error, asumimos que el usuario no está autenticado
    }
  }
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.paginador}>
          <RouterOulet />
        </View>
        {Islogin && userTipo==='cliente' && <Navbar></Navbar>}
        {Islogin && userTipo==='emprendedor' && <NavbarEmprendedor></NavbarEmprendedor>}
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
  ,
  paginador: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  }
});
