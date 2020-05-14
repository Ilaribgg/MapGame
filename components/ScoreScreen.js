import React, {useState} from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements';

export default function ScoreScreen(props) {
    const{params} = props.navigation.state;
    const {navigate} = props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView style={styles.listcontainer}>
        {params.data.map((item, key)=>{
          return (
            <ListItem
            key={key}
            title={item.key}
            titleStyle={{
                marginTop: 0,
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
              }}
              containerStyle={{backgroundColor: "#808080"}}
              bottomDivider
            />
        )
    })}
  </ScrollView>
  </View>
          );
      };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 23,
    },
    container2:{
      marginTop: 20,
      backgroundColor: '#808080'
    },
    titleText: {
      fontSize: 15,
      fontWeight: "bold",
    },
    listcontainer: {
      flexDirection: "column",
      backgroundColor: '#808080',
    }
  });