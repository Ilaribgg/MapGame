import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View, Button, Image, Alert, ActivityIndicato, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mapdb.db')

export default function MapScreen(props) {
  const {navigate} = props.navigation;
  const {params} = props.navigation.state
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState(null);
  const [guess, setGuess] = useState('');
  const [answer, setAnswer] = useState('');
  const [count, setCount] = useState(0);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    
  });
  useEffect(()=> {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (id integer primary key not null, amount text, text text);');

    });
    updateList();
  }, []);

const updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from list;', [], (_, { rows }) =>
      setCity(rows._array)
    ); 
  });
}


  const search = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=zWSNQgaKtFQdfh00Qqij8dAjsULQiLwo&location=' + ;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
      setRegion({
        country: responseJson.results[0].providedLocation.location.split(', ')[1].slice(),
        latitude: responseJson.results[0].locations[0].displayLatLng.lat,
        longitude: responseJson.results[0].locations[0].displayLatLng.lng,
        
         latitudeDelta: 0.03,
         longitudeDelta: 0.03,
      })
      })
      .catch((error) => { 
        Alert.alert('Error' , error); 
      }); 
    }


  
  const list = updateList[Math.floor(Math.random()*updateList.length)];
  const correctCountry = region.country;
  const teksti = [' Guesses: ']

  
  const rightAnswer = () => {
    if (guess == correctCountry) {
      setCount(count +1)
      alert("You answered correctly!");
      let r = correctCountry + teksti + count
      setData([...data, {key:r}]);
    } else {
      setCount(count +1)
      alert("Maybe you should Google this one");
    }
  }

  

    return (
      <View style={styles.container}>
        <MapView style={{ flex:1 }} region={region} >
          <Marker coordinate={{latitude:region.latitude, longitude:region.longitude, country:region.location}} onRegionChange={region}/>
        </MapView>
        <KeyboardAvoidingView behavior="padding" enabled>
        <TextInput style={{ width:'100%', bottom:0}} onChangeText={(guess) => setGuess(guess)} value={guess} />
        <Button title='Search' onPress={search}/>
        <Button title='Answer' onPress={rightAnswer}/>
        <Button onPress={()=> navigate('Hiscore', {data})} title = "Hiscore" />
        </KeyboardAvoidingView>
      </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      
    });