import { View,Text,StyleSheet } from 'react-native'
import Botonstandar from '../component.perzonalizados/botonstandar'

export default  InicioComponen=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.imagencont}></View>
            <Text style={styles.textobienvenida}>BIENVENIDO A BIZZ BUZZ</Text>
            <Text style={styles.textobienvenida2}>LA APLICACION MOVIL DE PROMOCION DE SERVICIOS Y PRODCUTOS DE EMPRENDEDORES, DA A CONOCERTE EN TODOS LOS LUGARES O ENCUENTRA LO QUE BUSCAS EN BIZZBUZZ</Text>
            <View style={styles.func}>
                <Botonstandar texto='EMPRENDEDOR' widthB='90%'  ></Botonstandar>
                <Text></Text>
                <Text></Text>
                <Botonstandar texto='CLIENTE' widthB='90%'  ></Botonstandar>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    func:{
        width:'100%'
        ,alignItems:'center',
        justifyContent:'center',
    },
    textobienvenida:{
        color: '#179',
        fontSize:24,
        fontWeight:'bold',
        marginBottom:10,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    textobienvenida2:{
        marginTop: 40,
        paddingVertical:20,
        paddingHorizontal:10,
        marginBottom:40,
        justifyContent: 'center',
        color: '#000',
        fontSize:16,
        textAlign: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding:20
    },
    imagencont:{
        width:'100%',
        height:'30%',
        borderWidth:1,
        borderRadius:10
    }
})