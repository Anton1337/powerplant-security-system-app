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
    //this.countdownInSeconds({data: "C 1234567\\r\\n"})
    //this.technicianClockOut({data: "O HH:MM:SS 1312\\r\\n"})
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

  connect(device){
    this.setState({connecting: true})
    BluetoothSerial.connect(device.id)
    .then((res) => {
      console.log(`Connected to device ${device.name}`);
      //this.getCurrentTime()
      this.bluetoothListener()
      //TODO: skicka med date.now till arduinon.
      ToastAndroid.show(`Connected to device ${device.name}`, ToastAndroid.SHORT);
    })
    .catch((err) => console.log((err.message)))
  }

  //kalla på denna funktion nånstans? kanske bryta ut dessa till en egen fil.
  //Möjligt att skapa en standalone bluetooth js fil?
  bluetoothListener(){
    BluetoothSerial.withDelimiter('\r\n')
    .then((res)=>{
      BluetoothSerial.on('read', (data)=>{
        console.log(data)
        var command = data.data.split(" ")[0]
        switch(command){
          case "I":
            this.technicianClockIn(data);
            break;
          case "O":
            this.technicianClockOut(data);
            break;
          case "T":
            this.getCurrentTime();
            break;
          case "L":
            this.countdownInSeconds(data);
            break;
          case "W":
            this.radiationTimeLimit();
            break;
          case "R":
            this.newRoom(data);
            break;
          case "P":
            this.hazmatsuit(data);
            break;
          default:
            break;
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

  

  countdownInSeconds(data){
    console.log("GET SCONDS?")
    console.log(data.data)
    let coefficientString = data.data.split(" ")[1]
    let coefficient = parseInt(coefficientString)
    let secondsString = data.data.split(" ")[2]
    let seconds = parseInt(secondsString)
    this.props.countdownTimer(seconds)
    this.props.changeCoefficient(coefficient)
  }

  getCurrentTime(){
    const currentTime = "T " + new Date().toLocaleTimeString()
    BluetoothSerial.write(currentTime)
    .then((res) => {
      console.log(res);
      this.setState({connected: true})
    })
    .catch((err) => console.log(err.message))
  }

  technicianClockIn(){
    this.props.clockIn()
    ToastAndroid.show(`Clock in`, ToastAndroid.SHORT);
  }
  
  technicianClockOut(data){
    console.log("CLOCKOUT?", data.data)
    let radiationString = data.data.split(" ")[2]
    let radiation = parseInt(radiationString)
    this.props.clockOut(radiation)
    this.props.removeWarning()
    this.props.resetTimer()
    ToastAndroid.show(`Clock out`, ToastAndroid.SHORT);
  }

  newRoom(data){
    console.log("NEW ROOM?",data.data)
    let roomString = data.data.split(" ")[1]
    let room = parseInt(roomString)
    this.props.newRoom(room)
  }

  hazmatsuit(data){
    
    console.log("SUIT?",data.data)
    let suitString = data.data.split(" ")[1]
    let suit = parseInt(suitString)
    this.props.toggleSuit(suit)
  }

  radiationTimeLimit(){
    this.props.warning()
    ToastAndroid.show("WARNING, Leave now!", ToastAndroid.LONG)
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


export default connect(null, {clockIn, clockOut, warning, removeWarning, countdownTimer, resetTimer, newRoom, toggleSuit, changeCoefficient})(ConnectBluetoothScreen);