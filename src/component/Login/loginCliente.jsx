import { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Inputt from '../component.perzonalizados/inputstandar'
import { Picker } from '@react-native-picker/picker'
import Botonstandar from '../component.perzonalizados/botonstandar'
import { colors } from '../../theme/colors'
import axios from 'axios'
import { saveData } from '../../services/localstorage'
import { useNavigate } from 'react-router-native'
import ip from '../../servidorconnect/ipdelservidor'
export default LoginCliente = () => {

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [telefono, setTelefono] = useState('')
    const [confpassword, setconfPassword] = useState('')
    const [paistelefono, setpaistelefono] = useState('+505')
    const ruta=useNavigate()

    // varaiables de eerores
    const [nombreE, setNombreE] = useState('')
    const [correoE, setCorreoE] = useState('')
    const [passwordE, setPasswordE] = useState('')
    const [telefonoE, setTelefonoE] = useState('')
    const [confpasswordE, setConfPasswordE] = useState('')

    // funciones de cambios en los input
    function cambiarnombre(value) {
        setNombre(value)
        if (value.trim() == '') {
            setNombreE('Este campo es obligatorio')
        } else {
            setNombreE('')
        }
    }
    function cambiocorreo(value) {
        setCorreo(value)
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
            setCorreoE('email no valido,no debe de tener espaciados');
        } else {
            setCorreoE('')
        }
    }
    function cambioPassword(value) {
        setPassword(value)
        if (!/^\S{8,}$/.test(value)) {
            setPasswordE('minimo 8 caracteres, sin espacios')
        } else {
            setPasswordE('')
        }
    }
    function cambioTelefono(value) {
        setTelefono(value)
        if (!/^[0-9]{8}$/.test(value)) {
            setTelefonoE('telefono invalido, debe tener 8 digitos')
        } else {
            setTelefonoE('')
        }
    }
    function cambioconfirmarPassword(value) {
        setconfPassword(value)
        if (value !== password) {
            setConfPasswordE('las contraseñas no coinciden')
        } else {
            setConfPasswordE('')
        }
    }
    function cambiopaisTelefono(value) {
        setpaistelefono(value)
    }

    // funcion seguiente
    const handleFunction = async () => {
        if (await verificarE()) {
            Alert.alert('porfavor', 'Por favor, corrija los errores en los campos')
            return;
        }
        const cliente = {
            "nombre":nombre,
            "correo":correo,
            "password":password,
            "telefono":paistelefono+telefono,
        };
        try{
        // hacer peticion al backend para registrar el cliente
        await axios.post(ip+'/newuserC',cliente)
        await saveData('user',JSON.stringify(cliente))
        ruta('/')
        Alert.alert('Registro exitoso', 'Te has registrado correctamente')
        }catch(e){
            console.error(e)
        }

    }
    async function verificarE() {
        let errores = false;

        // Reiniciar mensajes de error
        setNombreE('');
        setCorreoE('');
        setPasswordE('');
        setTelefonoE('');
        setConfPasswordE('');

        if (nombre.trim() === '') {
            setNombreE('Este campo es obligatorio');
            errores = true;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo)) {
            setCorreoE('Email no válido, no debe de tener espacios');
            errores = true;
        }
        if (!/^\S{8,}$/.test(password)) {
            setPasswordE('Mínimo 8 caracteres, sin espacios');
            errores = true;
        }
        if (!/^[0-9]{8}$/.test(telefono)) {
            setTelefonoE('Teléfono inválido, debe tener 8 dígitos');
            errores = true;
        }
        if (confpassword !== password) {
            setConfPasswordE('Las contraseñas no coinciden');
            errores = true;
        }

        return errores;

    }

    const limpiarCampos = () => {
        setNombre('')
        setCorreo('')
        setPassword('')
        setTelefono('')
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Cliente</Text>
            <Inputt
                name='Nombre'
                onChangeText={(value) => { cambiarnombre(value) }}
                error={nombreE}
                value={nombre}
            />
            <Inputt
                name='Correo Electronico'
                value={correo}
                onChangeText={(value) => { cambiocorreo(value) }}
                error={correoE}
            />
            <Inputt
                name='Password'
                value={password}
                onChangeText={value => { cambioPassword(value) }}
                secureTextEntry={true}
                error={passwordE}
            />
            <Inputt
                name='Confirmar Password'
                value={confpassword}
                onChangeText={value => { cambioconfirmarPassword(value) }}
                secureTextEntry={true}
                error={confpasswordE}
            />
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    style={{ height: 50, width: '35%' }}
                    onValueChange={(itemValue) => cambiopaisTelefono(itemValue)}
                    selectedValue={paistelefono}
                >
                    <Picker.Item label="Nicaragua" value="+505" />
                    <Picker.Item label="españa" value="+34" />
                    <Picker.Item label="costa rica" value="+506" />
                    <Picker.Item label="EE.UU" value="+1" />
                </Picker>
                <Inputt
                    name='Telefono'
                    value={telefono}
                    onChangeText={(value) => { cambioTelefono(value) }}
                    keyboardType='numeric'
                    error={telefonoE}
                    Width='65%'
                />
            </View>
            <Text></Text><Text></Text><Text></Text>
            <Botonstandar borde onPress={handleFunction} texto='siguiente' />
            <Text></Text>
            <Botonstandar borde colortext={colors.palette.neutral.darkGray} colorB={colors.palette.neutral.lightGray} onPress={limpiarCampos} texto='limpiar' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 23
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
        ,textAlign: 'center'
        ,color: colors.palette.primary.principal
        
    }
})