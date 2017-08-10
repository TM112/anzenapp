import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {connect} from 'react-redux'
import {
  fetchIncident
} from './actions'

class BleControler extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (window.bluetoothle) {
      console.log("BleControler has mounted.")    
      this.ble = window.bluetoothle
    }
    this.bleInit()
      .then((value) => {
        console.log(value)
        if (value.status === 'enabled')
          return this.bleScan({services:[]}, 5000)
        else
          throw "BLE not enabled."
      })
      .then((value) => { // Scan Result
        console.log(value)
        if (value.status === 'scanStarted')
          return Promise.reject("not scan result")
        else if (value.status === 'scanResult') {
          return this.bleConnect({address: value.address}, 1000)
        } else if (value.status === 'scanStopped') {
          return Promise.reject("not scan result")
        }
      }, (reason) => Promise.reject(reason))
      .then((value) => { // Connect Result
        console.log(value)
        if (value.status === 'connected') {
          return this.bleDiscover({address: value.address, clearCache: true})
        } else if (value.status === 'disconnected') {
          return Promise.reject("unexpectedly disconnected")
        }
      }, (reason) => Promise.reject(reason))
      .then((value) => { // Discover Result
        console.log(value)
        if (value.status === 'discovered') {
          return this.bleRead()
        } else {
          return Promise.reject("discover failed")
        }
      }, (reason) => Promise.reject(reason))
      .then((value) => {
        console.log(value)
      })
      .catch((reason) => {
        console.error("Error Occured:" + reason)
      })
  }
  bleInit() {
    return new Promise((resolve) => {
      this.ble.initialize(resolve, {restoreKey: "bluetoothleplugin"})
    })
  }
  bleScan(params, timeout) {
    return new Promise((resolve, reject) => {
      this.ble.startScan(resolve, reject, params)
      setTimeout(() => {
        this.ble.stopScan(resolve, reject)
      }, timeout)
    })
  }
  bleConnect(params, timeout) {
    return new Promise((resolve, reject) => {
      this.ble.connect(resolve, reject, params)
      setTimeout(() => {
        this.ble.isConnected((status) => {
          if (status.isConnected === false) {
            this.ble.disConnect(resolve, reject, params)
          }
        }, reject, params)
      }, timeout)
    })
  }
  bleDiscover(params) {
    return new Promise((resolve, reject) => {
      this.ble.discover(resolve, reject, params)
    })
  }
  bleRead(params) {
    return new Promise((resolve, reject) => {
      this.ble.read(resolve, reject, params)
    })
  }
  render() {
    return (
      <Paper style={{width: 400, height: 400, textAlign: 'center', display: 'inline-box'}}>
         <RaisedButton label="ボタン" primary={true} />
      </Paper>
    )
  }
}
const BleControlerc = ({dispatch}) => {
  return (
    <RaisedButton label="Load" onClick={e => {dispatch(fetchIncident())}} />
  )
}

//export default connect()(BleControlerc)
export default BleControler
