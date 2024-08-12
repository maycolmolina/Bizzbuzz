import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link, useLocation } from "react-router-native";
import { colors } from "../../theme/colors";
import {Emailicons, Shoticons,Agendaicons, Homeicons,Config, Helpicons, GoogleMaps,Notifications ,Capture,Cameraicon} from '../../icons/iconos'
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
const Appbartab = ({ children, to, style }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  const estilos = [
    style,
    active == true && styles.active,
    active == false && styles.inactive,
  ];
  return (
    <View style={style}>
      <Link to={to}>
        <Text style={estilos}>
          {children}
        </Text>
      </Link>
    </View>
  );
};





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
