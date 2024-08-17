import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../../theme/colors'
import OpcionesSettings from '../../component.perzonalizados/tabopctionconfiguraios'

const AjustesE = () => {
    return (
        <ScrollView style={styles.container}>
            <OpcionesSettings  nameicon='pencil' text='editar tienda'></OpcionesSettings>
            <OpcionesSettings ruta='/EditarUsuario' nameicon='agenda' text='editar mi usuario'></OpcionesSettings>
            <OpcionesSettings nameicon='email' text='realiza porceso de verificacion'></OpcionesSettings>
            <OpcionesSettings nameicon='Guia' text='ayuda y soporte'></OpcionesSettings>
            <OpcionesSettings ruta='/salir' nameicon='close' text='cerrar session'></OpcionesSettings>

        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.palette.neutral.darkGray,
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        color: colors.palette.neutral.letracolorclara,
    },

});
export default AjustesE