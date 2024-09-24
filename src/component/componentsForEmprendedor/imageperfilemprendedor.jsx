import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Platform, Alert } from 'react-native';
import { getData } from '../../services/localstorage';
import * as ImagePicker from 'expo-image-picker';
import { Loadingicon } from '../../icons/iconos';
import NetInfo from '@react-native-community/netinfo';
import Botonstandar from '../component.perzonalizados/botonstandar';
import { colors } from '../../theme/colors';
import axios from 'axios';
// aca importamos la ip del servidor con el cual vamo a gestionar nuestra app y almacenar nuestros datos
import ipdelservidor from '../../servidorconnect/ipdelservidor';


const CambiarImgEmprendedor = () => {
    const [user, setusert] = useState({});
    const [urlimg, setImageUri] = useState('local');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // lo que se ejecuta cuando inicia o se carga el componente
    useEffect(() => {
        // obtener el componente
        getData('user').then((data) => {
            setusert(JSON.parse(data));
        });

        (async () => {
            try {
                // realizar solicitud al servidor
                const response = await axios.get('http://192.168.0.135:3000/imagenperfil/1');
                setImageUri(response.data.url);  // Ajustar según la respuesta de la API
            } catch (e) {
                // asignar la url de la imagen que tiene el usuario
                setImageUri('http://192.168.110.44/imagenEmprendedor'+user.id);
            }
        })();

        (async () => {
            // pedir permisos al dispositivo ya que necesitamos actualizar una img y ocupamos 
            // acceder al almacenamiento
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('permiso no consedido', 'Lo sentimos, necesitamos permisos para acceder a tu galería de fotos.');
                }
            }
        })();
    }, []);
    // en esta funcion hacemos la solicitud al servidor para realizar el cambio de la img
    const updateimage = async () => {
        try {
            if (!image) {
                Alert.alert('Error', 'Debes seleccionar una imagen diferente en seleccionar');
                return;
            }
            // si no hay una img seleccionada se retornara y pedira que seleccione una
            
            let netifo = await NetInfo.fetch();
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet');
            }
            setLoading(true);
            // preparacion de imagen para enviar al servidor
            let nombreEx=image.uri.split('.');
            let extencion=nombreEx[nombreEx.length-1];
            nombreImagen=`${user.id}.${extencion}`;
            let formdata = new FormData();
            formdata.append('Id', user.id);
            formdata.append('image', {
                uri: image.uri,
                name: nombreImagen,
                type: `image/${extencion}`,
            });
            // envio al servidor
            await axios.post('http://192.168.110.44:5100/imagenEmprendedor', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Éxito', 'Imagen actualizada correctamente');
        } catch (error) {
            console.log(error);
            // mensaje en caso de que algo halla salido mal
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };
    // lanzamiento del gestor de archivos del dispositivo
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.8,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setImage(result.assets[0]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.principal}>
                <View>
                    <Text style={styles.titulo}>Cambiar imagen de perfil</Text>
                    <Text style={styles.userdata}>Usuario: {user.nombre}</Text>
                    <Text>{user.correo}</Text>
                </View>
                 <Image
                    style={styles.imagen}
                    source={{uri: urlimg}}
                />
                <View style={styles.funciones}>
                    {/* uso de los botones estandar de la app */}
                    <Botonstandar colorB={colors.palette.secondary.segundooscuro}  texto='Seleccionar'  onPress={pickImage} color='white' />
                    <Botonstandar colorB={colors.palette.secondary.segundooscuro} texto='Actualizar' onPress={updateimage} color='white' />
                </View>
                {/* esto se mostrara cuando la img se este actualizando */}
                {loading && 
                    <View style={styles.espera}>
                        <Text style={styles.cargatext}>Actualizando perfil</Text>
                        <Loadingicon fill='#fff' width='200px' height='200px' />
                    </View>
                }
            </View>
        </View>
    );
};

export default CambiarImgEmprendedor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cargatext:{
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.palette.neutral.letracolorclara,
        textAlign: 'center'
    },
    espera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.palette.opacity.semiTransparentLightDark,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    principal: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomRightRadius: 400,
        backgroundColor: colors.palette.neutral.gray,
    },
    imagen: {
        width: 330,
        height: 330,
        borderRadius: 10,
    },
    funciones: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    titulo: {
        fontSize: 30,
        color: colors.palette.neutral.letracolorclara,
        fontWeight: 'bold'
    },
    userdata: {
        marginTop: 15,
        fontSize: 15,
        color: colors.palette.neutral.letracolorclara,
        fontWeight: 'bold'
    }
});
