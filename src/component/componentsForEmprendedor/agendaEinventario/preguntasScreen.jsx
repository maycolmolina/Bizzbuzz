import React, {useState} from "react";
import {Button,View,TouchableOpacity,Text} from "react-native"

const questions=[
    {question:"¿Tienes experiencia previa en el sector que estás emprendiendo?", options:["Si","No"]},
    {question:"¿Has realizado algún estudio de mercado para tu negocio?", options:["Si","No"]},
    {question:"¿Tienes un plan de negocio escrito que incluya objetivos a corto y largo plazo?", options:["Si","No"]},
    {question:"¿Tu nivel de conocimiento sobre marketing digital es alto?", options:["Si","No"]},
    {question:" ¿Tu capacidad financiera es suficiente para cubrir al menos 6 meses de operaciones sin ingresos?", options:["Si","No"]},
    {question:"¿Tu red de contactos en la industria es extensa?", options:["Si","No"]},
    {question:"¿La competencia en tu mercado objetivo es alta?", options:["Alta","Media","Baja"]},
    {question:"Tienes experiencia previa en gestión de equipos o liderazgo?", options:["Si","No"]},
    {question:"¿Tu producto o servicio tiene un diferenciador claro respecto a la competencia?", options:["Si","No"]},
    {question:"¿Tienes un conocimiento alto sobre la normativa y regulaciones que afectan tu industria?", options:["Alta","Media","Baja"]},

]
export default PreguntasScreen=({navigation})=>{

  const[currentQuestion,setCurrentQuestion]=useState(0)
  const [answers,setAnswers]=useState([])
    
  const handleAnswer=(answer)=>{
      setAnswers([...answers,answer]);
      if(currentQuestion<questions.length-1){
        setCurrentQuestion(currentQuestion+1)
      }else{
        //Redirige a la pantalla de resultados
        navigation.navigate('Resultado', {answers}) 
      }
  }


  return(
    <View style={{padding:20}}>
     <Text>{questions[currentQuestion].question}</Text>
     {
        questions[currentQuestion].options.map((option,index)=>(
            <TouchableOpacity key={index} onPress={()=>handleAnswer(option)}>

                <Text style={{padding:10,margin:10,backgroundColor:'#ddd' }}>{option}</Text>
            </TouchableOpacity>
        ))
     }
   
    </View>
  )
}