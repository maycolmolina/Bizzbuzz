// componente en el cual iniciara el segmento de registro 
//       donde el usuario va a poner sus datos
import { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Inputt from '../component.perzonalizados/inputstandar'
import { Picker } from '@react-native-picker/picker'
import Botonstandar from '../component.perzonalizados/botonstandar'
import { colors } from '../../theme/colors'

export default loginemprendedor = ({ navigation }) => {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [telefono, setTelefono] = useState('')
  const [confpassword, setconfPassword] = useState('')
  const [paistelefono, setpaistelefono] = useState('+505')


  // varaiables de eerores donde se controlaran los errores 
  // o las validaciones de datos que el usuario ingrese
  const [nombreE, setNombreE] = useState('')
  const [correoE, setCorreoE] = useState('')
  const [passwordE, setPasswordE] = useState('')
  const [telefonoE, setTelefonoE] = useState('')
  const [confpasswordE, setConfPasswordE] = useState('')

  // funciones de cambios en los input para que los input esten funcionado directamente con 
  // los useState 
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
  function cambioPassword(value) {
    setPassword(value)
    if (!/^\S{8,}$/.test(value)) {
      setPasswordE('minimo 8 caracteres, sin espacios')
    } else {
      setPasswordE('')
    }
  }
  function cambioTelefono(value) {
    setTelefono(value)
    if (!/^[0-9]{8}$/.test(value)) {
      setTelefonoE('telefono invalido, debe tener 8 digitos')
    } else {
      setTelefonoE('')
    }
  }
  function cambioconfirmarPassword(value) {
    setconfPassword(value)
    if (value !== password) {
      setConfPasswordE('las contraseñas no coinciden')
    } else {
      setConfPasswordE('')
    }
  }
  function cambiopaisTelefono(value) {
    setpaistelefono(value)
  }

  // funcion seguiente para pasar al siguiente formulario en el cual ingresaremos los datos del negocio
  const handleFunction = async () => {
    // si hay errores no continuara 
    if (await verificarE()) {
      Alert.alert('porfavor', 'Por favor, corrija los errores en los campos')
      return;
    }
    // mandamos al otro formulario los dato de este formulario pata realizar un consolidado de datos 
    navigation.navigate('Descripcion Negocio', { nombre, correo, password, telefono,paistelefono })

  }
  // esta es la funcion que verifica que no tenga ninguno de los campos llenos por el usuario ningun tipo de error 
  async function verificarE() {
   let errores = false;

  // Reiniciar mensajes de error
  setNombreE('');
  setCorreoE('');
  setPasswordE('');
  setTelefonoE('');
  setConfPasswordE('');

  if (nombre.trim() === '') {
    setNombreE('Este campo es obligatorio');
    errores = true;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(correo)) {
    setCorreoE('Email no válido, no debe de tener espacios');
    errores = true;
  }
  if (!/^\S{8,}$/.test(password)) {
    setPasswordE('Mínimo 8 caracteres, sin espacios');
    errores = true;
  }
  if (!/^[0-9]{8}$/.test(telefono)) {
    setTelefonoE('Teléfono inválido, debe tener 8 dígitos');
    errores = true;
  }
  if (confpassword !== password) {
    setConfPasswordE('Las contraseñas no coinciden');
    errores = true;
  }

  return errores;

  }
  // funcion para limpiar los input o las cajas de texto  
  const limpiarCampos = () => {
    setNombre('')
    setCorreo('')
    setPassword('')
    setTelefono('')
  }
  return (
    <View style={styles.container}>
      {/* los imput son etiquetas personalizadas creadas para que laas podamos reutilizar en toda la app 
      usando el comcepto de componetizacion */}
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
      <Inputt
        name='Password'
        value={password}
        onChangeText={value => { cambioPassword(value) }}
        secureTextEntry={true}
        error={passwordE}
      />
      <Inputt
        name='Confirmar Password'
        value={confpassword}
        onChangeText={value => { cambioconfirmarPassword(value) }}
        secureTextEntry={true}
        error={confpasswordE}
      />
      <View style={{ flexDirection: 'row' }}>
        <Picker
          style={{ height: 50, width: '35%' }}
          onValueChange={(itemValue) => cambiopaisTelefono(itemValue)}
          selectedValue={paistelefono}
        >
          <Picker.Item label="Nicaragua" value="+505" />
          <Picker.Item label="españa" value="+34" />
          <Picker.Item label="costa rica" value="+506" />
          <Picker.Item label="EE.UU" value="+1" />
        </Picker>
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
      {/* boton para pasar al siguente formulario  */}
      <Botonstandar borde    onPress={handleFunction} texto='siguiente' />
      <Text></Text>
      {/* boton para limpiar las cajas de texto  */}
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