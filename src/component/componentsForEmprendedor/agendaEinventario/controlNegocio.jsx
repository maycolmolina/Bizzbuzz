import { View,Text,StyleSheet } from 'react-native'

const ControlNegocio=()=>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Control de negocio</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

    },
    text: {
        fontSize: 20,
        color: '#333',
        marginLeft:20
    },

});
export default ControlNegocio