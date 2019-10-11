import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigation} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RadiationScreen from '../screens/RadiationScreen';
import ConnectBluetoohScreen from '../screens/ConnectBluetoothScreen';
import TechnicianHistoryNavigator from './TechnicianEventNavigator'

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    History: TechnicianHistoryNavigator,
    Connect: ConnectBluetoohScreen
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'History') {
          iconName = 'md-filing';
        } else if (routeName === 'Connect'){
          iconName = 'md-bluetooth';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
