import React, {useState} from 'react';
import {createAppContainer} from 'react-navigation';
import{ createBottomTabNavigator} from'react-navigation-tabs';
import ScoreScreen from './components/ScoreScreen';
import MapScreen from './components/MapScreen';
import AddCity from './components/AddCity';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

const AppNavigator = createBottomTabNavigator({
  Game: {screen: MapScreen},
  Add: {screen: AddCity},
  Highscore: {screen: ScoreScreen},
    
},


{
defaultNavigationOptions:({navigation}) => ({
  tabBarIcon: ({focused, tintColor}) => {
    const {routeName} = navigation.state;
    if (routeName === 'Game') {
      return <MaterialCommunityIcons name ='gamepad-variant' size={25} color={tintColor}/>;
    } else if (routeName === 'Add') {
      return <MaterialIcons name='playlist-add' size={25} color={tintColor}/>;
    } else if (routeName === 'Highscore'){
      return <Ionicons name='ios-list' size={25} color={tintColor}/>;
    }
  }
})
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}
