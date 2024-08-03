import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import RouterOulet from "./routes/rutas";
import Navbar from "./appBars/appbbar";
import Constants from "expo-constants";
import { useState } from "react";

export default function Main() {
  const [Islogin,setislogin]=useState(true);
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.paginador}>
          <RouterOulet />
        </View>
        { Islogin &&<Navbar></Navbar>}
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
  ,
  paginador: {
    flex:1,
    paddingTop: Constants.statusBarHeight + 10,
  }
});
