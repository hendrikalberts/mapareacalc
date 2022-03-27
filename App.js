import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import Dashboard from './src/Dashboard';
import MySavedLocations from './src/MySavedLocations';
import MyMapView from './src/MyMapView';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();

class App extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: true }}/>
          <Stack.Screen name='MySavedLocations' component={MySavedLocations} options={{ headerShown: true }}/>
          <Stack.Screen name='MyMapView' component={MyMapView} options={{ headerShown: true }}/>
         </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

 export default withAuthenticator(App, { 
    includeGreetings: true,
    });