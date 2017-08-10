import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {
  fetchIncident
} from './actions'

const LoadButton = ({dispatch}) => {
  return (
    <FlatButton label="Load" onClick={e => {dispatch(fetchIncident())}} />
  )
}

export default connect()(LoadButton)
