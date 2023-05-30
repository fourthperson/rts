/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export default App;
