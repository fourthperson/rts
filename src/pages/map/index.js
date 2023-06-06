import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StatusBar, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';
import SVGImg from '../../../assets/person.svg';

const fineLocationPermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
const rationale = {
  title: 'Location Permission',
  message: 'Quatrix Partner needs access to your location to be able to show your location, destinations and to calculate distances',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

const MapPage = ({ route, navigation }) => {
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [location, setLocation] = useState(undefined);
  const [compassHeading, setCompassHeading] = useState(0);

  function startLocationUpdates() {
    CompassHeading.start(3, ({ heading, accuracy }) => {
      console.log(`Heading: ${heading}, Accuracy: ${accuracy}`);
      setCompassHeading(Number(heading));
    });
    Geolocation.watchPosition(
      position => {
        console.log(position);
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      error => console.log(error.code, error.message),
      { enableHighAccuracy: true, distanceFilter: 20 },
    );
  }

  async function requestLocationPermission() {
    try {
      let allowed = await PermissionsAndroid.check(fineLocationPermission);
      if (!allowed) {
        const outcome = await PermissionsAndroid.request(fineLocationPermission, rationale);
        setPermissionGranted(outcome === 'granted');
        if (outcome === 'granted') {
          startLocationUpdates();
        }
      } else {
        startLocationUpdates();
      }
    } catch (e) {
      console.error(e);
    }
  }

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

  useEffect(() => {
    requestLocationPermission();
    return () => {
      CompassHeading.stop();
    };
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
    createChannel().then(r => console.log(r));
  }, [permissionGranted]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="orange" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomControlEnabled={true}
        region={{
          latitude: -1.286389,
          longitude: 36.817223,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {location &&
          <Marker coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}>
            <View>
              <SVGImg width={75} height={75} style={{
                transform: [{ rotate: `${compassHeading}deg` }],
              }} />
            </View>

          </Marker>
        }

      </MapView>
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
