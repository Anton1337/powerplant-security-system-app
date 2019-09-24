import React from 'react';
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
  console.log(JSON.stringify(state.clocks))
  return (
    <SafeAreaView style={styles.screen}>
      {/* CLOCK IN STATUS */}
      <View style={styles.clockStatus}>
        <Text style={styles.clockText}>
          You are <Text style={state.clocks.clockedIn ? styles.clockInStatusText : styles.clockOutStatusText}>Clocked {state.clocks.clockedIn ? 'in' : 'out'}!</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  clocks: state.clocks
})

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  clockStatus: {
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
  }
});

export default connect(mapStateToProps, null)(HomeScreen);
