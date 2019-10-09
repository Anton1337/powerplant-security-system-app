import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getEvents} from '../store/actions/events'
import {connect} from 'react-redux'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
  } from 'react-native';
  
function HazmatSuit({ suitState, time }) {
    return (
        <View style={styles.item}>
            <Text>isOn?: {suitState}</Text>
            <Text>time: {time}</Text>
        </View>
    )
}

function Rooms({ room, time }) {
    return (
        <View style={styles.item}>
            <Text>room: {room}</Text>
            <Text>time: {time}</Text>
        </View>
    )
}

function Coefficients({ coefficient, time }) {
    return (
        <View style={styles.item}>
            <Text>coefficient: {coefficient}</Text>
            <Text>time: {time}</Text>
        </View>
    )
}


const ViewTechnicianEventScreen = (props) => {
    const eventId = props.navigation.getParam('eventId')
    const event = useSelector(state =>
        state.events.events.find(event => event._id === eventId)
    )
    
    return (
        <ScrollView>
            <Text style={styles.text}>Clockout: {new Date(event.clockout).toLocaleString()}</Text>
            <Text style={styles.text}>Accumulated radiation: {event.radiation}</Text>
            {/* <Text>{JSON.stringify(event)}</Text> */}

            {/*List all hazmat toggles*/}
            <Text style={styles.text}>Hazmat suit toggle</Text>
            <FlatList
                data={event.hazmat}
                renderItem={({ item }) => <HazmatSuit suitState={item.isOn.toString()} time={new Date(item.date).toLocaleTimeString()}/>}
                keyExtractor={item => item._id}
            />

            {/*List all room changes*/}
            <Text style={styles.text}>Rooms</Text>
            <FlatList
                data={event.room}
                renderItem={({ item }) => <Rooms room={item.currentRoom.toString()} time={new Date(item.date).toLocaleTimeString()}/>}
                keyExtractor={item => item._id}
            />

            {/*List all coefficient changes*/}
            <Text style={styles.text}>Coefficients</Text>
            <FlatList
                data={event.k}
                renderItem={({ item }) => <Coefficients coefficient={item.value.toString()} time={new Date(item.date).toLocaleTimeString()}/>}
                keyExtractor={item => item._id}
            />
        </ScrollView>
    );
};

ViewTechnicianEventScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('eventTitle'),
      headerTitleStyle: {textAlign: 'center', flex: 1}
    }
}

const styles = StyleSheet.create ({
    item: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       margin: 2,
       borderColor: '#2a4944',
       borderWidth: 1,
       backgroundColor: 'white',
       padding: 10
    },
    text: {
        alignItems: 'center',
       margin: 2,
       padding: 10
    }
  })

export default connect(null, null)(ViewTechnicianEventScreen);