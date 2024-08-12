import React from 'react';
import { StyleSheet, View, Text, Image,Button} from 'react-native';
import Botonstandar from './botonstandar'

const Cardcomponent = ({onpress ,pro,nameboton}) => {
    return (
      <View style={styles.principalcard}>
        <Image
          source={{ uri: 'https://media.gazetadopovo.com.br/2020/01/17155825/lamborghini-huracan-Alexander-Migl-wikimedia-commons.jpg'}}
          style={styles.imagencard}
        />
        <Text>carro del año</Text>
        <Text style={styles.preciocard}>$ 3300000</Text>
        <View style={styles.carddescriptions}>
          <Text style={{ fontSize: 10 }}> lamborghini orange, last model actualy year</Text>
        </View>
        <Text></Text>
        <Button onPress={onpress} title={nameboton} ></Button>
      </View>
    );
  }

  const styles = StyleSheet.create({
    principalcard:
    {
      width: 150,
      marginHorizontal: 7,
      alignItems: 'center',
      padding:10,
      justifyContent: 'space-around',
      borderWidth: 0.6,
      borderColor: '#ccc',
      borderRadius:10,
    },
    preciocard: {
      fontWeight: 'bold',
    },
    carddescriptions: {
      padding: 5, 
      borderWidth: 0.6,
      borderColor: '#ccc',
      alignItems: 'center',
      marginVertical: 3,
      width: '100%',
    },
    imagencard: {
      width: 140,
      height: 140,
      borderWidth: 1,
      resizeMode:'contain'
    },
})

export default Cardcomponent;