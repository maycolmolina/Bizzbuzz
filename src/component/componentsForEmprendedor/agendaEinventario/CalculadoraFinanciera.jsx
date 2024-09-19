import React,{useState} from "react"
import {View,Text,TextInput,Button,StyleSheet,ScrollView,Alert} from "react-native"
import {calcularMargenGanancia,calcularROI,calcularTIR} from "./calculosFinancieros"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import * as Speech from "expo-speech"
import {Switch} from "react-native-gesture-handler"

export default calculadoraFinanciera=()=>{
  
    const[renovacion,setRenovacion]=useState('')
    const[costo,setCosto]=useState('');
    const [gastoInversion,setGastoInversion]=useState('')
    const [costoInversion,setCostoInversion]=useState('')
    const [flujoDinero,setFlujoDinero]=useState('')
    const [reporte,setReporte]=useState('');
    const [isTalBackEnabled,setIsTalBackEnabled]=useState(false);
     const[inputValues,setInputValues]=useState({renovacion:'',costo:'',gastoInversion:'',costoInversion:'',flujoDinero:''})
    //Genaramos si esta activo o no el talback

    const toggleTalback=()=>{

      setIsTalBackEnabled(!isTalBackEnabled);
      const message=!isTalBackEnabled ? 'Talkback Activado':'Talkback Desactivado';
      if(isTalBackEnabled==='Talkback Desactivado')
      {
        Speech.stop();
      }
      Speech.speak(message);
     }
     const handleInputChange=(text,setText,label)=>{
          setText(text)
        if(isTalBackEnabled && text ){
          const message=`${label}: ${text}`
          Speech.speak(message);
        }
     }
    const generarReporte=async()=>{
        const margen=calcularMargenGanancia(parseFloat(renovacion),parseFloat(costo))
        const roi=calcularROI(parseFloat(gastoInversion),parseFloat(costoInversion))
        const tir=calcularTIR(flujoDinero.split(',').map(flow=>parseFloat(flow.trim())))
        
         
         const reporteContenido=`
       
       <html>

       <head>
        <style>
        
          body{font-family:Arial,sans-serif;}
           h1{text-align:center;} 
          .result { margin-bottom: 20px; }
          .chart { text-align: center; margin-top: 50px; }
             
        </style>
       
       </head>
         <body>
         <h1>Informe Financiero del año 2024</h1>
         <p>De acuerdo al balance generado de los valores obtenidos durante este periodo finacieros fueron los
         siguientes:</p>
          <p class="result"><strong>Margen de Ganancia:</strong>${margen.toFixed(2)}%</p> 
           <p class="result"><strong>Retorno de Ganancia(ROI):</strong>${roi.toFixed(2)}%</p> 
            <p class="result"><strong>Tasa Interna de Retorno(TIR):</strong>${tir?tir.toFixed(2):'No converge ninguno de los datos'}%</p> 
               </br>
               
                <p>
                 Para mejorar este margen de ganancia ${margen.toFixed(2)}% , debes de  mejorar tus condiciones con los 
                 proveedores actuales o buscar alternativas más económicas sin comprometer la calidad. Reduce costos operativos,
                 como automatización de  procesos o soluciones de logisticas. Evita el exceso de inventario , que puede generar 
                 costos adicionales de almacenamiento o pérdidas por obsolescencia
               </p>
               </br>
               <p>
                 El retorno interno de inversion es esencial para maximizar la rentabilidad y asegurar un crecimiento sostenible en tu
                 negocio. Entonces negocia mejores precios y términos con los proveedores o busca alternativas más económicas sin comprometer la
                 calidad. Revisa los procesos  para identificar y eliminar desperdicios en recursos, tiempo y dinero.    
               </p>

               </br>
               <p>
                 Para mejora la tasa interna retorno deberas reducir el capital invertido inicialmente sin afectar la capacidad del negocio para
                 generar ingresos, esto te permitirá aumentar la rentabilidad, también puedes implementar estrategias de marketing, para la expasión a 
                 nuevos mercados para aumentar las ventas, sin necesidad de incrementar los costos proporcionalmente. 
               </p>
                <div class="chart">
                 <svg width="400" height="200">
                   <line  x1="0" y1="150" x2="100" y2="${150-margen*2}" stroke="blue" stroke-width="2"> </line>
                   <line x1="100" y1="${150-margen*2}" x2="200" y2="${150-roi*2}" stroke="green" stroke-width="2" > </line>
                   <line x1="200" y1="${150-roi*2}" x2="300" y2="${150-(tir||0)}" stroke="red" stroke-width="2"  > </line>
                    <text x="0" y="160" fill="blue">Ganancia</text>
                   <text x="100" y="160" fill="green">ROI</text>
                   <text x="200" y="160" fill="red">TIR</text>
                      
                 </svg>
                 <p>Nota:El gráfico muestra la tendencia entre el margen de ganancia, el ROI y la TIR.</p>
                </div>
            </body>
       
       </html>
       `
      try {
         const {uri}=await Print.printToFileAsync({html:reporteContenido})
         setReporte(uri);
           if (await Sharing.isAvailableAsync())
           {
            Alert.alert('Informe Generado',`El informe PDF se ha generado correctamente:${uri}`)
               await Sharing.shareAsync(uri)
             
           }
           else{
            Alert.alert('Error al compartir','No se pudo compartir el archivo pdf' )
           }
      
      } catch (error) {
         Alert.alert('Error al generar informe','No se pudo generar el informe PDF')
      }
      setRenovacion('')
      setCosto('')
      setGastoInversion('')
      setCostoInversion('')
      setFlujoDinero('')
    }
     //el enfoque del texto
     const handleFocus=(text)=>{
      Speech.speak(`Campo de texto enfocado. ${text}`)
     }
    return(
     <ScrollView>
    <View style={styles.container}>

     <Text style={styles.label}>Ingresos Netos:</Text>
     <TextInput
     style={styles.input}
     placeholder="C$ 0.00"
       keyboardType="numeric"
       value={renovacion}
       onChangeText={setRenovacion}
       onBlur={()=>handleInputChange(renovacion,setRenovacion,'Ingresos Netos:')}
     />
      <Text style={styles.label}>Costos Netos:</Text>
     <TextInput
     style={styles.input}
     placeholder="C$ 0.00"
       keyboardType="numeric"
       value={costo}
       onChangeText={setCosto}
        onBlur={()=>handleInputChange(costo,setCosto,'Costos Netos:')}
     
     />
       <Text style={styles.label}>Costos de inversion:</Text>
     <TextInput
     style={styles.input}
     placeholder="C$ 0.00"
       keyboardType="numeric"
       value={costoInversion}
       onChangeText={setCostoInversion}
        onBlur={()=>handleInputChange(costoInversion,setCostoInversion,'Costos de inversion:')}
     /> 
     <Text style={styles.label}>Ganancia de la Inversion:</Text>
     <TextInput
     style={styles.input}
     placeholder="C$ 0.00"
       keyboardType="numeric"
       value={gastoInversion}
       onChangeText={setGastoInversion}
        onBlur={()=>handleInputChange(gastoInversion,setGastoInversion,'Ganancia de la Inversion:')}
     />
      <Text style={styles.label}>Flujo de Efectivo(separado por comas):</Text>
     <TextInput
     style={styles.input}
     placeholder="ej:4000,2000,3000,1000"
       value={flujoDinero}
       onChangeText={setFlujoDinero}
      onBlur={()=>handleInputChange(flujoDinero,setFlujoDinero,'Flujo de Efectivo(separado por comas):')}
     />
     <View>
     <Button  title="Generar Informe" onPress={generarReporte}/>
       <Text style={{marginTop:20}}>TalKback</Text>
        <Switch
          value={isTalBackEnabled}
          onValueChange={toggleTalback}
        />
      
     </View>
    </View>
    </ScrollView>
    )
}

const styles=StyleSheet.create({

    container:{
        padding:20,
    },
    label:{
        fontSize:18,
        marginVertical:10,
    },
    input:{
        borderWidth:1,
        borderColor:'#ccc',
        padding:10,
        marginBottom:20,
        fontSize:18,
    },
    result:{
        fontSize:20,
        marginVertical:10
    }
})