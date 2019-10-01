import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {getEvents} from '../store/actions/events'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';


function Item({ clockin, cellPressed }) {
  return (
    <TouchableOpacity onPress={cellPressed}>
      <View style={styles.item}>
        <Text>{clockin}</Text>
      </View>
    </TouchableOpacity>
  );
}



const TechnicianHistoryScreen = (state) => {
  useEffect(() => {
    state.getEvents()
  }, [state.getEvents])
  return (
    <View>
      <FlatList
          data={state.events.events}
          renderItem={({ item }) => <Item clockin={new Date(item.clockin).toUTCString()} cellPressed={()=>{
            state.navigation.navigate('eventScreen',{title: 'test'})
          }} />}
          keyExtractor={item => item._id}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  events: state.events
})

TechnicianHistoryScreen.navigationOptions = navData => {
  return {
    headerTitle: "Technician event history"
  }
}

const styles = StyleSheet.create ({
  item: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     padding: 30,
     margin: 2,
     borderColor: '#2a4944',
     borderWidth: 1,
     backgroundColor: 'white'
  }
})

export default connect(mapStateToProps, {getEvents})(TechnicianHistoryScreen);
