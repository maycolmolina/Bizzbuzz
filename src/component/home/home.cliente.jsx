// este es el home que se mostrara cuando en la app se loguee un clienta 

import { TouchableOpacity, Text, View, TouchableHighlight, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { colors } from '../../theme/colors.js';
import { useState } from 'react';
import Inputt from '../component.perzonalizados/inputstandar.jsx'
import { Buscaricons } from '../../icons/iconos.jsx'
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import ipdelservidor from '../../servidorconnect/ipdelservidor.js';
import { Emailicons } from '../../icons/iconos.jsx';



export default HomeCliente = ({ cliente }) => {
    const [negocios, setnegocios] = useState([]);
    const [nombre, setnombre] = useState('');
    const [mesajeBusqueda, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const ruta = useNavigate();

    // funcion para navegar a otros componentes 
    const navegar = (value) => {
        ruta(value);
    }
    // funcion para buscar negocio a traves de su nombre 
    async function buscarnegocio() {
        // verifica que la busqueda no este vacia 
        if (nombre == '') {
            Alert.alert('busqueda', 'ingrese un nombre')
            return;
        }
        try {

            setCargando(true)
            // consulta al backend para obtener los negocios del cliente  con el nombre ingresado  por el usuario  y los muestra en pantalla  en caso de que encuentre alguno

            let resut = await axios.get(ipdelservidor + '3000/obtenernegocios/' + nombre)
            setnegocios(resut.data)
            if (resut.data.length == 0) {
                setMensaje('no encontramos ningun negocio')
            } else {
                setMensaje('')
            }
        } catch (err) {
            Alert.alert('conecion', 'verifica tu red de interet')
        }finally{
            setCargando(false);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.prin}>
                <View style={styles.principal}>
                    {/* mostramos la img de los negocios asiciados  */}
                    <Image
                        style={styles.imageper}
                        source={require('../../../assets/logoapphack.png')}
                    ></Image>
                    <Text style={styles.text}>{cliente.nombre}</Text>
                </View>
                <Text style={styles.smsbus}>busca un local a traves de su nombre</Text>
                <View style={styles.buscarcontainer}>
                    <View style={styles.buscar}><Inputt onChangeText={setnombre} value={nombre} ></Inputt></View>
                    <TouchableHighlight onPress={() => { buscarnegocio() }} style={styles.button}>
                        <Buscaricons width='50px' height='50px'></Buscaricons>
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView style={{ maxHeight: 200 }} >
                {/* en esta area se mostrara los negocios que el cliente obtuvo a traves de una busqueda por nombre  */}
                {mesajeBusqueda != '' && <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{mesajeBusqueda}</Text>}
                {cargando &&<Image style={{width:100,height:100}} source={require('.././../../assets/cargando.gif')}></Image>}
                <View style={styles.function}>
                    {/* realizamos el mapeo */}
                    {negocios.map(negocio => {
                        return (
                            <View>
                                <NegocioU negocio={negocio} onpres={()=>{navegar('visitarNegocio/'+negocio.idEmprendedor)}} ></NegocioU>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <Text style={{ marginLeft: 10, fontWeight: 'bold' }} >te recomendamos</Text>
        </View>
    )
};

// aca es el componente que llamamos por cada negocio encontrado en la busqueda 
const NegocioU = ({ negocio,onpres }) => {
    return (
        // en el parametro negocio guardamos la iformacion del negocio encontrado para mostrarselo al cliente
        <TouchableOpacity onPress={onpres}  >
            <View key={negocio.idEmprendedor} style={stylesN.principal}>
                <Text style={stylesN.nombrenegocio}>{negocio.nombreNegocio}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Emailicons width='20' height='20'></Emailicons>
                    <Text style={stylesN.correo}>{negocio.correo}</Text>
                </View>
                <Text style={stylesN.descripcionNegocio}>{negocio.descripcion}</Text>
                <Image
                    source={require('../../../assets/imagentiendadefault.png')}
                    style={stylesN.imagentienda}
                ></Image>
            </View>
        </TouchableOpacity>
    )
}


const stylesN = StyleSheet.create({
    principal: {
        borderWidth: 1,
        minHeight: 80,
        marginBottom: 10,
        borderRadius: 10,
        padding: 5,
        backgroundColor: colors.palette.secondary.segundooscuro
    },
    descripcionNegocio: {
        width: '60%',
        color:colors.palette.neutral.letracolorclara
    },
    imagentienda: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 100,
        right: 0,
        top: 0,
        objectFit: 'contain'
    },
    nombrenegocio: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:colors.palette.neutral.letracolorclara
    },
    correo: {
        fontSize: 15,
        color: colors.palette.primary.principalclaro,
        marginLeft: 5
    }
});



const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            width: '100%',
        },
        prin: {
            backgroundColor: colors.palette.primary.principal,
            borderRadius: 10,
            margin: 10,
            padding: 10
        },
        principal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20
        },
        imageper: {
            width: 80,
            height: 80,
            borderRadius: 400,
            overflow: 'hidden',
            elevation: 4
        },
        smsbus: { textAlign: 'center', color: colors.palette.neutral.letracolorclara },
        text: {
            marginLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.palette.neutral.letracolorclara
        },
        buscarcontainer: {
            flexDirection: 'row',
            width: '100%'
        },
        buscar: {
            width: '80%',
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            marginVertical: 10,
        },
        function: {
            marginHorizontal: 'auto',
            width: '95%',
            minHeight: 200,
            backgroundColor: colors.palette.neutral.lightGray,
            borderRadius: 10,
            padding: 10
        },
        CATEX: {
            fontSize: 30,
            color: 'white',
            textAlign: 'center',
            backgroundColor: colors.palette.primary.principal,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
        }
    }
)