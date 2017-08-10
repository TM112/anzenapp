import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {connect} from 'react-redux'

import {
  returnWorkerTop
} from './actions'

const TopButton = ({dispatch}) => {
  return (
    <FlatButton label="もどる" icon={<FontIcon className="material-icons">show_chart</FontIcon>} onClick={e => {dispatch(returnWorkerTop(1))}} />
  )
}

export default connect()(TopButton)
