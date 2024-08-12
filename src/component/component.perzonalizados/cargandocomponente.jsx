import { View,Text,StyleSheet } from 'react-native'
import { colors } from '../../theme/colors'


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
        color:colors.palette.neutral.letracolorclara,
        textAlign:'center'
    },
    espera: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius:8,
        alignItems: 'center',
        backgroundColor: colors.palette.opacity.semiTransparentDark,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2
    },
 
})