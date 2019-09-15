import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      {/* CLOCK IN STATUS */}
      <View style={styles.clockStatus}>
        <Text style={styles.clockText}>
          You are <Text style={styles.clockStatusText}>Clocked in!</Text>
        </Text>
      </View>
    </View>
  );
};

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
  clockStatusText: {
    color: 'green',
  },
});

export default HomeScreen;
