import { View,Text,StyleSheet } from 'react-native'
import {colors} from '../../../theme/colors'

const AjustesE=()=>{
    return (
        <View style={styles.container}>
            <Text>ajustes
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.palette.neutral.lightGray,
    },
    text: {
        fontSize: 20,
        color: '#333',
    },

});
export default AjustesE