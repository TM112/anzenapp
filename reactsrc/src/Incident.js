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

  const onClick = (e) => {
    props.onClick(props.value.id)
  }

  return (
    <BasePaper>
      <div style={{height: 50, display: 'inline-block', cursor: 'pointer'}} onClick={onClick}>
        <Avatar  style={{margin: 5}} backgroundColor={deepOrange300} icon={<FontIcon className="material-icons">assignment</FontIcon>}/>
        <span style={{fontSize: '20px'}}>{(dt.getMonth() + 1) + '月' + dt.getDay() + '日 ' + dt.getHours() + '時' + dt.getMinutes() + "分"}</span>
      </div>
    </BasePaper>
  )
}

// インシデントの入力画面
function EditIncident(props) {

  const incident = props.value
  const dt = new Date(incident.date)

  const onChange = (e) => {
    props.onChange(incident.id, e.target.id, e.target.value)
  }

  const onSaveClick = (e) => {
    props.onSaveClick(incident.id)
  }

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
        value={incident.work}
        onChange={onChange}
      /><br/>
      <TextField
        id="fact"
        hintText="何があった・何を見ましたか？"
        floatingLabelText="出来事"
        value={incident.fact}
        onChange={onChange}
      /><br/>
      <TextField
        id="risk"
        hintText="どうなる可能性がありますか？"
        floatingLabelText="リスク"
        value={incident.risk}
        onChange={onChange}
      /><br/>
      <TextField
        id="proposal"
        hintText="何か提案はありますか？"
        floatingLabelText="提案"
        value={incident.proposal}
        onChange={onChange}
      /><br/>
      <FlatButton label="更新する" onClick={onSaveClick} />
    </BasePaper>
  )
}

// インシデントの通常表示画面
function DisplayIncident(props) {
  const incident = props.value

  const onEditClick = (e) => {
    props.onEditClick(incident.id)
  }

  return (
    <BasePaper>
      <Block style={pstyle} title="日時">{incident.date}</Block>
      <Block style={pstyle} title="何をしているとき">{incident.work}</Block>
      <Block style={pstyle} title="何があった">{incident.fact}</Block>
      <Block style={pstyle} title="どんなおそれ">{incident.risk}</Block>
      <Block style={pstyle} title="提案">{incident.proposal}</Block>
      <FlatButton label="修正する" onClick={onEditClick} />
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

function Incident(props) {
  if (props.value.editmode) {
    return <EditIncident value={props.value} onSaveClick={props.onSaveClick} onChange={props.onChange}/>
  } else if (props.value.work || props.value.fact) {
    return <DisplayIncident value={props.value} onEditClick={props.onEditClick}/>    
  } else {
    return <EmptyIncident value={props.value} onClick={props.onEmptyIncidentClick}/>
  }
}

function IncidentList(props) {
  const incidents = props.incidents
  const incidentById = props.incidentById

  const onEmptyIncidentClick = (id) => {
    props.onEmptyIncidentClick(id)
  }

  const onSaveClick = (id) => {
    props.onSaveClick(id)
  }

  const onChange = (id, elementId, value) => {
    props.onChange(id, elementId, value)
  }

  const onEditClick = (id) => {
    props.onEditClick(id)
  }
  /*
  return (
    <Incident value={incidentById[1]}
      onEmptyIncidentClick={onEmptyIncidentClick}
      onSaveClick={onSaveClick}
      onChange={onChange}
      onEditClick={onEditClick}/>
  )
  */
  const incidentList = incidents.map((id)=>(
    <Incident value={incidentById[id]}
      onEmptyIncidentClick={onEmptyIncidentClick}
      onSaveClick={onSaveClick}
      onChange={onChange}
      onEditClick={onEditClick}/>
  ))

  return (
    <div>{incidentList}</div>
  )
}
export default IncidentList