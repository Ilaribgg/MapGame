import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, View, Button, Image, Alert, ActivityIndicato, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mapdb.db')

export default function AddCity(props) {
    const[text, setText] = useState('');
    const[amount, setAmount] = useState('');
    const[city, setCity] = useState([]);
    const myList = [
        'Helsinki,Finland', 'Oslo,Norway', 'Berliini,Germany'
       ]

       useEffect(()=> {
        db.transaction(tx => {
          tx.executeSql('create table if not exists list (id integer primary key not null, amount text, text text);');
    
        });
        updateList();
      }, []);
;
    const add = () => {
        db.transaction(tx=> {
          tx.executeSql('insert into list (text,amount) values (?,?);', [text,amount]);
        },null, updateList
        )
      }
      const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from list;', [], (_, { rows }) =>
            setCity(rows._array)
          ); 
        });
      }
      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from list where id = ?;`, [id]);
          }, null, updateList
        )    
      }
    const listSeparator = () => {
        return (
          <View
            style={{
              height: 5,
              width: "80%",
              backgroundColor: "#fff",
              marginLeft: "10%"
            }}
          />
        );
      };

return (
    <View style={styles.container}>
    <TextInput style = {{width: 200, borderColor: 'gray', borderWidth:2}} onChangeText={text => setText(text)} value={text}/>
    <TextInput style = {{width: 200, borderColor: 'gray', borderWidth:2}} onChangeText={amount => setAmount(amount)} value={amount}/>    
    <Button color="black" title= "Add" onPress = {add}/>
    <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.amount}, {item.text}</Text>
        <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Delete</Text></View>} 
        data={city} 
        ItemSeparatorComponent={listSeparator} />
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
      listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
       },
      });