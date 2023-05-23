import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const HomePage = ({route, navigation}) => {
  const {buttontext} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);

  const url = 'https://jsonplaceholder.typicode.com/todos/';

  const apiCall = async () => {
    setData([]);
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data.slice(0, 6));
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
        style={{margin: 10}}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={item => {
          return (
            <View style={{padding: 3}}>
              <Text style={styles.text}>Title: {item.item.title}</Text>
              <Text style={styles.subTitle}>
                Completed: {item.item.completed.toString()}
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginStart: '5%',
              marginEnd: '5%',
            }}
          />
        )}
      />
      <DropDownPicker
        schema={{label: 'title', value: 'id'}}
        open={dropDownOpen}
        items={data}
        value={dropDownValue}
        setOpen={setDropDownOpen}
        setValue={setDropDownValue}
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
  text: {color: '#000000', fontSize: 16.0, fontWeight: 'normal'},
  subTitle: {color: '#000000', fontSize: 14.0, fontWeight: 'normal'},
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
