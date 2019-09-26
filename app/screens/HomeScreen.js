import React, {useEffect, useState} from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial'
import {connect} from 'react-redux'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const HomeScreen = (state) => {
  console.log("FROM HOMESCREEN")
  console.log(state.countdown.seconds)
  /*const [warningRed, setWarningRed] = useState(false);

  useEffect(() => {
    if(state.warning.warning) blinking();
  }, [])

  const blinking = () => {
    setInterval( () => {
      setWarningRed(previousState => {
        return !previousState.warningRed
      });
    }, 500)
  }*/
  return (
    <View style={state.warning.warning ? styles.warningScreen : styles.screen}>
      {/* CLOCK IN STATUS */}
      <View style={styles.clockStatus}>
        <Text style={styles.clockText}>
          You are <Text style={state.clocks.clockedIn ? styles.clockInStatusText : styles.clockOutStatusText}>Clocked {state.clocks.clockedIn ? 'in' : 'out'}!</Text>
        </Text>
      </View>
      {/* CLOCK TIMER COUNTDOWN */}
      <View style={styles.countdownView}>
          <Text style={styles.countdownTimer}>{state.countdown.seconds}</Text>
        </View>
    </View>
  );
};

const mapStateToProps = state => ({
  clocks: state.clocks,
  warning: state.warning,
  countdown: state.countdown
})

const styles = StyleSheet.create({
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
    alignItems: 'center',
    flexDirection: 'row'
  },
  countdownTimer: {
    marginTop: '40%',
    fontSize: 45
  }
});

export default connect(mapStateToProps, null)(HomeScreen);
