import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { getData } from '../../services/localstorage'
import HomeEmprendedor from './home.emprendedor'
import HomeCliente from './home.cliente'


const Home = () => {
    const [usuario,setusuario] = useState({})
    const [tipo, settipo] = useState('')
    const ruta = useNavigate();
    useEffect(() => {
        (async ()=>{
            if (await loginis() === false) {
                navegar('Login')
            }
        })()
    }, [])
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