import React, {useEffect,useState} from "react"
import {View,Button,Text,TextInput,StyleSheet,Alert,ScrollView} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Audio } from "expo-av"
export default CalendarioScreen=()=>{
   
    const [date,setDate]=useState(new Date())
    const [mode,setMode]=useState('date')
    const[show,setShow]=useState(false)
    const [activity,setActivity]=useState('')
    const[scheduleActivities,setScheduleActivities]=useState([])
    
    const playSound=async()=>{

        const {sound}= await Audio.Sound.createAsync(
            require('./assets/sound/Alerta-2.mp3')
        )
        await sound.playAsync();
    }
    const onChange=(event,selectDate)=>{
        const currentDate=selectDate||date;
        setShow(false)
        setDate(currentDate)
    }

    const showMode=(currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }

    const scheduleActivity=()=>{

        if(activity.trim())
        {
            setScheduleActivities([...scheduleActivities,{activity,date}])
              Alert.alert('Actividad Agendada',`Se agendó la actividad correctamente:${activity} para el ${date.toLocaleString()}`)
              setActivity('')
       
        }else{
            Alert.alert('Error al agendar','Por favor, introduce una actividad')
        }
    }

    useEffect(()=>{

        const checkActivity=setInterval(()=>{
            scheduleActivities.forEach(({activity,date})=>{
                const now=new Date();
                if(now>=date){
                    playSound()
                    Alert.alert('Recordatorio de la Actividad',`Es el momento ${activity}`);
                    setScheduleActivities(scheduleActivities.filter(item=>item.date !== date))
                }
            })
        },60000)//verifica cada minuto
        return()=>clearInterval(checkActivity)
    },[scheduleActivities])


    return(

        <View style={styles.container}>
            <Text style={styles.title}>Agendar Actividad</Text>
            <TextInput
              placeholder="Ingrese la actividad"
              value={activity}
              onChangeText={setActivity}
              style={styles.input}
            />
           <View style={styles.buttonContainer}>
            <Button onPress={()=>showMode('date')} title="Selecciona Fecha "/>
            <Button onPress={()=>showMode('time')} title="Selecciona Hora"/>
           </View>
           {
            show&&(
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
            )
           }

           <Button title="Agendar Actividad" onPress={scheduleActivity}/>
              <ScrollView style={{marginTop:20, paddingVertical:10}}>
                {
                    scheduleActivities.map((activity,index)=>(
                        <View key={index}>
                          <Text>{activity.date.toLocaleString()}</Text>
                          <Text>{activity.activity}</Text>
                        </View>
                    ))
                }
              </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#fff',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal:10
    },
  });