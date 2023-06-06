import React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  NativeModules,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import CompassHeading from 'react-native-compass-heading';
import SVGImg from '../../../assets/person.svg';

const SplashPage = ({ navigation }) => {
  const params = { buttontext: 'Anything' };

  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [overlayAllowed, setOverlayAllowed] = useState(undefined);
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [compassHeading, setCompassHeading] = useState(0);

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

  // useEffect(() => {
  //   if (!overlayAllowed) {
  //     overlayPermission();
  //   }
  // }, [overlayAllowed]);

  // useEffect(() => {
  //   CompassHeading.hasCompass().then(hasCompass => {
  //     if (hasCompass) {
  //       CompassHeading.start(10, ({ heading, accuracy }) => {
  //         console.log(`Heading: ${heading}, Accuracy: ${accuracy}`);
  //         setCompassHeading(Number(heading));
  //       });
  //     }
  //   });
  // }, []);

  async function bubble() {
    initialize().then(x => {
      showFloatingBubble();
    });
  }


  function handleRotation() {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 500,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <SafeAreaView>
        <View>
          <Text style={styles.titleText}>Splash Screen</Text>
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
          <View style={styles.svgContainer}>
            <Animated.View>
              <SVGImg width={100} height={100} style={{
                transform: [{ rotate: `${compassHeading}deg` }],
              }} />
            </Animated.View>
          </View>
        </View>
        <Text style={styles.bearingText}>{compassHeading.toString()}</Text>
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
  titleText: { color: '#000000', fontSize: 16.0, fontWeight: 'bold' },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  bearingText: { textAlign: 'center', fontWeight: 'bold', color: 'black' },
});

export default SplashPage;
