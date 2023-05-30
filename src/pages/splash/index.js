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

const SplashPage = ({navigation}) => {
  const params = {buttontext: 'Anything'};

  const [notificationsAllowed, setNotificationsAllowed] = useState(false);

  const requestNotificationPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    setNotificationsAllowed(granted);
    if (!granted) {
      const allowed = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Notification Permission',
          message:
            'Cool Photo App needs access to be able to show notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setNotificationsAllowed(
        allowed === PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, [notificationsAllowed]);

  // const bubble = async () => {
  //   initialize().then(() => {
  //     showFloatingBubble();
  //   });
  // };

  // const showBubble = async () => {
  //   let hasPermission = await checkPermission();
  //   if (hasPermission) {
  //     bubble();
  //   } else {
  //     requestPermission()
  //       .then(() => bubble())
  //       .catch(error => console.log('Permission denied: ' + error));
  //   }
  // };

  // useEffect(() => {
  //   async function initBubble() {
  //     let hasPermission = await checkPermission();
  //     console.log('Has overlay permissions: ' + hasPermission);
  //     if (!hasPermission) {
  //       requestPermission().then(() => {
  //         initialize().then(() => {
  //           showFloatingBubble();
  //         });
  //         // showFloatingBubble();
  //       });
  //     } else {
  //       // has permission
  //       initialize().then(() => {
  //         showFloatingBubble();
  //       });
  //     }
  //   }
  //   initBubble();
  // });

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
                showBubble();
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
