import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  showFloatingBubble,
  hideFloatingBubble,
  requestPermission,
  checkPermission,
  initialize,
} from 'react-native-floating-bubble';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const SplashPage = ({navigation}) => {
  const params = {buttontext: 'Anything'};

  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [overlayAllowed, setOverlayAllowed] = useState(undefined);

  const notificationPermissions = async () => {
    checkNotifications().then((status, settings) => {
      const granted = status.status === 'granted';
      if (!granted) {
        requestNotifications().then((status1, settings1) => {
          setNotificationsAllowed(status1.status === 'granted');
        });
      }
    });
  };

  const overlayPermission = async () => {
    let hasPermission = await checkPermission();
    if (hasPermission) {
      bubble();
    } else {
      requestPermission()
        .then(x => {
          setOverlayAllowed(true);
          bubble();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    notificationPermissions();
  }, [notificationsAllowed]);

  useEffect(() => {
    if (!overlayAllowed) {
      overlayPermission();
    }
  }, [overlayAllowed]);

  const bubble = async () => {
    initialize().then(x => {
      showFloatingBubble();
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <SafeAreaView>
        <View>
          <Text style={styles.text}>Splash Screen</Text>
          <Button
            title="Go Home"
            color="orange"
            onPress={() => {
              navigation.navigate('Home', params);
            }}
          />
          <Button
            title="Check Go"
            color="blue"
            onPress={async () => {
              if (Platform.OS === 'android') {
                let isGo = NativeModules.GoCheck.isAndroidGoDevice();
                console.log(isGo);
              }
            }}
          />
          <Button
            title="Show Bubble"
            color="green"
            onPress={async () => {
              if (
                Platform.OS === 'android' &&
                !NativeModules.GoCheck.isAndroidGoDevice()
              ) {
                bubble();
              }
            }}
          />
          <Button
            title="Map Screen"
            color="red"
            onPress={() => {
              navigation.navigate('Map');
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: '#000000', fontSize: 16.0, fontWeight: 'bold'},
});

export default SplashPage;
