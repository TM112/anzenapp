import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {connect} from 'react-redux'

import {
  viewWorkerIncident
} from './actions'

const WorkerIncidentsButton = ({dispatch}) => {
  return (
    <FlatButton label="ヒヤリハット" icon={<FontIcon className="material-icons">report_problem</FontIcon>} onClick={e => {dispatch(viewWorkerIncident(1))}} />
  )
}

export default connect()(WorkerIncidentsButton)
