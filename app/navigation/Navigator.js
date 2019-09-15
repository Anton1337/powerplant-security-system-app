import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigation} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RadiationScreen from '../screens/RadiationScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Radiation: RadiationScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home'; //`ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Radiation') {
          iconName = 'pulse'; //'ios-options';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(TabNavigator);
