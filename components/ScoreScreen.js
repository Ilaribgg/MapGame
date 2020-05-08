import React, {useState} from 'react';
import { FlatList, StyleSheet, TextInput, Text, View, Image, Alert, ImageBackground } from 'react-native';


export default function ScoreScreen(props) {
    const {params} = props.navigation.state;
    const[data, setData] = useState([]);
    const[text, setText] = useState('');
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%",
            marginTop: "10%"
          }}
        />
      );
    };

    return (
        <View style={styles.container}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id} 
    renderItem={({item}) => <View>
      <Text>Correct answer: {item.key}</Text>
      </View>}
          ItemSeparatorComponent={listSeparator}
          data={params.data} 
        />  
        </View>
          );
      };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });