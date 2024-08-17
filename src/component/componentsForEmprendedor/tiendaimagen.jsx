import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Platform, Alert } from 'react-native';
import { getData } from '../../services/localstorage';
import * as ImagePicker from 'expo-image-picker';
import { Loadingicon } from '../../icons/iconos';
import NetInfo from '@react-native-community/netinfo';
import Botonstandar from '../component.perzonalizados/botonstandar';
import { colors } from '../../theme/colors';
import axios from 'axios';



const CambiarImgTienda= () => {
    const [user, setusert] = useState({})
    const [urlimg,setImageUri]=useState('http://localhost')
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagentienta,setimagentienda]=useState(false);

    
    useEffect(() => {
        
        getData('user').then((data) => {
            setusert(JSON.parse(data))
        });
        (async()=> {
            try{
            await  axios.get('http://192.168.0.135:3000/imagentienda/'+user.id);
            setImageUri('http://192.168.0.135:3000/imagenperfil/'+user.id);
            setimagentienda(true);
            }
            catch(e){
                setImageUri('https://th.bing.com/th/id/OIP.-r9zK6aoOR2vXUS4NLVXwQHaHa?rs=1&pid=ImgDetMain')
            }   
        })();
        (async () => {
            if (Platform.OS != 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('permiso no consedido', 'Lo sentimos, necesitamos permisos para acceder a tu galería de fotos.');
                }
            }
            
        })()
    }, [])
    const updateimage = async () => {
        try {
            if (!image) {
                Alert.alert('Error', 'Debes seleccionar una imagen diferente en seleccionar');
                return;
            }
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet')
            }
            setLoading(true);
            
            setLoading(false);
        } catch (error) {
            Alert.alert('' + error.message);
            setLoading(false);
        }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        })
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            let p = await fetch(result.assets[0].uri);
            const image = await p.blob();
            setImage(image);
            setimagentienda(true);
        }
    };
    return (

        <View style={styles.container}>
            <View style={styles.principal}>
                <View>
                    <Text style={styles.titulo}>imagen de negocio</Text>
                    <Text style={styles.userdata}>usuario: {user.nombre}</Text>
                    <Text >{user.correo}</Text>
                </View>
                {imagentienta && <Image
                    style={styles.imagen}
                    source={{uri:urlimg}}>
                </Image>}
               {!imagentienta &&<Image
                    style={styles.imagen}
                    source={require("../../../assets/imagentiendadefault.png")}>
                </Image>}
                <View style={styles.funciones}>
                    <Botonstandar colorB={colors.palette.secondary.segundooscuro}  texto='seleccionar'  onPress={pickImage} color='white'   ></Botonstandar>
                    <Botonstandar colorB={colors.palette.secondary.segundooscuro} texto='actualizar' onPress={updateimage} color='white' ></Botonstandar>
                </View>
                {loading &&<View style={styles.espera}>
                    <Text style={styles.cargatext}>actualizando perfil</Text>
                    <Loadingicon fill='#fff' width='200px' height='200px'></Loadingicon>
                </View>}
            </View>
        </View>
    )
}
export default CambiarImgTienda

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cargatext:{
        fontSize:40,
        fontWeight: 'bold',
        color:colors.palette.neutral.letracolorclara,
        textAlign:'center'
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
        backgroundColor:colors.palette.neutral.gray,
    },
    imagen: {
        width: 330,
        height: 330,
        borderRadius: 10,
        objectFit:'contain'
    },
    funciones: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    titulo: {
        fontSize: 30,
        color:colors.palette.neutral.letracolorclara,
        fontWeight: 'bold'
    },
    userdata: {
        marginTop: 15,
        fontSize: 15,
        color: colors.palette.neutral.letracolorclara,
        fontWeight: 'bold'
    }
})