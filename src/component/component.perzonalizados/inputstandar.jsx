import React from 'react'
import { StyleSheet, TextInput,View,Text} from 'react-native'
import { colors } from '../../theme/colors'

const Inputt=({Width,name,error,style,...props})=>{

    const inputstyle=[
        error && styles.error,
        styles.inputsty,
        style,
    ]
    return(
        <View style={{width:Width}}>           
            <TextInput    style={inputstyle} placeholder={name} {...props}></TextInput>
            {error &&
                <Text style={styles.error}> {error} </Text>
            }
        </View>
    )
}



const styles=StyleSheet.create({
    error:{
        color:colors.palette.error.error,
    },
    inputsty: {
        backgroundColor:'#fff', 
        borderRadius: 12,
        color:'#000',
        marginVertical: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        paddingVertical:15,
        paddingStart:8,
        width:'100%',
        fontSize:17,
        elevation:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default Inputt