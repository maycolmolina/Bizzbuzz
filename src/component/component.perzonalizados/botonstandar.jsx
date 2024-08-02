import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'


export default  Botonstandar=({onPress,texto,colorB,widthB,colortext})=>{
    const styless=[
        styles.container,
        colorB && {backgroundColor:colorB},
        !colorB && styles.colorBoton,
    ]
    const textoestilo=[
        styles.textoBoton,
        colortext && {color:colortext},
    ]
    return(
        <TouchableOpacity style={widthB && {width:widthB}} onPress={onPress}>
            <View style={styless}>
                <Text style={textoestilo}>{texto}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical:15,
        paddingHorizontal:30,
        width:'100%',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius:8,
    },
    colorBoton:{
        backgroundColor:'#279'
    },
    textoBoton:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:22,
    },
 });
