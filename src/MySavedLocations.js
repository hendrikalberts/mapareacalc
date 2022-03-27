import React, { useState, useEffect } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, View, Pressable, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataStore } from 'aws-amplify';
import { Location } from './models';
import CalculateArea from './MapArea'
import * as MyMapLocation from 'expo-location';

var MyLocations = [
  {
  id: 0,
  latitude: 'blank',
  longitude: 'blank',
  },
  {
  id: 1,
  latitude: 'blank',
  longitude: 'blank',
  },
  {
  id: 2,
  latitude: 'blank',
  longitude: 'blank',
  },
  {
  id: 3,
  latitude: 'blank',
  longitude: 'blank',
  },
  ];

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => { 
    //query the initial list and subscribe to data updates
    const subscription = DataStore.observeQuery(Location).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
      setLocations(items);
    });

    return function cleanup() {
       subscription.unsubscribe();
    }

  }, []);

  async function updateLocation1(updateValue, updateValue1, updateValue2, location) {
    //update the location item with updateValue
    await DataStore.save(
     Location.copyOf(location, updated => {
       updated.location1latitude = updateValue1;
       updated.location1longitude = updateValue2;
       MyLocations[0].latitude = updateValue1;
       MyLocations[0].longitude = updateValue2;
     })     
    );
  }

  async function clearLocation1(updateValue, location) {
    //update the location item with updateValue
    await DataStore.save(
     Location.copyOf(location, updated => {
      updated.location1latitude = updateValue;
      updated.location1longitude = updateValue;
       MyLocations[0].latitude = updateValue;
       MyLocations[0].longitude = updateValue;
     })
    ); 
  }

  async function updateLocation2(updateValue, updateValue1, updateValue2, location) {
    //update the location item with updateValue
    await DataStore.save(
     Location.copyOf(location, updated => {
      updated.location2latitude = updateValue1;
      updated.location2longitude = updateValue2;
       MyLocations[1].latitude = updateValue1;
       MyLocations[1].longitude = updateValue2;
     })     
    );
  }

  async function clearLocation2(updateValue, location) {
    //update the location item with updateValue
    await DataStore.save(
    Location.copyOf(location, updated => {
      updated.location2latitude = updateValue;
      updated.location2longitude = updateValue;
      MyLocations[1].latitude = updateValue;
      MyLocations[1].longitude = updateValue;
    })
    ); 
  }

  async function updateLocation3(updateValue, updateValue1, updateValue2, location) {
    //update the location item with updateValue
    await DataStore.save(
     Location.copyOf(location, updated => {
      updated.location3latitude = updateValue1;
      updated.location3longitude = updateValue2;
       MyLocations[2].latitude = updateValue1;
       MyLocations[2].longitude = updateValue2;
     })     
    );
  }

  async function clearLocation3(updateValue, location) {
    //update the location item with updateValue
    await DataStore.save(
    Location.copyOf(location, updated => {
      updated.location3latitude = updateValue;
      updated.location3longitude = updateValue;
      MyLocations[2].latitude = updateValue;
      MyLocations[2].longitude = updateValue;
    })
    ); 
  }

  async function updateLocation4(updateValue, updateValue1, updateValue2, location) {
    //update the location item with updateValue
    await DataStore.save(
     Location.copyOf(location, updated => {
      updated.location4latitude = updateValue1;
      updated.location4longitude = updateValue2;
       MyLocations[3].latitude = updateValue1;
       MyLocations[3].longitude = updateValue2;
     })     
    );
  }

  async function clearLocation4(updateValue, location) {
    //update the location item with updateValue
    await DataStore.save(
    Location.copyOf(location, updated => {
      updated.location4latitude = updateValue;
      updated.location4longitude = updateValue;
      MyLocations[3].latitude = updateValue;
      MyLocations[3].longitude = updateValue;
    })
    ); 
  }

  const [mapLocation, setMapLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await MyMapLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let mapLocation = await MyMapLocation.getCurrentPositionAsync({
        accuracy: MyMapLocation.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5
      });
      setMapLocation(mapLocation);
      }
    )();
    }, 
    []
  );

  let currentlocation = 'Waiting..';
  let currentlatitude = 'Waiting..';
  let currentlongitude = 'Waiting..';
  let area = 'Waiting..';
  if (errorMsg) {
    currentlatitude = errorMsg;
    currentlongitude = errorMsg;
    area = errorMsg;
  } else if (mapLocation) {
      currentlocation = mapLocation;
      currentlatitude = mapLocation.coords.latitude;
      currentlongitude = mapLocation.coords.longitude;
      area = JSON.stringify(CalculateArea(MyLocations));
  }

  function calculateAreaInSquareMeters(x1, x2, y1, y2) {
    return (y1 * x2 - x1 * y2) / 2;
  }
  function calculateYSegment(latitudeRef, latitude, circumference) {
    return (latitude - latitudeRef) * circumference / 360.0;
  }
  function calculateXSegment(longitudeRef, longitude, latitude, circumference)     {
    return (longitude - longitudeRef) * circumference * Math.cos((latitude * (Math.PI / 180))) / 360.0;
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Map Area Calculator</Text>  
      <Text style={styles.headerSubTitle}>Instructions: Clear each point and then update each point</Text>
      <Text>   
      Current Location: {JSON.stringify(currentlatitude)} {JSON.stringify(currentlongitude)}
      </Text>
      <Text style={styles.infoBox} >Location1 latitude: {`${item.location1latitude}`} {`\n`}
                                    Location1 longitude: {`${item.location1longitude}`}
      </Text>
       <View style={styles.doublebutton}>
       <TouchableOpacity style={styles.halfbutton} onPress={() => 
        {updateLocation1(JSON.stringify(currentlocation), JSON.stringify(currentlatitude),
          JSON.stringify(currentlongitude), item); }}>
        <Text style={styles.halfbuttonText}>update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfbutton} onPress={() => {clearLocation1('Cleared', item);}}>
        <Text style={styles.halfbuttonText}>clear</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.infoBox} >Location2 latitude: {`${item.location2latitude}`} {`\n`}
                                    Location2 longitude: {`${item.location2longitude}`}
      </Text>
       <View style={styles.doublebutton}>
       <TouchableOpacity style={styles.halfbutton} onPress={() => 
        {updateLocation2(JSON.stringify(currentlocation), JSON.stringify(currentlatitude),
          JSON.stringify(currentlongitude), item); }}>
        <Text style={styles.halfbuttonText}>update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfbutton} onPress={() => {clearLocation2('Cleared', item);}}>
        <Text style={styles.halfbuttonText}>clear</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.infoBox} >Location3 latitude: {`${item.location3latitude}`} {`\n`}
                                    Location3 longitude: {`${item.location3longitude}`}
      </Text>
       <View style={styles.doublebutton}>
       <TouchableOpacity style={styles.halfbutton} onPress={() => 
        {updateLocation3(JSON.stringify(currentlocation), JSON.stringify(currentlatitude),
          JSON.stringify(currentlongitude), item); }}>
        <Text style={styles.halfbuttonText}>update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfbutton} onPress={() => {clearLocation3('Cleared', item);}}>
        <Text style={styles.halfbuttonText}>clear</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.infoBox} >Location4 latitude: {`${item.location4latitude}`} {`\n`}
                                    Location4 longitude: {`${item.location4longitude}`}
      </Text>
       <View style={styles.doublebutton}>
       <TouchableOpacity style={styles.halfbutton} onPress={() => 
        {updateLocation4(JSON.stringify(currentlocation), JSON.stringify(currentlatitude),
          JSON.stringify(currentlongitude), item); }}>
        <Text style={styles.halfbuttonText}>update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.halfbutton} onPress={() => {clearLocation4('Cleared', item);}}>
        <Text style={styles.halfbuttonText}>clear</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.headerSubTitle} >Area Calculated from 4 points: {area} </Text>
    </View>
  );

  return (
    <FlatList
      data={locations}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  );
};

export default function MySavedLocations ({ navigation }) {
  return (
    <View style={styles.container} >
      <LocationList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
  halfbutton: {
    width: 125,
    height: 40,
    padding: 2,
    backgroundColor: '#0E2D6D',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "1%",
  },
  doublebutton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'black',
    fontSize: 40,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  headerSubTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  infoBox: {
    borderRadius: 2,
    borderWidth: 2,
    height: 20,
    textAlign: 'left',
    width: 250,
    height: 50,
    textAlign: 'center',
  },
  halfbuttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 4,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
});