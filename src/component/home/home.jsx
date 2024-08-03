import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import { useNavigate } from 'react-router-native'

const Home=()=>{
    const ruta = useNavigate();
    useEffect(()=>{
        if(islogin()===false){
            navegar('Login')
        }
    },[])
    function navegar(value) {
        ruta(value);
    }
    // aca verifico si esta o no loguedo revisando el local satorage
    function islogin(){
        return false; 
    }
    return(
        <View style={styles.container}>
            <Text style={styles.Text}>Home</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text:{
        fontSize:24,
        fontWeight: 'bold',
        color: 'blue',
    }
})

export default Home