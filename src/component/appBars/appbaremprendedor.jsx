// menu del emprendedor donde se mostraran las acciones del emprendedor

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, useLocation } from "react-router-native";
// impotacion de los colores o tema de la aplicación
import { colors } from "../../theme/colors";
// importaciones de los iconos para generar el menu
import {Emailicons, Shoticons,Agendaicons, Homeicons,Config, Helpicons, GoogleMaps,Notifications ,Capture,Cameraicon} from '../../icons/iconos'

// constante que guarda a cada uno de los iconos importados
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



export default function NavbarEmprendedor() {
  return (
    <View style={styles.container}>
        <AppbartabIcon  to='/' nameicon='home'/>
        <AppbartabIcon to='/notificacionesE' nameicon='notifications'/>
        <AppbartabIcon to='/controlNegocio' nameicon='agenda'/>
        <AppbartabIcon to='/AjustesE' nameicon='ajustes'/>
        <AppbartabIcon to='/GuiayAyuda' nameicon='Guia'/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.secondary.segundooscuro,
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
