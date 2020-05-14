import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Input, Button, ListItem, ThemeProvider } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mapdb.db')

export default function AddCity(props) {
    const {navigate} = props.navigation;
    const[text, setText] = useState('');
    const[city, setCity] = useState([]);

    const theme = {
        Button: {
            color: 'black',
            titleStyle: {
                color: 'black',
            }
        }
    }

    useEffect(()=> {
        db.transaction(tx => {
          tx.executeSql('create table if not exists list (text text);');
    
        });
        updateList();
      }, [])
;
    const add = () => {
        db.transaction(tx=> {
          tx.executeSql('insert into list (text) values (?);', [text]);
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

return (
    
    <View style={styles.container}>
        <Input placeholder='Type city & country' style = {{width: 200, color: 'black'}} onChangeText={text => setText(text)} value={text}/>    
    <View style={styles.buttonContainer}>
    <ThemeProvider theme={theme}>
        <Button raised icon={{name: 'add'}} onPress = {add} title ='Add' onChangeText={text=> setText('')}/>
        <Button raised icon={{name: 'done'}} onPress={()=> navigate('Game', {city})} title = "Map" />
    </ThemeProvider>
    </View>
    <View style={styles.container2}>
    <ScrollView style={styles.listcontainer}>
        {city.map((item, id)=>{
            return (
                <ListItem
                key={id}
                title={item.text}
                titleStyle={{
                    marginTop: 0,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "black",
                  }}
                  containerStyle={{ backgroundColor: "#808080" }}
                  rightTitle="Delete"
                  rightTitleStyle={{ color: "blue", fontSize: 12 }}
                  onLongPress={() => {deleteItem(item.id)}}
                  bottomDivider
                />
            )
        })}
    </ScrollView>
    </View>
    </View>
          );
        };

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            marginTop: 23,
            backgroundColor: '#808080',
        },
        container2:{
            marginTop: 20,
            backgroundColor: '#808080'
        },
        listcontainer: {
            flexDirection: "column",
            backgroundColor: '#808080',
          },
        titleText: {
            fontSize: 18,
            fontWeight: "bold"
        },
        deleteText: {
            fontSize: 18,
            fontWeight: "bold",
            color: '#0000ff'
        },
        list: {
            padding: 8,
            borderBottomColor: "black",
            borderBottomWidth: 1,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        },
        buttonContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-around',
            padding: 5,
            marginTop: 15,
            marginBottom: -15,
            width: '100%'
        }
    });