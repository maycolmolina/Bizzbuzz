import { View,Text,StyleSheet } from 'react-native'


export default function Loadincomponet({texto}) {
    return (
        <View style={styles.espera}>
            <Text style={styles.cargatext}>{texto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    cargatext:{
        fontSize:40,
        fontWeight: 'bold',
        color:'#fff',
        textAlign:'center'
    },
    espera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius:8,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2
    },
 
})