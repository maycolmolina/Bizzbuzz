import React, {useState} from "react"
import {View,Text,TextInput,Button,Alert} from "react-native"
import { DataTable } from "react-native-paper"
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
export default  Presupuesto=()=>{
    //Inicializamos nuestras variables
   const [item,setItem]=useState('') 
   const [cantidad,setCantidad]=useState('')
   const [precio,setPrecio]=useState('')
   const [total,setTotal]=useState('');
   const [items,setItems]=useState([])
   const [presupuesto,setPresupuesto]=useState('')
   
   
   //Creamos la funcion para agregar items a la tabla
   const agregarItems=()=>{
       setItems([...items,{item,cantidad,precio,total:cantidad*precio}])
         //limpiamos cada caja de texto al agregar el item
           setItem('');
           setCantidad('');
           setPrecio('');
    
        }
        //Creamos la funcion que te permita generar el pdf del presupuesto 
        const generatePresupuestoPdf=async()=>{
           const Presupuesto=`
           <html>
           <body>
            <h1>Presupuesto de Gestión de Gastos 2024</h1>   
             <table border="1" style="width:100%; text-align:left;">
              <tr>
               <th>Producto/Servicio</th>
               <th>Cantidad Adquirida</th>
               <th>Precio de Adquisición</th>
               <th>Total de Gastos</th>
              </tr>
              ${items.map((item)=>`
                  <tr>
                   <td>${item.item}</td>
                   <td>${item.cantidad}</td>
                   <td>${item.precio}</td>
                   <td>${item.total}</td>
                  </tr>
                `)
              .join('')}
             </table>
             </br>
             <p>
             Nota: En el siguiente  reporte generado se refleja un PRESUPUESTO DE GASTOS, el cual
              es un plan financiero que detalla y estima los gastos previstos durante un período determinado,
              generalmente un mes o un año. En él se especifican las categorías en la que se distribuirá el dinero
              de acuerdo a las necesidades que presente el emprendedor dependiendo de la experencia. El objetivo de 
              un presupuesto de gastos es controlar los ingresos y evitar gastar más de lo que se tiene disponible,
              promoviendo una gestión eficiente de los recursos económicos.
             </p>
          </body>
           
        </html>
           
           
           `

          try {
            const {uri}=await Print.printToFileAsync({html:Presupuesto})
            setPresupuesto(uri)
            if(await Sharing.isAvailableAsync())
            {
              Alert.alert('Gestión de Presupuesto Generado','Presupuesto 2024 generado correctamente')
                 await Sharing.shareAsync(uri)
            }
          
          } catch (error) {
            Alert.alert('Gestión de Presupuesto no Generado','El presupuesto no se genero correctamente')
          }
          setItem('');
          setCantidad('');
          setPrecio('');
        }
        return(
       <View style={{padding:20}}>
        <Text>Nombre del Producto/Servicio:</Text>
         <TextInput 
          placeholder="Nombre del Producto/Servicio"
          value={item}
           onChangeText={setItem}
            style={{borderWidth:1, marginBottom:10}}
         />
         <Text>Cantidad:</Text>
         <TextInput
          placeholder="Cantidad predefinida"
           value={cantidad}
           onChangeText={setCantidad}
           keyboardType="numeric"
           style={{borderWidth:1,marginBottom:10}}
         />
         <Text>Precio:</Text>
         <TextInput
          placeholder="Precio predefinido"
           value={precio}
           onChangeText={setPrecio}
           keyboardType="numeric"
           style={{borderWidth:1,marginBottom:10}}
         
         />

         <Button title="Agregar Registro" onPress={agregarItems}/>
         <DataTable>
           <DataTable.Header>
            <DataTable.Title>Producto/Servicio</DataTable.Title>
             <DataTable.Title>Cantidad Adquirida</DataTable.Title>
             <DataTable.Title>Precio de Adquisición</DataTable.Title>
             <DataTable.Title>Total de Gastos</DataTable.Title>
           </DataTable.Header>

           {items.map((item,index)=>(
             <DataTable.Row key={index}>
              <DataTable.Cell>{item.item}</DataTable.Cell>
              <DataTable.Cell>{item.cantidad}</DataTable.Cell>
              <DataTable.Cell>{item.precio}</DataTable.Cell>
              <DataTable.Cell>{item.total}</DataTable.Cell>
             </DataTable.Row>
           ))}
         </DataTable>
         <Button title="Generar Presupuesto de Gastos" onPress={generatePresupuestoPdf}/>
       </View>
      )
}