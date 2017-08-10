import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const pstyle = {
  width: '90%'
}
function Block(props) {
  const style = {
    margin: '5px'
  }
  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '90%',
    color: indigo900,
    lineHeight: '1.3em'
  }
  const bodyStyle = {
    lineHeight: '1.3em'
  }
  return(
    <div style={style}>
      <div style={headerStyle}>{props.title}</div>
      <div style={bodyStyle}>{props.children}</div>
    </div>
  )
}

// 未入力のインシデント
function EmptyIncident(props) {
  const dt = new Date(props.value.date)

  const handleClick = (event) => {
    props.onIncidentClick(event)
  }

  return (
    <BasePaper>
      <div style={{height: 50, display: 'inline-block', cursor: 'pointer'}} onClick={handleClick}>
        <Avatar  style={{margin: 5}} backgroundColor={deepOrange300} icon={<FontIcon className="material-icons">assignment</FontIcon>}/>
        <span style={{fontSize: '20px'}}>{(dt.getMonth() + 1) + '月' + dt.getDay() + '日 ' + dt.getHours() + '時' + dt.getMinutes() + "分"}</span>
      </div>
    </BasePaper>
  )
}

// インシデントの入力画面
class EditIncident extends Component {
  constructor(props) {
    super(props)
    this.state = {...props.value}
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveButton = this.handleSaveButton.bind(this)
  }

  handleChange = (event) => {
    const id = event.target.id
    this.setState({[id]: event.target.value })
  }

  handleSaveButton = (event) => {
    this.props.onSaveClick(this.state)
  }

  render() {
    const dt = new Date(this.props.value.date)
    return (
      <BasePaper>
        <div style={{height: 50, display: 'inline-block'}}>
          <Avatar  style={{margin: 5}} backgroundColor={indigo900} icon={<FontIcon className="material-icons">create</FontIcon>}/>
          <span style={{fontSize: '20px'}}>{(dt.getMonth() + 1) + '月' + dt.getDay() + '日 ' + dt.getHours() + '時' + dt.getMinutes() + "分"}</span>
        </div>
        <TextField
          id="work"
          hintText="何をしているときでしたか？"
          floatingLabelText="作業内容"
          value={this.state.work}
          onChange={this.handleChange}
        /><br/>
        <TextField
          id="fact"
          hintText="何があった・何を見ましたか？"
          floatingLabelText="出来事"
          value={this.state.fact}
          onChange={this.handleChange}
        /><br/>
        <TextField
          id="risk"
          hintText="どうなる可能性がありますか？"
          floatingLabelText="リスク"
          value={this.state.risk}
          onChange={this.handleChange}
        /><br/>
        <TextField
          id="proposal"
          hintText="何か提案はありますか？"
          floatingLabelText="提案"
          value={this.state.proposal}
          onChange={this.handleChange}
        /><br/>
        <FlatButton label="Save" onClick={this.handleSaveButton} />
        <FlatButton label="Action2" />
      </BasePaper>
    )
  }
}

// インシデントの通常表示画面
function DisplayIncident(props) {
  const incident = props.value

  const handleClick = (event) => {
    props.onEditClick(event)
  }

  return (
    <BasePaper>
      <Block style={pstyle} title="日時">{incident.date}</Block>
      <Block style={pstyle} title="何をしているとき">{incident.work}</Block>
      <Block style={pstyle} title="何があった">{incident.fact}</Block>
      <Block style={pstyle} title="どんなおそれ">{incident.risk}</Block>
      <Block style={pstyle} title="提案">{incident.proposal}</Block>
      <FlatButton label="Edit" onClick={handleClick} />
      <FlatButton label="Action2" />
    </BasePaper>
  )
}

// インシデントの管理入力画面
function ManageIncident(props) {

}

function BasePaper(props) {
    const style={
      margin: '5% auto',
      width: '90%',
      left: 0, right: 0,
      padding: '4px'
    }
    return (
      <Paper style={style}>
        {props.children}
      </Paper>
    )
}

class Incident extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'empty'
    }
    this.modeEdit = this.modeEdit.bind(this)
    this.modeDisplay = this.modeDisplay.bind(this)
    this.saveValue = this.saveValue.bind(this)
  }
  modeEdit = (event) => {
    this.setState({mode: 'edit'})
  }
  modeDisplay = (event)=> {
    this.setState({mode: 'display'})
  }
  saveValue = (obj) => {
    this.props.save(obj)
    this.modeDisplay()
  }

  render() {
    const incident = this.props.value
    switch (this.state.mode) {
      case 'empty':
        return <EmptyIncident value={incident} onIncidentClick={this.modeEdit}/>
      case 'edit':
        return <EditIncident value={incident} onSaveClick={this.saveValue}/>
      case 'display':
        return <DisplayIncident value={incident} onEditClick={this.modeEdit}/>
      default:
        return <EmptyIncident value={incident} onIncidentClick={this.modeEdit}/>
    }
  }
}

export {Incident }