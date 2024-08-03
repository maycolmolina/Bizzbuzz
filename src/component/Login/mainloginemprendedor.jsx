import {NavigationContainer}  from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import loginemprendedor from './loginemprendedor';
import descripcionNegocio from './descripcionNegocio';

const Stack = createStackNavigator();

export default function CreacionNegocio() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='loginemprendedor'>
      <Stack.Screen name='Emprendedor' component={loginemprendedor}/>
      <Stack.Screen name='Descripcion Negocio' component={descripcionNegocio}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}
