import React from "react"
import {View,Text,Button} from "react-native"
export default AnswerScreen=({route,navigation})=>{
  const {answers}=route.params

   const determinarResultados=(answers)=>{
       //logica para determinar que tipo de emprendedor es de acuerdo al conjunto de repuestas
       if(answers.includes("Si")&& answers.includes("Alta"))
       {
           return "Eres un emprendedor con mucha experiencia, sigue asi nuestro plan de negocio te espera..."
       }
       else{
        return "Eres un emprendedor con poca experiencia,sigue adelante no te rindas nuestro plan de negocio esta para complementar tu trabajo..."
       }
   }
   const resultado=determinarResultados(answers)
   return(
    <View style={{padding:20}}>
        <Text>{resultado}</Text>
        <Button title="Crea tu plan de negocio" onPress={()=>{navigation.navigate('Plan')}}/>
    </View>
   )
}