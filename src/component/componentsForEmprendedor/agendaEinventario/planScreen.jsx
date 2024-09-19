import React, {useState} from "react";
import * as Speech from "expo-speech"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { ScrollView,View,Text,TextInput,Alert,Button,StyleSheet} from "react-native";
export default PlanScreen=()=>{
  
    const [resumen,setResumen]=useState('')
    const [mercado,setMercado]=useState('')
    const [marketing,setMarketing]=useState('')
    const [operaciones,setOperaciones]=useState('')
     const [reporte,setReporte]=useState('')
    //Realizamos un focus de cada una de las secciones del plan de negocios
   const handleFocusResumen=()=>{
     Speech.speak(` Para realizar un resumen ejecutivo debes de tener en cuenta
      que es una descripcion general concisa, que incluye elementos como el concepto
      de negocio,la mision, la vision y logros o hitos destacados de tu emprendimiento en desarrollo.  `)
   }
   const handleFocusMercadeo=()=>{
    Speech.speak(`Para realizar un plan de mercadeo efectivo debes de analizar a tu competencia, 
     luego define cual es el público objetivo, delimita tu posicionamiento en el mercado, puedes establecer tu principal   
     producto para que puedas elegir los canales y los tipos de distribucion y asi puedas tener un mayor alcance en tu mercado`)
   }
    const handleFocusMarketing=()=>{
        Speech.speak(`Un plan de Marketing debe incluir un analisis de la situacion, objetivos de marketing ,
            segmentacion, posicionamiento de mercado, estrategias de marketing que puedan fluir dentro
            de un plan de negocios`)
     }
    const handleFocusOperaciones=()=>{
        Speech.speak(` Cuando hablamos de un plan de operaciones o de un plan operativo, nos referimos al programa
            que concentra todos los aspectos y detalles  que estan relacionados a la produccion y servicios que ofrece
            la empresa.`)
    }
      //Generamos nuestro Canvas
      const generarCanvas= async()=>{
        const canvas= `
        
    <html>
      <style>
        body{
             font-family:Arial, sans-serif;
             margin:20px;
             padding:0;
             background-color:"blue"
        }
          .container{
            width:100%;
            text-align:center
          
          }   
           .organigram{
              display:flex;
              flex-direction:column;
              align-items:center;
           
           }
            .box{
              border:2px solid #333;
              border-radius:10px;
              padding:15px;
              margin:10px;
              width:200px;
              text-align:center;
              background-color:#f0f0f0;
              box-shadow:2px 2px 10px rgba(0,0,0,0.1);
            
            }
        .row{
           display:flex;
           justify-content:center;
           margin-bottom:20px; 
        }

        .line{
           width:2px;
           heght:20px;
           background-color:#333;
           margin:-10px auto;
        
        }
      </style>
        
        <body>
             <div class="container">
               <h1>Plan de Negocios Proyección 2024</h1>
                <div class="organigram">
                   <div class="box">
                     Resumen Ejecutivo
                   <p>${resumen}</p> 
                   </div>
                    <div class="line"></div>
                     <div class="row">
                      <div class="box">Análisis de Mercado<p>${mercado}</p></div>
                      <div class="box">Plan de Marketing<p>${marketing}</p></div>
                   </div>
                   <div class="row">
                <div class="box">Plan de Operaciones<p>${operaciones}</p></div>
               </div>
              <div class="line"></div>
                </div>
        </div>
       </body>
           
     </html>
        `
         try {
              const {uri}=await Print.printToFileAsync({html:canvas})
              setReporte(uri)
              if(await Sharing.isAvailableAsync())
               {
                Alert.alert('Plan de Negocio Generado',`Plan de Negocios generados correctamente:${uri}`)
                await Sharing.shareAsync(uri)
            }
        
            } catch (error) {
               Alert.alert('Plan de Negocio no generado','El plan de negocio no se genero correctamente')
         }
         setResumen('')
         setMercado('')
        setMarketing('')
        setOperaciones('')
         
      }
    return(
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Resumen Ejecutivo</Text>
          <TextInput
           style={styles.input}
            placeholder="Resumen Ejecutivo"
            value={resumen}
            onChangeText={setResumen}
            onFocus={handleFocusResumen}
          />  
          <Text style={styles.label}>Plan de Mercadeo</Text>
          <TextInput
            style={styles.input}
            placeholder="Plan de Mercadeo"
            value={mercado}
            onChangeText={setMercado}
            onFocus={handleFocusMercadeo}
          />

          <Text style={styles.label}>Plan de Marketing</Text>
           <TextInput
            style={styles.input}
            placeholder="Plan de Marketing"
            value={marketing}
            onChangeText={setMarketing}
            onFocus={handleFocusMarketing}
           /> 
           <Text  style={styles.label}>Operaciones de Mercadeo</Text>
           <TextInput
            style={styles.input}
            placeholder="Operaciones de Mercadeo"
             value={operaciones}
             onChangeText={setOperaciones}
             onFocus={handleFocusOperaciones}           
           />

           <Button title="Generar Plan de Negocios" onPress={generarCanvas} />
        </View>


      </ScrollView>



    )
  
}

const styles= StyleSheet.create({

  container:{
    padding:20,
  },
  label:{
     fontSize:18,
     marginVertical:10
  },
  input:{
        borderWidth:1,
        borderColor:'#ccc',
        padding:10,
        marginBottom:20,
        fontSize:18
  },
  result:{
    fontSize:20,
    marginVertical:18
  }
})