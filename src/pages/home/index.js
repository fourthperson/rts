import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {List, Divider} from 'react-native-paper';

const HomePage = ({route, navigation}) => {
  const {buttontext} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = 'https://jsonplaceholder.typicode.com/todos/';

  const apiCall = async () => {
    setData([]);
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        text="Loading..."
        textStyle={{color: '#ffffff', fontSize: 16.0}}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title={buttontext}
        color="grey"
        onPress={() => navigation.goBack()}
      />
      <Button title="Get Data" color="purple" onPress={() => apiCall()} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          return (
            <List.Item
              style={{padding: 3}}
              title={item.title}
              description={item.completed}
            />
          );
        }}
        ItemSeparatorComponent={() => (
          // <View
          //   style={{
          //     borderBottomColor: 'grey',
          //     borderBottomWidth: StyleSheet.hairlineWidth,
          //   }}
          // />
          <Divider />
        )}
      />
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
