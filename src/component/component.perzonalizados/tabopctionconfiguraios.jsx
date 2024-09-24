import {TouchableOpacity,Text,View,StyleSheet} from 'react-native'
import {Emailicons, Shoticons,Agendaicons, Homeicons,Config, Helpicons, GoogleMaps,Notifications ,Capture,Pencilicons,Cameraicon,Closeicon} from '../../icons/iconos'
import { colors } from '../../theme/colors'
import { useNavigate } from 'react-router-native'


// importacion de iconos
const icons = {
  'agenda': Agendaicons,
  'home': Homeicons,
  'ajustes': Config,
  'Guia': Helpicons,
  'maps':GoogleMaps,
  'notifications': Notifications,
  'blanco':Shoticons,
  'capture': Capture,
  'camera': Cameraicon,
  'email': Emailicons,
  'close': Closeicon,
  'pencil': Pencilicons,
}

// componente que genera algunas opciones ya sea del cliente o el emprendedor en el apartado de configuración
export default  OpcionesSettings = ({ruta,onpress,text,nameicon}) => {
    const ir =useNavigate()
    const Iconloas = icons[nameicon]
    return (
        <TouchableOpacity onPress={()=>{ir(ruta)}} style={styles.tabss}>
            <View style={styles.contss}>
                <Text style={styles.letrass}>{text}</Text>
                {Iconloas && <Iconloas width='30px' height='30px'></Iconloas>}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    // stilodeopiones
    tabss: {
        width: '100%',
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: colors.palette.neutral.gray,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: colors.palette.neutral.lightgray,
    },
    letrass:{
        fontSize: 18,
        color: colors.palette.neutral.letracolorclara,
    },
    contss: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
})