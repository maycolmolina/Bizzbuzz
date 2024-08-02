import { useState } from 'react'
import { View,Text, TextInput, Modal, Button, StyleSheet } from 'react-native'
// import axios from 'axios'


export default descripcionNegocioScreen=({navigation,route})=>{
      const {nombre,correo,password,telefono}=route.params
      const [nombreNegocio,setNombreNegocio]=useState('')
      const [direccion,setDireccion]=useState('')
      const [descripcion,setDescripcion]=useState('')
      const [verificacion,setVerificacion]=useState('')
      const [modalVisible,setModalVisible]=useState(false)


    const enviarInformacion=async()=>{

        if(!nombre===''||!correo===''||password===''||telefono===''||nombreNegocio===''||direccion===''||descripcion===''||verificacion==='')
        {
            alert('Ingresa todos los campos por que son obligatorios')
            return
        }

        try {
        //   const response= await axios.post('http://192.168.218.44:3500/Emprendedor',{
        //         Emprendedor:{
        //             nombre,
        //             correo,
        //             password,
        //             telefono
        //         },
        //         descripcionNegocio:{
        //             nombreNegocio,
        //             direccion,
        //             descripcion,
        //             verificacion
        //         }
        //     });
        //     if (response.status===201)
        //     { setModalVisible(true)
        //         setNombreNegocio('')
        //         setDireccion('')
        //         setDescripcion('')
        //         setVerificacion('')
        //     }
        } catch (error) {
            console.log(error)
        }
    }
    return(
         <View style={styles.container}>
           <TextInput
              placeholder='Nombre de Negocio'
              value={nombreNegocio}
              onChangeText={setNombreNegocio}
               style={styles.input}
           />
           <TextInput
              placeholder='Direccion'
              value={direccion}
              onChangeText={setDireccion}
              style={styles.input}
           />
           <TextInput
              placeholder='Descripcion'
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.input}
           />
           <TextInput
              placeholder='Verificacion'
              value={verificacion}
              onChangeText={setVerificacion}
              style={styles.input}
           />
            <View>
                <Button title='Enviar informacion' onPress={enviarInformacion}/>
            </View>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={()=>setModalVisible(false)}
            >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Datos del emprendedor y negocio enviados correctamente</Text>
                 <Button title='Cerrar' onPress={()=>setModalVisible(false)}/>
              </View>
            </Modal>
         </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:16
    },
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:12,
        padding:8
    },
    modalView:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    modalText:{
        marginBottom:15,
        textAlign:'center'
    }
})