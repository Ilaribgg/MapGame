import React, {useState} from 'react';
import{createStackNavigator} from'react-navigation-stack'
import {createAppContainer} from 'react-navigation';
import{ createBottomTabNavigator} from'react-navigation-tabs';
import ScoreScreen from './components/ScoreScreen';
import MapScreen from './components/MapScreen';
import AddCity from './components/AddCity';

const AppNavigator = createBottomTabNavigator({
  Game: {screen: MapScreen},
  Hiscore: {screen: ScoreScreen},
  Add: {screen: AddCity}
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}
