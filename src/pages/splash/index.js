import React from 'react';
import {StyleSheet, StatusBar, View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashPage = ({navigation}) => {
  const params = {buttontext: 'Anything'};

  setTimeout(() => {
    navigation.navigate('Home', params);
  }, 1500);

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
