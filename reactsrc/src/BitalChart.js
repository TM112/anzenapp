import React from 'react';
import {connect} from 'react-redux'

import Paper from 'material-ui/Paper';
import ChartistGraph from 'react-chartist'

const mapStateToProps = (state, ownProps) => {

  const IRValue = state.bitalData.IRValue
  const hbr = state.bitalData.hbr

  return {
    IRValue: IRValue,
    hbr: hbr
  }
}

const labels = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]
const BitalChart = (props) => {
  return (
    <div>
      <ChartistGraph data={{labels: labels, series:[props.IRValue]}} type={'Line'} />
      <Paper>{props.hbr}</Paper>
    </div>
  )
}
/*
  const data = props.data
  const labels = data.map(item=>(item.datetime))
  const series = data.map(item=>(item.temperature))
  console.log(labels)
  console.log(series)
  return (
    <div>
    <ChartistGraph data={{labels: labels, series: series}} type={'Line'} />
    </div>
  )*/


export default connect(mapStateToProps)(BitalChart)