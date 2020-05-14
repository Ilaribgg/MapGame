import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert,  TextInput, AsyncStorage} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Button, ThemeProvider } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const db = SQLite.openDatabase('mapdb.db')

export default function MapScreen(props) {
  const {navigate} = props.navigation;
  const {params} = props.navigation.state
  const [guess, setGuess] = useState('');
  const [count, setCount] = useState(1);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const theme = {
    Button: {
        color: 'black',
        titleStyle: {
            color: 'black',
        }
    }
}
useEffect(()=> {
  getLocation();
}, []);

const getLocation = async() => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !=='granted') {
      Alert.alert('No permission to access location');
  }
  else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
       latitudeDelta: 0.03,
       longitudeDelta: 0.03,
       title: "You are here",
    })
  }
};

  useEffect(()=> {
    db.transaction(tx => {
      tx.executeSql('create table if not exists list (text text);');
    });
    updateList();
  }, [])

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from list;', [], (_, { rows }) =>
        setCity(rows._array)
      ); 
    });
  }
  useEffect(() => {
    updateList();
  }, []);
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from list where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listItems = city.map((item, id)=> item.text);
  const rList = listItems[Math.floor(Math.random() * listItems.length)];
  const correctCountry = region.country;
  const teksti = [', tries used: '];
  const answer = ['Correct answer: ']
  
  const search = () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=zWSNQgaKtFQdfh00Qqij8dAjsULQiLwo&location=' + rList;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
      setRegion({
        country: responseJson.results[0].providedLocation.location.split(' ')[1].slice(),
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
  
  const rightAnswer = () => {
    if (guess == correctCountry) {
      alert('You answered correctly after ' + count + ' tries!');
      let r = answer + correctCountry + teksti + count
      setData([...data, {key:r}]);
      setCount(1);
    } else if(count < 6) {
      setCount(count +1)
      alert("Wrong. You've used " + count + " tries out of 5!");
    } if (count == 6) {
      setCount(1);
      setData('');
      alert("You've used 5 tries out of 5! Highscore has been reset!");
    }
  }
    return (

      <View style={styles.container}>
        <MapView style={{ flex:1 }} region={region}
        minZoomLevel={10}
        maxZoomLevel={18}
        >
        <Marker coordinate={{
          latitude:region.latitude, 
          longitude:region.longitude, 
          country:region.location
          }} 
          onRegionChange={region}/>
        </MapView>
        <TextInput style={{ width:'100%',borderColor: 'gray', borderWidth: 1, bottom:0}} onChangeText={(guess) => setGuess(guess)} value={guess} />
    
    <View style={styles.buttonContainer}>
    <ThemeProvider theme={theme}>
        <Button raised icon={{name: 'search'}} onPress={search} title='Search'/>
        <Button raised icon={{name: 'done'}} onPress={rightAnswer} title='Answer'/>
        <Button raised icon={{name: 'update'}} onPress={updateList} title='Update'/>
        <Button raised icon={{name: 'list'}}onPress={()=> navigate('Highscore', {data})} title = "Highscore" />
    </ThemeProvider>
    </View>
    </View>
    
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      buttonContainer: {
        alignContent: 'stretch'
      } 
    });