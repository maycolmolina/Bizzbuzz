import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Inputt from '../../component.perzonalizados/inputstandar'
import Botonstandar from '../../component.perzonalizados/botonstandar'
import { colors } from '../../../theme/colors'
import { getData} from '../.././../services/localstorage'
import axios from 'axios'
import ipdelservidor from '../../../servidorconnect/ipdelservidor'

export default EditarUsuario = ( ) => {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [descripcionNegocio, setDescripcionNegocio] = useState('')
  const [password, setPassword] = useState('')
  const [id, setid] = useState('')

  // varaiables de eerores
  const [nombreE, setNombreE] = useState('')
  const [correoE, setCorreoE] = useState('')
  const [telefonoE, setTelefonoE] = useState('')

  useEffect(()=>{
    (async()=>{
        let user=await getData('user')
        user=JSON.parse(user)
        console.log(' hooola que tal i')
        setNombre(user.nombre)
        setCorreo(user.correo)
        setTelefono(user.telefono)
        setPassword( user.password)
        setid(user.id)
        setDescripcionNegocio(user.Id_descripcionNegocio)
    })()
  },[])

  // funciones de cambios en los input
  function cambiarnombre(value) {
    setNombre(value)
    if (value.trim() == '') {
      setNombreE('Este campo es obligatorio')
    } else {
      setNombreE('')
    }
  }
  function cambiocorreo(value) {
    setCorreo(value)
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
      setCorreoE('email no valido,no debe de tener espaciados');
    } else {
      setCorreoE('')
    }
  }
  function cambioTelefono(value) {
    setTelefono(value)
    if (!/^[0-9]{8,}$/.test(value)) {
        setTelefonoE('Teléfono inválido, debe tener al menos 8 dígitos');
    } else {
        setTelefonoE('');
    }
  }

  // funcion seguiente
  const handleFunction = async () => {
    if (await verificarE()) {
      Alert.alert('porfavor', 'Por favor, corrija los errores en los campos')
      return;
    }
    let Emprendedor= {
        "id":id,
        "nombre":nombre ,
        "correo":correo,
        "password":password ,
        "telefono":telefono,
        "Id_descripcionNegocio":descripcionNegocio
    }
    try{
        await axios.put(`${ipdelservidor}/ModificarEmprendedor/${id}`,Emprendedor)
        Alert.alert('Exito', 'Usuario modificado correctamente')
        limpiarCampos()
    }catch(e){
        
    }
  }
  async function verificarE() {
   let errores = false;
  setNombreE('');
  setCorreoE('');
  setTelefonoE('');

  if (nombre.trim() === '') {
    setNombreE('Este campo es obligatorio');
    errores = true;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo)) {
    setCorreoE('Email no válido, no debe de tener espacios');
    errores = true;
  }
  if (!true) {
    setTelefonoE('Teléfono inválido, debe tener 8 dígitos');
    errores = true;
  }
  return errores;
  }

  const limpiarCampos = () => {
    setNombre('')
    setCorreo('')
    setTelefono('')
  }
  return (
    <View style={styles.container}>
      <Inputt
        name='Nombre'
        onChangeText={(value) => { cambiarnombre(value) }}
        error={nombreE}
        value={nombre}
      />
      <Inputt
        name='Correo Electronico'
        value={correo}
        onChangeText={(value) => { cambiocorreo(value) }}
        error={correoE}
      />
      <View style={{ flexDirection: 'row' }}>
        <Inputt
          name='Telefono'
          value={telefono}
          onChangeText={(value) => { cambioTelefono(value) }}
          keyboardType='numeric'
          error={telefonoE}
          Width='65%'
        />
      </View>
      <Text></Text><Text></Text><Text></Text>
      <Botonstandar borde  colorB={colors.palette.secondary.segundooscuro}   onPress={handleFunction} texto='siguiente' />
      <Text></Text>
      <Botonstandar borde colortext={colors.palette.neutral.darkGray} colorB={colors.palette.neutral.lightGray} onPress={limpiarCampos} texto='limpiar' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:23
  },
})