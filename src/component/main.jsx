import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NativeRouter } from "react-router-native";
import RouterOulet from "./routes/rutas";
import Navbar from "./appBars/appbbar";
import Constants from "expo-constants";

export default function Main() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.paginador}>
          <RouterOulet />
        </View>
        <Navbar></Navbar>
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
    borderWidth: 1,
    height: '90%',
    paddingTop: Constants.statusBarHeight + 10,
  }
});
