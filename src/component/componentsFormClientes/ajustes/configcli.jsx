import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../../theme/colors'
import OpcionesSettings from '../../component.perzonalizados/tabopctionconfiguraios'

const AjustesCli = () => {
    return (
        <ScrollView style={styles.container}>
            {/* aca estamos definiendo cada una de las acciones que puede realizar el cliente 
            cada opción tiene una ruta donde lo llevata a un componente en especifico
            que pueden verificar en la carpeta de routes en el archivo contenido dentro
            */}
            <OpcionesSettings ruta='./' nameicon='agenda' text='editar mi usuario'></OpcionesSettings>
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
export default AjustesCli