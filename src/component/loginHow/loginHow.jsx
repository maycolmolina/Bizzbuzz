import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import Inputt from '../component.perzonalizados/inputstandar'
import Botonstandar from '../component.perzonalizados/botonstandar'
import { useState } from 'react'
import { colors } from '../../theme/colors'
import {  useNavigate } from 'react-router-native'
import axios from 'axios'
import { saveData } from '../../services/localstorage'
import ip from '../../servidorconnect/ipdelservidor'



export default Loginhow = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mostraModal, setMostraModal] = useState(false)

    //errores
    const [emailE, setEmailE] = useState('')
    const [passwordE, setPasswordE] = useState('')

    function chageEmail(value) {
        setEmail(value)
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
            setEmailE('email no valido,no debe de tener espaciados');
        } else {
            setEmailE('')
        }
    }
    function chagePassword(value) {
        setPassword(value)
        if (!/^\S{8,}$/.test(value)) {
            setPasswordE('minimo 8 caracteres, sin espacios')
        } else {
            setPasswordE('')
        }
    }
    function abrirmodal() {
        if (!/^\S{8,}$/.test(password) || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            Alert.alert('Error', 'datos invalidos')
            return;
        }
        setMostraModal(true)
    }
    const ruta = useNavigate();
    function navegar(value) {
        ruta(value);
    }

    async function loguearse(tipouser) {
        console.log('hola')
        setMostraModal(false)
        try {
            let result = await axios.post(ip+'3000/user', {
                correo: email,
                password: password,
                table: tipouser
            })

            const {user}=result.data;
            if(user===undefined || user===null){
                throw new Error('no existe ese ningun '+tipouser+' con esas credenciales')
            }
            await saveData('user', JSON.stringify(user))
            ruta('../')
        } catch (e) {
            Alert.alert('Lo sentimos', e.message);
            return;
        }


    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.imagencont}>
                    <View style={styles.NAMEAPP}>
                        <Text style={styles.NAMEAPPtext}>BIZZ BUZ</Text>
                    </View>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/logoapphack.png')}
                    ></Image>
                </View>
                <View style={styles.INPUT}>
                    <Inputt
                        name='usuario'
                        Width='100%'
                        onChangeText={value => chageEmail(value)}
                        error={emailE}
                    />
                    <Inputt
                        name='contraseña'
                        Width='100%'
                        secureTextEntry={true}
                        onChangeText={value => chagePassword(value)}
                        error={passwordE}
                    />
                </View>
                {/*este botom por defecto es azul claro pero se puede modificar cons su propiedad colorB */}
                <Botonstandar onPress={abrirmodal} widthB='80%' texto='INICIAR'></Botonstandar>
                <Text></Text>
                <Text></Text>
                <Botonstandar onPress={() => { navegar('../crearuser') }} widthB='80%' texto='REGISTRARSE'></Botonstandar>
                <View style={{ width: '90%', borderWidth: 0.5, margin: 20 }}></View>
                <Text style={styles.textoinfor}>
                    si ya tienes una session anterior ingresa los campos, si quieres crear una nueva cuenta presiona REGISTRARSE
                </Text>
            </View>
            {mostraModal && <View style={styles.modal}>
                <View style={styles.modalform}>
                    <Text style={{ fontSize: 20 }}>Elige el tipo de cuenta que tienes</Text>
                    <View style={styles.flex}>
                        <Botonstandar onPress={() => loguearse('cliente')} widthB='45%' texto='cliente'></Botonstandar>
                        <Botonstandar colorB={colors.palette.secondary.green} onPress={() => loguearse('emprendedor')} widthB='45%' texto='emprend.'></Botonstandar>
                    </View>
                </View>
            </View>}
        </>
    )
}






const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        marginVertical: 60,
        justifyContent: 'space-between',
    },
    modalform: {
        width: '95%',
        padding: 20,
        backgroundColor: colors.palette.neutral.modal,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 7
    },
    modal: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.palette.opacity.semiTransparentDark ,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },
    INPUT: {
        width: '100%'
        , alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    imagencont: {
        marginTop: 20,
        width: '100%',
        height: '25%',
        borderRadius: 30
        ,backgroundColor: colors.palette.primary.principal
    },
    logo: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
        borderRadius: 20000,
        marginBottom: 20,
        alignSelf: 'center',
        borderColor: colors.palette.primary.principal,
        shadowColor: colors.palette.neutral.black,
        position: 'absolute',
        bottom: 0 - 30,
        left: 30
    }
    , NAMEAPP: {
        position: 'absolute',
        right: 30,
        bottom: 20,
    },
    NAMEAPPtext: {
        fontSize: 35,
        fontWeight: 'bold',
        color:colors.palette.neutral.letracolorclara,
    },
    textoinfor: {
        textAlign: 'center',
        color: colors.palette.neutral.gray,
        fontSize: 14,
        marginTop: 20
    }
})