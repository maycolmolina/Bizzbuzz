import React from "react";
// import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
// import Estilostexto from "./styleText";
// import theme from "../theme";
import { Link, useLocation } from "react-router-native";
// import { getData, removeData } from "./services/datastorage";
// import { useNavigate } from "react-router-native";

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





export default function Navbar() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ padding: 10 }}>
      <Appbartab style={{ margin: 5 }} to="/">
          home
        </Appbartab>
        <Appbartab style={{ margin: 5 }} to="/logincliente">
          cliente
        </Appbartab>
        <Appbartab style={{ margin: 5 }} to="/loginEmprendedor">
          emrendedor
        </Appbartab>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#123',
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    minWidth: '100%',
    height:'10%'
  },
  text: {
    color: '#fff',
  },
  active: {
    color: "#fff",
  },
  inactive: {
    color: "rgb(180, 182, 182)",
  },
  iconstab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 3,
  },
  activeicons: {
    borderBottomWidth: 3,
    borderBottomColor: "white",
  },
});
