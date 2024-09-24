// menu del emprendedor donde se mostraran las acciones del cliente


import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Link, useLocation } from "react-router-native";
import { colors } from "../../theme/colors";
import { Config, Shoticons,Whatsappicon, Homeicons, Perfil, Logouticon, Visitaricons,GoogleMaps,Notifications ,Capture,Cameraicon} from '../../icons/iconos'


// constante que guarda a cada uno de los iconos importados
const icons = {
  'whatsapp': Whatsappicon,
  'home': Homeicons,
  'perfil': Perfil,
  'logout': Logouticon,
  'visit': Visitaricons,
  'maps':GoogleMaps,
  'notifications': Notifications,
  'blanco':Shoticons,
  'capture': Capture,
  'camera': Cameraicon,
  'configuraciones':Config
}

//componente encargado de generar cada opcion del menu principal
const AppbartabIcon = ({ to, style, nameicon }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  const Iconloas = icons[nameicon]
  const estilos = [
    style,
    styles.iconstab,
    active == true && styles.activeicons,
  ]
  return (
    <View style={estilos}>
      <Link to={to}>
        {Iconloas && <Iconloas width='30px' height='30px'></Iconloas>}
      </Link>
    </View>
  )
}


// constante del menu principal para ser usado en otro componente

export default function Navbar() {
  return (
    <View style={styles.container}>
        <AppbartabIcon  to='/' nameicon='home'/>
        <AppbartabIcon to='/#' nameicon='maps'/>
        <AppbartabIcon to='/#' nameicon='blanco'/>
        <AppbartabIcon to='/AjustesCli' nameicon='configuraciones'/>
        <AppbartabIcon to='/#' nameicon='capture'/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.primary.principal,
    flexDirection: "row",
    alignItems: "center",
    minWidth: '100%',
    height: '10%',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'white',
  },
  active: {
    color: colors.palette.tabs.active,
  },
  inactive: {
    color: colors.palette.tabs.inactive,
  },
  iconstab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 3,
  },
  activeicons: {
    borderBottomWidth: 3,
    borderBottomColor: colors.palette.tabs.active,
  },
  activeicons: {
    borderBottomWidth: 3,
    borderBottomColor: colors.palette.tabs.active
  }
  ,iconstab:{
    paddingVertical:5,
    paddingHorizontal:10,
    margin:3
},
});
