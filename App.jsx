/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {reopenApp} from 'react-native-floating-bubble';

import SplashPage from './src/pages/splash';
import HomePage from './src/pages/home';
import MapPage from './src/pages/map';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

DeviceEventEmitter.addListener('floating-bubble-press', e => {
  // What to do when user press the bubble
  reopenApp();
});
DeviceEventEmitter.addListener('floating-bubble-remove', e => {
  // What to do when user removes the bubble
  console.log('Remove Bubble');
});

export default App;
