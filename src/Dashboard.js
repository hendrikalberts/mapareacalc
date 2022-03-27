import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Dashboard({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Map Area Calculator</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MySavedLocations')}>
        <Text style={styles.buttonText}>MySavedLocations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyMapView')}>
        <Text style={styles.buttonText}>MyMapView</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 5,
    backgroundColor: '#0E2D6D',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "2%",
  },
  headerTitle: {
    color: 'black',
    fontSize: 40,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});