import React from 'react'
import { View,Text,StyleSheet} from 'react-native'

const Home=()=>{
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