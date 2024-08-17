import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { colors } from '../../theme/colors'
import { Whatsappicon, Pencilicons, Addicons, Emailicons, Cameraicon } from '../../icons/iconos';
import Cardcomponent from '../component.perzonalizados/cardpro';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import ip from '../../servidorconnect/ipdelservidor'


export default HomeEmprendedro = ({ usuario }) => {
    const [emprendedor, setemprendedor] = useState(usuario)
    const [descripcionNegocio, setDescripcionN] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {

            try {
                const result = await axios.get(ip+"/descripcionNEGOCIO/1")
                setDescripcionN(result.data.tienda)
            } catch (err) {
                console.error(err)
            }
        })()
    }, []);
    function navegar(value) {
        navigate(value);
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
                    <View style={styles.inicio} >
                        <Text style={styles.negocioName}>{descripcionNegocio.nombre}</Text>
                    </View>
                    <View style={styles.imagencont}>
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://www.somosmamas.com.ar/wp-content/uploads/2019/01/cenas-ricas-y-faciles-club-house.jpg' }}
                        />
                         <TouchableOpacity onPress={() => { navegar('CambiarImgTienda') }} style={styles.cambiarimagePort}>
                            <Cameraicon width='20px' height='20px'></Cameraicon>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.perfilImage}>
                        <Image
                            style={styles.imageperfil}
                            source={{ uri: 'https://phantom-marca.unidadeditorial.es/cb5559a4d1798146b0b02dbbca5029d9/resize/1320/f/jpg/assets/multimedia/imagenes/2022/09/23/16638898611409.jpg' }}
                        />
                        <TouchableOpacity style={styles.cambiarimageP} onPress={() => { navegar('CambiarImgEmprendedor') }}>
                            <Cameraicon width='10px' height='10px'></Cameraicon>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.adminname}>
                        <Text >{emprendedor.nombre}</Text>
                    </View>
                </View>
                <View style={styles.descripcion}>
                    <Text style={styles.descripcionTexto}>
                        {descripcionNegocio.descripcion}
                    </Text>
                </View>
                <View style={styles.funcion}>
                    <View style={styles.telefono}>
                        <Whatsappicon width='30px' height='30px'></Whatsappicon>
                        <Text style={styles.botonTexto}>{usuario.telefono}</Text>
                    </View>
                    <View style={styles.editar}>
                        <Pencilicons width='30px' height='30px'></Pencilicons>
                        <TouchableOpacity>
                            <Text style={[styles.botonTexto, { textDecorationLine: 'underline', color: 'blue' }]}>editar perfil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editar}>
                        <Emailicons width='30px' height='30px'></Emailicons>
                        <TouchableOpacity>
                            <Text style={styles.botonTexto}>{usuario.correo}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.aggpro}>
                        <TouchableOpacity onPress={() => { navegar('Addpro') }}>
                            <Addicons width='60px' height='60px'></Addicons>
                        </TouchableOpacity>
                        <Text style={styles.textoadd}>agregar prodcuto</Text>
                    </View>
                </View>
                <Text style={{ paddingHorizontal: 10 }}>productos y servicion:{10}</Text>
                <ScrollView horizontal >
                    <Cardcomponent nameboton='editar'></Cardcomponent>
                    <Cardcomponent nameboton='editar'></Cardcomponent>
                    <Cardcomponent nameboton='editar'></Cardcomponent>
                    <Cardcomponent nameboton='editar'></Cardcomponent>
                    <Cardcomponent nameboton='editar'></Cardcomponent>
                    <Cardcomponent nameboton='editar'></Cardcomponent>

                </ScrollView>

            </View>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    negocioName: {
        color: colors.palette.neutral.letracolorclara,
        fontSize: 22,
        textAlign: 'center',
    },
    inicio: {
        width: '100%',
        height: 150,
        backgroundColor: colors.palette.secondary.segundooscuro,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 110
    },
    imagencont: {
        width: '95%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'absolute',
        top: 50
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    perfilImage: {
        overflow: 'hidden',
        position: 'absolute',
        top: 150,
        left: 40,
        backgroundColor: colors.palette.neutral.grisclaro,
        zIndex: 1000,
    },
    cambiarimageP: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    cambiarimagePort:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
    },
    imageperfil: {
        borderWidth: 5,
        borderRadius: 2000,
        width: 100,
        height: 100,
        borderColor: colors.palette.neutral.letracolorclara,
    },
    adminname: {
        position: 'absolute',
        top: 205,
        left: 148,
        maxWidth: 230,
    },
    descripcion: {
        backgroundColor: colors.palette.neutral.lightGray,
        width: '100%',
        padding: 20,
        borderRadius: 10,
    },
    descripcionTexto: {

    }
    , funcion: {
        width: '100%',
        paddingHorizontal: 10,
    },
    telefono: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
    , editar: {
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
    },
    botonTexto: {
        marginLeft: 10,
        color: colors.palette.neutral.letracoloroscura,

    },
    aggpro: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        top: 40
    }
}
)