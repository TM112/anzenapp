import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {connect} from 'react-redux'
import {HOT_ALERT_OK} from './actions'


const mapStateToProps = (state, ownProps) => {  
  return {
    open: state.hotAlert.open,
    temperature: state.hotAlert.temperature
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      dispatch({type: HOT_ALERT_OK})
    }
  }
}


const HotAlert = (props) => {
  const actions = [
    <FlatButton
      label="分かりました"
      primary={true}
      onClick={props.onClick}
    />
  ]
  return (
        <Dialog
          actions={actions}
          modal={false}
          open={props.open}
        >
          体温が{props.temperature}度です。熱中症のおそれがあるので休憩と水分補給をしてください。
        </Dialog>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(HotAlert)
