import React from 'react'

import {connect} from 'react-redux'
import {
  fetchIncident,
  Pages
} from './actions'

import SiteList from './SiteList'
import WorkerList from './WorkerList'
import IncidentContainer from './IncidentContainer'
import BitalChart from './BitalChart'
import HotAlert from './HotAlert'
import BleControler from './BleControler'

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.page
  }
}

const Page = (props) => {
  switch (props.page) {
    case Pages.APP_TOP:
      return (
        <div>
          <SiteList/>
          <BleControler/>
        </div>
      )
    case Pages.SITE_TOP:
      return (
        <div><WorkerList/></div>
      )
    case Pages.WORKER_TOP:
      return (
        <div>
          <BitalChart />
        </div>
      )
    case Pages.WORKER_INCIDENTS:
      return (
        <div>
          <IncidentContainer />
        </div>
      )
    default:
      return null
  }
}

export default connect(mapStateToProps)(Page)
