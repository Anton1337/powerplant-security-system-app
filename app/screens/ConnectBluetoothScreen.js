import React, { Component } from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial'
import {clockIn, clockOut} from '../store/actions/clocks'
import {warning, removeWarning} from '../store/actions/warning'
import {countdownTimer} from '../store/actions/countdown'
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
    this.countdownInSeconds({data: "C \\r\\n1234567"})
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
  //Möjligt att skapa en stand alone bluetooth js fil?
  bluetoothListener(){
    BluetoothSerial.withDelimiter('\r\n')
    .then((res)=>{
      BluetoothSerial.on('read', (data)=>{
        console.log(data)
        var command = data.data.substring(0,1)
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
          case "C":
            this.countdownInSeconds(data);
            break;
          case "L":
            this.radiationTimeLimit();
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

  
  toggleLightSwitch(){
    BluetoothSerial.write('L')
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device');
      this.setState({connected: true})
    })
    .catch((err) => console.log(err.message))
  }

  countdownInSeconds(data){
    //"C \r\n234567896"
    let secondsString = data.data.substring(6,data.data.length)
    let seconds = parseInt(secondsString)
    this.props.countdownTimer(seconds)
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

  technicianClockIn(data){
    this.props.clockIn()
    ToastAndroid.show(`Clock in`, ToastAndroid.SHORT);
  }
  
  technicianClockOut(data){
    this.props.clockOut()
    this.props.removeWarning()
    ToastAndroid.show(`Clock out`, ToastAndroid.SHORT);
  }

  radiationTimeLimit(){
    this.props.warning()
    ToastAndroid.show("WARNING! GET OUT!!!!!!!!", ToastAndroid.LONG)
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
        <Button
          onPress={this.toggleLightSwitch.bind(this)}
          title="Tänd/släck"
          color="#000"
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


export default connect(null, {clockIn, clockOut, warning, removeWarning, countdownTimer})(ConnectBluetoothScreen);