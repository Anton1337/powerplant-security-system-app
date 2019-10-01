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

import Navigator from './navigation/Navigator'
import events from './store/reducers/events'
import warning from './store/reducers/warning'
import countdown from './store/reducers/countdown'

// Redux
const rootReducer = combineReducers({events, warning, countdown});

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
