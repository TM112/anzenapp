import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'

import {
  loadSites,
  selectSite
} from './actions'

import IncidentContainer from './IncidentContainer';
import BitalChart from './BitalChart'
import HotAlert from './HotAlert'

class SiteList extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    this.props.onMount()
  }
  onClick(id) {
    console.log("onClick:" + id)
    this.props.selectSite(id)
  }
  render() {
    const sites = this.props.sites
    const siteById = this.props.siteById
    const lists = sites.map((id) => {
      const site = siteById[id]
      return (
        <ListItem key={id}
          primaryText={site.title}
          secondaryText={site.address}
          onClick={(e)=>{this.onClick(id)}} />
      )
    })
    return <List>{lists}</List>
  }
}

const mapStateToProps = (state) => {
  return {
    sites: state.sites,
    siteById: state.siteById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(loadSites())
    },
    selectSite: (id) => {
      dispatch(selectSite(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList)