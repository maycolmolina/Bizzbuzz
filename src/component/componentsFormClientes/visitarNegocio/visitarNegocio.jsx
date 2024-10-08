// en este apartado se renderizara cuando el cliente visite el negocio de un emprendedor 


import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { colors } from '../../../theme/colors'
// importacion de los iconos que nosotros creamos en la app
import { Whatsappicon, Pencilicons, Addicons, Emailicons, Cameraicon } from '../../../icons/iconos';
import Cardcomponent from '../../component.perzonalizados/cardpro';
import { useNavigate } from 'react-router-native';
import axios from 'axios';
import ip from '../../../servidorconnect/ipdelservidor'
import { useParams } from 'react-router-native';

export default VisitEmprendedor = () => {
    // a traves de react native  routes navegamos a esta pagina en especifico y mandamos un id por la url y lo capturamos usando el 
    // useParams para que con ese id miremos el negocio del emprendedor
    const { id } = useParams();
    const [emprendedor, setemprendedor] = useState({})
    const [descripcionNegocio, setDescripcionN] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                // se obtiene el usuario del emprendedor por id
                const resultuser= await axios.get(ip+'3000/obteneruser/'+id)

                const {user}=resultuser.data;
                setemprendedor(user);
                // se obtiene la descripcion del negocio del emprendedor por id
                const result = await axios.get(ip+"3000/descripcionNEGOCIO/"+user.Id_descripcionNegocio)
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
                    {/* aca se muestra la img relacionada al negocio */}
                    <View style={styles.imagencont}>
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://www.somosmamas.com.ar/wp-content/uploads/2019/01/cenas-ricas-y-faciles-club-house.jpg' }}
                        />
                    </View>
                    {/* aca se muestra la img de perfil asociada al emprendedor*/}
                    <View style={styles.perfilImage}>
                        <Image
                            style={styles.imageperfil}
                            source={{ uri: 'https://phantom-marca.unidadeditorial.es/cb5559a4d1798146b0b02dbbca5029d9/resize/1320/f/jpg/assets/multimedia/imagenes/2022/09/23/16638898611409.jpg' }}
                        />
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
                        <Text style={styles.botonTexto}>{emprendedor.telefono}</Text>
                    </View>
                    <View style={styles.editar}>
                        <Emailicons width='30px' height='30px'></Emailicons>
                        <TouchableOpacity>
                            <Text style={styles.botonTexto}>{emprendedor.correo}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ paddingHorizontal: 10 }}>productos y servicion:{10}</Text>
                <ScrollView horizontal >
                    {/* a trave se de un mapeo vamos a mostrar todos los productos que este emprendedor ha ofertado */}
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
        backgroundColor: colors.palette.primary.principal,
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
}
)