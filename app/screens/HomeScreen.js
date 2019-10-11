import React, {useEffect, useState} from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial'
import {connect} from 'react-redux'
import CountDown from 'react-native-countdown-component'
import {warning} from '../store/actions/warning'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const HomeScreen = (state) => {
  return (
    <View style={state.warningState.warning ? styles.warningScreen : styles.screen}>
      {/* CLOCK IN STATUS */}
      <View style={styles.clockStatus}>
        <Text style={styles.clockText}>
          You are <Text style={state.events.clockedIn ? styles.clockInStatusText : styles.clockOutStatusText}>Clocked {state.events.clockedIn ? 'in' : 'out'}!</Text>
        </Text>
      </View>
      {/* CLOCK TIMER COUNTDOWN */}
      <View style={styles.countdownView}>
        {state.warningState.warning ? <Text style={styles.warningText}>WARNING! LEAVE NOW!</Text> : 
          <CountDown
            until={state.countdown.seconds}
            timetoShow={('H', 'M', 'S')}
            size={30}
          />
        }
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  events: state.events,
  warningState: state.warning,
  countdown: state.countdown
})

const styles = StyleSheet.create({
  displayHidden: {
    
  },
  displayShow: {
    
  },
  screen: {
  },
  warningScreen: {
    backgroundColor: 'red',
    flex: 1
  },
  clockStatus: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  clockText: {
    fontSize: 18,
  },
  clockInStatusText: {
    color: 'green',
  },
  clockOutStatusText: {
    color: 'red',
  },
  countdownView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '40%'
  },
  countdownTimer: {
    marginTop: '40%',
    fontSize: 45
  },
  warningText: {
    color: "white",
    fontSize: 30,
    textAlign: 'center'
  }
});

export default connect(mapStateToProps, {warning})(HomeScreen);
