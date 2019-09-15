/**
 * App
 *
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';

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

export default App;
