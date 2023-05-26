import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  NativeModules,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashPage = ({navigation}) => {
  const params = {buttontext: 'Anything'};

  // setTimeout(() => {
  //   navigation.navigate('Home', params);
  // }, 1500);

  var goDeviceCheck = NativeModules.GoCheck;
  let isGoDevice = goDeviceCheck.isAndroidGoDevice();
  console.log(isGoDevice);

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
                let isGo = await goDeviceCheck.isAndroidGoDevice();
                console.log(isGo);
              }
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
