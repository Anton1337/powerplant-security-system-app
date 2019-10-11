import React, { Component } from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial'
import {clockIn, clockOut, newRoom, toggleSuit, changeCoefficient} from '../store/actions/events'
import {warning, removeWarning} from '../store/actions/warning'
import {countdownTimer, resetTimer} from '../store/actions/countdown'
import {connect} from 'react-redux'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { parse } from '@babel/parser';
var _ = require('lodash');

 
class ConnectBluetoothScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      connected: false,
    }
  }
  componentDidMount(){
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
 
      this.setState({ isEnabled, devices })
    })
 
    BluetoothSerial.on('bluetoothEnabled', () => {
      Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ])
      .then((values) => {
        const [ isEnabled, devices ] = values
        this.setState({  devices })
      })
 
      BluetoothSerial.on('bluetoothDisabled', () => {
         this.setState({ devices: [] })
      })
      BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
 
    })
 
  }

  //connect to a bluetooth device
  connect(device){
    this.setState({connecting: true})
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);
      this.bluetoothListener()
      ToastAndroid.show(`Connected to device ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }

  //this will "listen" all incoming data
  bluetoothListener(){
    //Each command from Arduino ends with a ";"
    //This is to determine when an command ends
    BluetoothSerial.withDelimiter(';')
    .then((res)=>{
      BluetoothSerial.on('read', (data)=>{
        //commands recived are recieved as strings. We remove all unnecessary characters 
        let dataString = data.data.replace('\r\n','').replace(";","")
        var command = dataString.split(" ")[0]
        if(this.props.events.clockedIn){
          switch(command){
            case "O":
              this.technicianClockOut(dataString);
              break;
            case "T":
              this.getCurrentTime();
              break;
            case "L":
              this.countdownInSeconds(dataString);
              break;
            case "W":
              this.radiationTimeLimit();
              break;
            case "R":
              this.changeRoom(dataString);
              break;
            case "P":
              this.hazmatsuit(dataString);
              break;
            default:
              break;
          }
        }
        else{
          switch(command){
            case "I":
              this.technicianClockIn(dataString)
              break;
            case "T":
              this.getCurrentTime();
              break;
          }
        }
      })
    })
  }

  _renderItem(item){
    return(<TouchableOpacity onPress={() => this.connect(item.item)}>
            <View style={styles.deviceNameWrap}>
              <Text style={styles.deviceName}>{ item.item.name ? item.item.name : item.item.id }</Text>
            </View>
          </TouchableOpacity>)
  }
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
 
  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }

  
  discoverAvailableDevices () {
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        const uniqueDevices = _.uniqBy(unpairedDevices, 'id');
        console.log(uniqueDevices);
        this.setState({ unpairedDevices: uniqueDevices, discovering: false })
      })
      .catch((err) => console.log(err.message))
    }
  }

  

  //this function is used to tell Arduino that we recieved message
  respondToArduino(command){
    BluetoothSerial.write(command)
    .then((res) => {
      console.log(res, command)
    })
    .catch((err) => console.log(err.message))
  }

  getCurrentTime(){
    const currentTime = "T " + new Date().toLocaleTimeString()
    BluetoothSerial.write(currentTime)
    .then((res) => {
      this.setState({connected: true})
    })
    .catch((err) => console.log(err.message))
  }

  technicianClockIn(){
    //this.props.clockIn() = /store/actions/events.js
    this.props.clockIn()
    ToastAndroid.show(`Clock in`, ToastAndroid.SHORT)
    this.respondToArduino("I")
  }
  
  technicianClockOut(dataString){
    //dataString = "O HH:MM:SS RADIATION". We split on whitespace to get the radiation
    let radiationString = dataString.split(" ")[2]
    let radiation = parseInt(radiationString)
    //this.props.clockOut() = /store/actions/events.js
    this.props.clockOut(radiation)
    this.props.resetTimer()
    this.props.removeWarning()
    ToastAndroid.show(`Clock out`, ToastAndroid.SHORT)
    this.respondToArduino("O")
  }

  countdownInSeconds(dataString){
    //dataString = "L RADIATIONLEVEL SECONDSLEFTUNTILDEATH"
    let coefficientString = dataString.split(" ")[1]
    let coefficient = parseInt(coefficientString)
    let secondsString = dataString.split(" ")[2]
    let seconds = parseInt(secondsString)
    //this.props.countdownTime() = /store/actions/countdown.js
    this.props.countdownTimer(seconds)
    //this.props.changeCoefficient() = /store/actions/events.js
    this.props.changeCoefficient(coefficient)
    this.respondToArduino("L")
  }

  changeRoom(dataString){
    //dataString = "R ROOM"
    let roomString = dataString.split(" ")[1]
    let room = parseInt(roomString)
    //this.props.newRoom() = /store/actions/events.js
    this.props.newRoom(room)
    this.respondToArduino("R")
  }

  hazmatsuit(dataString){
    //dataString = "P SUITSTATUS"
    let suitString = dataString.split(" ")[1]
    let suit = parseInt(suitString)
    //this.props.toggleSuit() = /store/actions/events.js
    this.props.toggleSuit(suit)
    this.respondToArduino("P")
  }

  radiationTimeLimit(){
    //this.props.warning() = /store/actions/warning.js
    this.props.warning()
    ToastAndroid.show("WARNING, Leave now!", ToastAndroid.LONG)
    this.respondToArduino("W")
  }

  render() {
 
    return (
      <View style={styles.container}>
      <View style={styles.toolbar}>
 
            <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
 
            <View style={styles.toolbarButton}>
 
              <Switch
                value={this.state.isEnabled}
                onValueChange={(val) => this.toggleBluetooth(val)}
              />
 
            </View>
      </View>
        <Button
          onPress={this.discoverAvailableDevices.bind(this)}
          title="Scan for Devices"
          color="#000"
        />
        <FlatList
          style={{flex:1}}
          data={this.state.devices}
          keyExtractor={item => item.id}
          renderItem={(item) => this._renderItem(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar:{
    paddingTop:30,
    paddingBottom:30,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
  toolbarTitle:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    flex:1,
    marginTop:6
  },
  deviceName: {
    fontSize: 17,
    color: "black"
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth:1
  }
});


export default connect(mapStateToProps, {clockIn, clockOut, warning, removeWarning, countdownTimer, resetTimer, newRoom, toggleSuit, changeCoefficient})(ConnectBluetoothScreen);