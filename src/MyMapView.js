import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MyMapView({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({


      });
      setLocation(location);
      }
    )();
    }, 
    []
  );

  let text1 = 'Waiting..';
  let text2 = 'Waiting..';

  if (errorMsg) {
    text1 = errorMsg;
    text2 = errorMsg;
  } else if (location) {
    text1 = JSON.stringify(location.coords.latitude);
    text2 = JSON.stringify(location.coords.longitude);
        text1 = JSON.stringify(text1);
        text2 = JSON.stringify(text2);
  }

  const mapRef = React.createRef();

  const goToMyLocation = async () => {
    mapRef.current.animateCamera({center:{"latitude":location.coords.latitude, 
                                          "longitude": location.coords.longitude,
                                        }});
  }

  return ( 
    <View style={styles.container1}>
      <Text style={styles.headerTitle}>Map Area Calculator</Text>
      <View style={styles.container2}>  
        <Text style={styles.boldText}>Current Location: {text1}, {text2} </Text>
        <Text style={styles.boldText}>Press Center Button to go to your location.</Text>
        <TouchableOpacity style={styles.button} onPress={goToMyLocation}>
          <Text style={styles.buttonText}>Center</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          zoomEnabled={true} 
          minZoomLevel={10}

        >
        </MapView>  
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: 16,
  },
  headerTitle: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
    },
  boldText: {
    fontSize: 14,
    color: 'black',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.60,
  }, 
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
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});