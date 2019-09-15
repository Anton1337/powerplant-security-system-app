/**
 * App
 *
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// Reducer imports

import Navigator from './navigation/Navigator';

// Redux
//const rootReducer = combineReducers({});

//const store = createStore(rootReducer);

const App = () => {
  return (
    <Navigator />
    /*<Provider store={store}>
      
    </Provider>*/
  );
};

const styles = StyleSheet.create({});

export default App;
