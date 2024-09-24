import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { getData } from '../../services/localstorage'
import HomeEmprendedor from './home.emprendedor'
import HomeCliente from './home.cliente'


const Home = () => {
    // aca es el home general
    const [usuario,setusuario] = useState({})
    const [tipo, settipo] = useState('')
    const ruta = useNavigate();
    useEffect(() => {
        (async ()=>{
            // verifico que el usuario este logueado en caso de no estar logueado lo redirijo al login
            if (await loginis() === false) {
                navegar('Login')
            }
        })()
    }, [])
    // funcion que sirve para navegar a traves de la app 
    function navegar(value) {
        ruta(value);
    }
    // aca verifico si esta o no loguedo revisando el local satorage
    async function loginis() {
        try {
            const user = await getData('user');
            // console.log(user);
            if (user === null) {
                return false;
            } else {
                // en caso de estar logueado verifico que tipo de usuario esta
                // ya que con eso verificamos que home debemos de cargar
                setusuario(JSON.parse(user));
                if(JSON.parse(user).Id_descripcionNegocio==null && JSON.parse(user).Id_descripcionNegocio==undefined) {
                    settipo('cliente')
                }else{
                    settipo('emprendedor')
                }
                return true;
            }
        } catch (error) {
            console.error('Error al verificar el estado de inicio de sesión:', error);
            return false; // Si hay un error, asumimos que el usuario no está autenticado
        }
    }
    return (
        <View style={styles.container}>
             {/* dependiendo de el tipo de usuario que este logueado vamos a cargar un home en especifico */}
             { tipo==='emprendedor' &&   <HomeEmprendedor usuario={usuario}></HomeEmprendedor>}
             { tipo==='cliente' && <HomeCliente cliente={usuario}></HomeCliente>}
        </View>
       
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})

export default Home