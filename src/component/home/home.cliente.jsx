import { Text,View,TouchableHighlight,StyleSheet,Image } from 'react-native'
import {colors} from '../../theme/colors.js';
import { useState } from 'react';
import Inputt from '../component.perzonalizados/inputstandar.jsx'
import {Buscaricons} from '../../icons/iconos.jsx'


export default  HomeCliente=({cliente})=>{
    return(
        <View  style={styles.container}>
            <View style={styles.prin}>
                <View style={styles.principal}>
                    <Image
                    style={styles.imageper}
                    source={{uri:'https://th.bing.com/th/id/OIP.IrBh0qZkI9NSy4hOjPUpyQHaE8?rs=1&pid=ImgDetMain'}}
                    ></Image>
                    <Text style={styles.text}>{cliente.nombre}</Text>
                </View>
                <Text style={styles.smsbus}>busca un local a traves de su nombre</Text>
                <View style={styles.buscarcontainer}>
                    <View style={styles.buscar}><Inputt  ></Inputt></View>
                    <TouchableHighlight style={styles.button}>
                        <Buscaricons width='50px' height='50px'></Buscaricons>
                    </TouchableHighlight>
                </View>
            </View>
           <View style={styles.function}>

           </View>

            <Text styles={styles.CATEX}>catengorias de emprendimiento</Text>
        </View>
    )
};

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            width:'100%',
        },
        prin:{
            backgroundColor:colors.palette.primary.principal,
            borderRadius:10,
            margin:10,
            padding:10
        },
        principal:{
            flexDirection:'row',
            alignItems:'center',
            marginBottom:20
        },
        imageper:{
            width:80,
            height:80,
            borderRadius:400,
            overflow:'hidden',
            elevation:4
        },
        smsbus:{textAlign:'center',color:colors.palette.neutral.letracolorclara},
        text:{
            marginLeft:10,
            fontSize:20,
            fontWeight:'bold',
            color: colors.palette.neutral.letracolorclara
        },
        buscarcontainer:{
            flexDirection:'row',
            width:'100%'
        },
        buscar:{
            width:'80%',
        },
        button:{
            justifyContent: 'center',
            alignItems: 'center',
            width:'20%',
            marginVertical:10,
        },
        function:{
            marginHorizontal: 'auto',
            width:'95%',
            height:100,
            backgroundColor:colors.palette.neutral.lightGray,
            borderRadius:10,
            padding:10
        },
        CATEX:{
            fontSize:30,
            color:'white',
            textAlign:'center',
            backgroundColor:colors.palette.primary.principal,
            paddingVertical:10,
            borderRadius:10,
            marginBottom:10,
        }
    }
)