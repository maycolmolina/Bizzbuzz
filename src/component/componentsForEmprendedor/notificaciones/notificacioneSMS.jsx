import { View,Text,StyleSheet } from 'react-native'
import {colors} from '../../../theme/colors'

const Notificaciones=()=>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>nuevas notificaciones</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.palette.secondary.segundooscuro,
        
    },
    text: {
        fontSize: 30,
        color:colors.palette.neutral.letracolorclara ,
        marginLeft: 20,
    },

});
export default Notificaciones