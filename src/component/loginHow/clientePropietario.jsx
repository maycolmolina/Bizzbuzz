import { View, Text, StyleSheet, Image } from 'react-native'
import Botonstandar from '../component.perzonalizados/botonstandar'
import { colors } from '../../theme/colors'
import { useNavigate } from 'react-router-native'

export default ElegirtipoDeCuenta = () => {
    const ruta = useNavigate();
    function navegar(value) {
        ruta(value);
    }
    return (
        <View style={styles.container}>
            <View style={styles.imagencont}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/elegirimag.png')}
                ></Image>
            </View>
            <Text style={styles.NAMEAPPtext}>BIENVENIDO A BIZZ BUZ</Text>
            <Text style={styles.textoinfor}>
                la aplicacion movil para la promocion de productos negocios y servicios y emprendimientos,
                date a conocer y da un paso mas halla
            </Text>
            {/*este botom por defecto es azul claro pero se puede modificar cons su propiedad colorB */}
            <Botonstandar onPress={()=>{navegar('../logincliente')}} widthB='80%' texto='CLIENTE'></Botonstandar>
            <Text></Text>
            <Text></Text>
            <Botonstandar onPress={()=>{navegar('../loginEmprendedor')}} widthB='80%' texto='PROPIETARIO'></Botonstandar>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    imagencont: {
        marginTop: 20,
        width: '100%',
        height: '35%',
        borderRadius: 30,
        overflow: 'hidden'
    },
    logo: {
        width: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    }
    , NAMEAPP: {
        position: 'absolute',
        right: 30,
        bottom: 20
    },
    NAMEAPPtext: {
        marginVertical: 40,
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.palette.primary.principal,
    },
    textoinfor: {
        textAlign: 'justify',
        color: colors.palette.neutral.gray,
        fontSize: 14,
        marginBottom: 40,
        width: '90%'
    }
})