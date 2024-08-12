import { useEffect, useState } from 'react'
import { View, Text, Modal, Button, StyleSheet, Alert } from 'react-native'
import axios from 'axios'
import Inputt from '../component.perzonalizados/inputstandar'
import Botonstandar from '../component.perzonalizados/botonstandar'
import Loadincomponet from '../component.perzonalizados/cargandocomponente'


export default descripcionNegocioScreen = ({ navigation, route }) => {
    const { nombre, correo, password, telefono, paistelefono } = route.params
    const [nombreNegocio, setNombreNegocio] = useState('')
    const [direccion, setDireccion] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [verificacion, setVerificacion] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [telefonoListo, setTelefonoListo] = useState('');
    const [loading, setLoading] = useState(false);

    //   controladores de errores
    const [nombreNegocioE, setNombreNegocioE] = useState('')
    const [direccionE, setDireccionE] = useState('')
    const [descripcionE, setDescripcionE] = useState('')
    const [verificacionE, setVerificacionE] = useState('')

    useEffect(() => {
        setTelefonoListo(paistelefono + telefono)
    }, [])

    // funciones de cambio 
    function cambiarnombreNegocio(value) {
        setNombreNegocio(value)
        if (!/^.{4,}$/.test(value)) {
            setNombreNegocioE('un minimo de 4 caracteres')
        } else {
            setNombreNegocioE('')
        }
    }
    function cambiardireccion(value) {
        setDireccion(value)
        if (!/^.{20,}$/.test(value)) {
            setDireccionE('un minimo de 20 caracteres')
        } else {
            setDireccionE('')
        }
    }
    function cambiardescripcion(value) {
        setDescripcion(value)
        if (!/^.{40,}$/.test(value)) {
            setDescripcionE('un minimo de 40 caracteres')
        } else if (value.trim() === '') {
            setDescripcion('Este campo es obligatorio')
        } else {
            setDescripcionE('')
        }
    }
    function cambiarverificacion(value) {
        setVerificacion(value)
    }


    async function verificarE() {
        let errores = false;

        // Reiniciar mensajes de error
        setDescripcionE('');
        setNombreNegocioE('');
        setDireccionE('');

        if (!/^.{4,}$/.test(nombreNegocio)) {
            setNombreNegocioE('un minimo de 4 caracteres')
            errores = true;
        }
        if (!/^.{20,}$/.test(direccion)) {
            setDireccionE('un minimo de 20 caracteres')
            errores = true;
        }
        if (!/^.{40,}$/.test(descripcion)) {
            setDescripcionE('un minimo de 40 caracteres')
            errores = true;
        }

        return errores;

    }
    const enviarInformacion = async () => {
        // verificar los datos antes de enviarlos al backend
        if (await verificarE()) {
            Alert.alert('Porfavor', 'Por favor, corrija los errores en los campos')
            return;
        }
        setLoading(true)
        let data = {
            Emprendedor: {
                nombre,
                correo,
                password,
                telefonoListo
            },
            descripcionNegocio: {
                nombreNegocio,
                direccion,
                descripcion,
                verificacion
            }
        }
        try {
            const response = await axios.post('https://proyecto-chat-e71cc-default-rtdb.firebaseio.com/useremprendedor.json', data);
            if (response.status === 201) {
                setModalVisible(true)
                setNombreNegocio('')
                setDireccion('')
                setDescripcion('')
                setVerificacion('')
            }
        } catch (error) {
            Alert.alert(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return (

        <View style={styles.container}>
            {loading &&  <Loadincomponet texto='creando emprendedor'></Loadincomponet>}
            <Inputt
                name='Nombre de Negocio'
                value={nombreNegocio}
                onChangeText={(value) => { cambiarnombreNegocio(value) }}
                error={nombreNegocioE}
            />
            <Inputt
                name='Direccion'
                value={direccion}
                onChangeText={(value) => { cambiardireccion(value) }}
                error={direccionE}
            />
            <Inputt
                name='Descripcion'
                value={descripcion}
                onChangeText={(value) => { cambiardescripcion(value) }}
                error={descripcionE}
            />
            <Inputt
                name='numero de negocio verificado-opcional'
                value={verificacion}
                onChangeText={(value) => { cambiarverificacion(value) }}
                error={verificacionE}
            />
            <Text></Text><Text></Text><Text></Text><Text></Text>
            <Botonstandar onPress={enviarInformacion} texto='crear mi negocio'></Botonstandar>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Datos del emprendedor y negocio enviados correctamente</Text>
                    <Button title='Cerrar' onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
})