import { Text,View ,StyleSheet} from 'react-native'
import  {colors}  from '../../theme/colors'
import Botonstandar from '../component.perzonalizados/botonstandar' 
import { useNavigate } from 'react-router-native'
import {removeData} from '../../services/localstorage'



// este es un componente que se mostrara cuando queramos cerrar la sesion iniciada
export default Salir =()=>{
    const ruta = useNavigate();
    async function salir(){
        await removeData();
        ruta('../login');
    }
    function canceled(){
        ruta('../');
    }
    return(
        <View style={styles.salir}>
            <Text style={styles.texto}>seguro que quieres terminar la session</Text>
            <View style={styles.funtions}>
                <Botonstandar onPress={salir} colorB={colors.palette.error.error} texto="salir"></Botonstandar>
                <Botonstandar onPress={canceled} colorB={colors.palette.secondary.segundooscuro}  texto="cancelar"></Botonstandar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    funtions:{
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        marginVertical:40
    },
    salir: {
        backgroundColor: colors.palette.neutral.gray,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
    texto: {
        color: colors.palette.neutral.letracolorclara,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        
    },
})