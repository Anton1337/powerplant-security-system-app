/**
 * App
 *
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'

const initialState = {}
const middleware = [thunk]

// Reducer imports

import Navigator from './navigation/Navigator';
import clocks from './store/reducers/clocks'

// Redux
const rootReducer = combineReducers({clocks});

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
