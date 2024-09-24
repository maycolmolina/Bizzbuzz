import React, { useState, useEffect } from 'react'
import { Alert, Platform } from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Inputt from '../../component.perzonalizados/inputstandar'
import {colors} from '../../../theme/colors';
import RNPickerSelect from "react-native-picker-select";
import Botonstandar from '../../component.perzonalizados/botonstandar';
import * as ImagePicker from 'expo-image-picker';
import { Addicons,Loadingicon } from '../../../icons/iconos'
import { } from '@react-native-async-storage/async-storage'
import { getData, } from '../../../services/localstorage';
import NetInfo from '@react-native-community/netinfo';

const Addpro = () => {
    const [moneda, setmoneda] = useState('$');
    const [categoria, setCategoria] = useState(undefined);
    const [precio, setprecio] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Nombre, setNombre] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [iduser, setiduser] = useState(null);
    
    // useState para controlar si esta cargando o no
    const [loading, setloading] = useState(false);

    
    // useState para controlar errores
    const [errorname, seterrorname] = useState(null);
    const [errordescripcion, seterrordescripcion] = useState(null);
    const [errorcategoria, seterrorcategoria] = useState(null);
    const [errorprecio, seterrorprecio] = useState(null);
    const [errorfoto, seterrorfoto] = useState(null);
    const [errormoneda, seterrormoneda] = useState(null);


    useEffect(() => {
        (async () => {
            // esta funcion es para pedir permisos al dispositivo de acceder a su galeria para poder asiciar una imagen 
            // al  producto que vamos a publicar

            if (Platform.OS != 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('permiso no consedido', 'Lo sentimos, necesitamos permisos para acceder a tu galería de fotos.');
                }
            }
        })();
        (async () => {
            // obtener los datos del usuario logueado desde el localstorage
            let id = await getData('user');
            id = await JSON.parse(id).id;
            setiduser(id);
        })()
    }, [])
    //funciones de cambio o de onChangeText
    const cambiarCategoria = (value) => {
        if (value === undefined) {
            seterrorcategoria('seleccione una categoria');
        } else {
            seterrorcategoria(null);
        }
        setCategoria(value);
    }
    const cambiarnameite = (value) => {
        if (value === undefined) {
            seterrormoneda('seleccione una categoria');
        } else {
            seterrormoneda(null);
        }
        setmoneda(value);
    }
    const cambiarnombre = (value) => {
        setNombre(value);
        if (value !== '') {
            seterrorname('');
        }

    }
    const cambiarprecio = (value) => {
        setprecio(value);
        if (value !== '') {
            seterrorprecio('');
        }
        if (/^\d+(\.\d+)?$/.test(value)) {
            seterrorprecio('');
        }
    }
    const cambiarDescripcion = (value) => {
        setDescripcion(value);
        if (value !== '') {
            seterrordescripcion('');
        }
    }
    // limpiar campos
    function limpiar(){
        setNombre('');
        setDescripcion('');
        setmoneda('$');
        setCategoria(undefined);
        setprecio('');
        setDescripcion('');
        setImageUri(null);
        setImage(null);
        seterrorname(null);
        seterrordescripcion(null);
        seterrorcategoria(null);
        seterrorprecio(null);
        seterrorfoto(null);
        seterrormoneda(null);
    }
    //funcion de envio busquede de errores y limpieza
    
    async function buscarErrores() {
        let error = false;
        //errores de nombre
        if (Nombre == '') {
            seterrorname('el nombre no puede estas vacio');
            error = true;
        }
        if (precio == '') {
            seterrorprecio('inserte el precio del producto');
            error = true;
        }
        else if (!/^\d+(\.\d+)?$/.test(precio)) {
            seterrorprecio('ese no es un precio valido');
            error = true;
        }
        if (Descripcion == '') {
            seterrordescripcion('ingrese la descripcion');
            error = true;
        }
        if (moneda == undefined) {
            seterrormoneda('debe de seleccionar una moneda');
            error = true;
        }
        if (categoria == undefined) {
            seterrorcategoria('seleccione una categoria');
            error = true;
        }
        if (image === null) {
            seterrorfoto('debes de asignar una imagen al producto');
            error = true;
        }

        return error;
    }
    //funcion de envio
    async function enviar() {

        let error = await buscarErrores();
        // retornar si hay errores
        if (error) {
            return;
        }
        try {
            setloading(true);
            // verificar si tenemos conexion
            let netifo = await NetInfo.fetch()
            if (!netifo.isInternetReachable) {
                throw new Error('no tienes acceso a internet');
            }
            // preparación de producto
            let producto = {
                Nombre: Nombre,
                Descripcion: Descripcion,
                precio: precio,
                moneda: moneda,
                categoria: categoria,
                urlImg: '',
                id_propietario: iduser
            };
            console.log(producto)
        } catch (error) {
            Alert.alert(error.message);

        }finally{setloading(false);}

    }
    //funcion para seleccionar imagen
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.8,
        })
        if (!result.cancelled) {
            setImageUri(result.assets[0].uri);
            let imgcomplet = await fetch(result.assets[0].uri);
            const image = await imgcomplet.blob();
            setImage(image);
            seterrorfoto(null);
        }
    };

    return (
        <View style={{ flex: 1 }} >
            <ScrollView>
                <Text style={styles.titulo}>agrega el nuevo producto</Text>
                <Inputt error={errorname} onChangeText={value => { cambiarnombre(value) }} value={Nombre} name='Nombre'></Inputt>
                <RNPickerSelect
                    onValueChange={(value) => { cambiarCategoria(value) }}
                    placeholder={{
                        label: 'categoria',
                    }}
                    items={[
                        { label: "Electronica", value: "electronica" },
                        { label: "prenda", value: "prenda" },
                        { label: "Hogar", value: "hogar" },
                        { label: "Alimentos y Bebidas", value: "alimentos_bebidas" },
                        { label: "Salud y Belleza", value: "salud_belleza" },
                        { label: "Deportes y Aire Libre", value: "deportes_aire_libre" },
                        { label: "Juguetes y Juegos", value: "juguetes_juegos" },
                        { label: "Libros y Medios", value: "libros_medios" },
                        { label: "Automotriz", value: "automotriz" },
                        { label: "Herramientas", value: "herramientas" },
                    ]}
                    value={categoria}
                />
                {errorcategoria && <Text style={styles.errors}> {errorcategoria} </Text>}
                {/* aca usamos el componente inpuut que es un componente personalizado para poder mostrar de una
                manera mad perzonalizada los errores */}
                <Inputt error={errordescripcion} onChangeText={value => cambiarDescripcion(value)} value={Descripcion} name='Descripcion'></Inputt>
                <Inputt error={errorprecio} onChangeText={value => { cambiarprecio(value) }} value={precio} name='precio'></Inputt>
                <RNPickerSelect
                    onValueChange={(value) => { cambiarnameite(value) }}
                    placeholder={{
                        label: 'moneda',
                    }}
                    items={[
                        { label: "dolar", value: "$" },
                        { label: "cordoba", value: "C$" },
                        { label: "euro", value: "€" },
                    ]}
                    value={moneda}

                />
                {errormoneda && <Text style={styles.errors}> {errormoneda} </Text>}
                <View style={styles.contimagen} >
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.onpress} >
                            {imageUri &&
                                <Image
                                    style={styles.imagen}
                                    source={{ uri: imageUri }}
                                />
                            }
                            {!imageUri &&
                                <View style={styles.imagen} >
                                    <Addicons></Addicons>
                                </View>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                {errorfoto && <Text style={styles.errors}> {errorfoto} </Text>}
                <Botonstandar colorB={colors.palette.secondary.segundooscuro} onPress={enviar} texto='publicar' ></Botonstandar>
                <Text></Text>
            </ScrollView>
            {/* esto se mostrara cuando se este enviando el producto */}
            {loading && <View style={styles.espera}>
                <Text style={styles.cargatext}>publicando tu producto</Text>
                <Loadingicon fill='#fff' width='200px' height='200px'></Loadingicon>
            </View>}
        </View>
    )
};
// exportación para poder ser usado en al app
export default Addpro

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: colors.palette.secondary.segundooscuro
    },
    cargatext: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    espera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    onpress: {
        borderWidth: 1
    },
    imagen: {
        width: 200,
        height: 200,
    },
    contimagen: {
        marginVertical: 8,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errors: {
        marginHorizontal: 10,
        color: colors.palette.error.error
    }
})