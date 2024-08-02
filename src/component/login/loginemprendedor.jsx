import { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

export default loginemprendedor=({navigation})=>{
  
    const [nombre,setNombre]=useState('')
    const [correo,setCorreo]=useState('')
    const [password,setPassword]=useState('')
    const [telefono,setTelefono]=useState('')

    const handleFunction=()=>{
        navigation.navigate('Descripcion Negocio',{nombre,correo,password,telefono})
    }

    const limpiarCampos=()=>{
        setNombre('')
        setCorreo('')
        setPassword('')
        setTelefono('')
    }
    return(
         <View style={styles.container}>
            <TextInput
              placeholder='Nombre'
              value={nombre}
              onChangeText={setNombre}
               style={styles.input}
            />
            <TextInput
              placeholder='Correo Electronico'
              value={correo}
              onChangeText={setCorreo}
              style={styles.input}
           />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              placeholder='Telefono'
              value={telefono}
              onChangeText={setTelefono}
              keyboardType='numeric'
              style={styles.input}
           />

            <View style={styles.button} >
             <Button title='Siguiente Verificacion' onPress={handleFunction}/>
             
            </View>
            <View style={styles.button} >
            <Button title='limpiar datos' onPress={limpiarCampos} color='brown' />
             
            </View>

            
         </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:16
    },
   button:{
    marginHorizontal:20,
    marginVertical:10
   },
   input:{
    height:40,
    borderColor:'gray',
    borderWidth:1,
    marginBottom:12,
    padding:8
},


})