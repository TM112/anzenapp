import React  from 'react'
import AppBar from 'material-ui/AppBar'
import WorkerIncidentsButton from './WorkerIncidentsButton'
import TopButton from './TopButton'

import {Pages} from './actions'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.title,
    page: state.page
  }
}

const TitleBar = (props) => {
  let button
  if (props.page === Pages.WORKER_TOP) {
    button = <WorkerIncidentsButton />
  } else if (props.page === Pages.WORKER_INCIDENT) {
    button = <TopButton />
  } else {
    button = null
  }
  return (
    <AppBar title={props.title} iconElementRight={button}/>
  )
}

export default connect(mapStateToProps)(TitleBar)
