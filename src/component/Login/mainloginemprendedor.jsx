// aca es donde el emprendedor va a crear su cuenta usamos un enrutamiento estatico ya que
// se llenaran dos formularios uno para los datos del emprendedor y el otro para los 
// datos del negocio
import {NavigationContainer}  from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import loginemprendedor from './loginemprendedor';
import descripcionNegocio from './descripcionNegocio';

const Stack = createStackNavigator();

export default function CreacionNegocio() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='loginemprendedor'>
      {/* componente en el cual iniciara el segmento de registro 
      donde el usuario va a poner sus datos */}
      <Stack.Screen name='EMPRENDEDOR' component={loginemprendedor}/>
      {/* luego pasamos al componente donde el usuario digitara 
      la descripcion del negocio */}
      <Stack.Screen name='Descripcion Negocio' component={descripcionNegocio}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}
