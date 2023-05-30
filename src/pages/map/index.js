import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StatusBar, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import VIForegroundService from '@voximplant/react-native-foreground-service';
// import BackgroundGeolocation from 'react-native-background-geolocation';

const MapPage = ({route, navigation}) => {
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [location, setLocation] = useState();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool App Camera Permission',
          message: 'Cool App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
        // start location tracking

        // BackgroundGeolocation.ready(
        //   {
        //     desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        //     distanceFilter: 10,
        //     stopTimeout: 1,
        //     stopOnTerminate: false,
        //     startOnBoot: false,
        //   },
        //   state => {
        //     if (!state.enabled) {
        //       BackgroundGeolocation.start();
        //     }
        //   },
        // );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const channelConfig = {
    id: 'channelId',
    name: 'Channel name',
    description: 'Channel description',
    enableVibration: false,
  };

  const notificationConfig = {
    channelId: 'channelId',
    id: 3456,
    title: 'Title',
    text: 'Some text',
    icon: 'ic_icon',
    button: 'Some text',
  };

  // BackgroundGeolocation.onLocation(
  //   location => {
  //     console.log('[location] ' + location);
  //     setLocation(location);
  //   },
  //   error => {
  //     console.log('[location.error] ' + error);
  //   },
  // );

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    async function createChannel() {
      if (permissionGranted) {
        await VIForegroundService.getInstance().createNotificationChannel(
          channelConfig,
        );
        console.log('Foreground service channel created');
        await VIForegroundService.getInstance().startService(
          notificationConfig,
        );
      }
    }
    console.log('Has permission: ' + permissionGranted);
    createChannel();
  }, [permissionGranted]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="orange" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: -1.286389,
          longitude: 36.817223,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPage;
