import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import {testdata} from './testdata'
import TitleBar from './TitleBar'
import Page from './Page'

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const initialState = {
  title: '初期値',
  page: 'WORKER_TOP',
  siteById: {1: {id: 1, title: 'Ａ工事'}},
  sites: [1],
  selectedSite: 1,
  workerById: {
    1: {id: 1, name: "氏名１", avgTemper: 36.0, curTemper: 38.0},
    2: {id: 2, name: "氏名２", avgTemper: 36.0, curTemper: 36.0},
    3: {id: 3, name: "氏名３", avgTemper: 36.0, curTemper: 37.0},
    4: {id: 4, name: "氏名４", avgTemper: 36.0, curTemper: 36.5},
    5: {id: 5, name: "氏名５", avgTemper: 36.0, curTemper: 38.5}
  },
  workers: [1,2,3,4,5],
  selectedWorker: 1,
  incidentById: {
    1: {id: 1, mode: 'empty', date: "2017-07-06T10:00:00", tantou: 1, work: "屋根工事", fact: "すべった", risk: "落ちる", proposal: "", cause: "", response: "", category: ""},
    2: {id: 2, mode: 'empty', date: "2017-07-06T12:00:00", tantou: 2, work: "内装工事", fact: "穴があった", risk: "落ちる", proposal: "穴をふさぐ", cause: "", response: "", category: ""},
    3: {id: 3, mode: 'empty', date: "2017-07-06T15:00:00", tantou: 1, work: "屋根工事", fact: "おとした", risk: "通行人にあたる", proposal: "", cause: "", response: "", category: ""},
  },
  incidents: [1,2,3]
}

let tantou = {
  1: {id: 1, name: "氏名１", avgTemper: 36.0, curTemper: 38.0},
  2: {id: 2, name: "氏名２", avgTemper: 36.0, curTemper: 36.0},
  3: {id: 3, name: "氏名３", avgTemper: 36.0, curTemper: 37.0},
  4: {id: 4, name: "氏名４", avgTemper: 36.0, curTemper: 36.5},
  5: {id: 5, name: "氏名５", avgTemper: 36.0, curTemper: 38.5}
}
let incident = {
  1: {id: 1, date: "2017-07-06T10:00:00", tantou: 1, work: "屋根工事", fact: "すべった", risk: "落ちる", proposal: "", cause: "", response: "", category: ""},
  2: {id: 2, date: "2017-07-06T12:00:00", tantou: 2, work: "内装工事", fact: "穴があった", risk: "落ちる", proposal: "穴をふさぐ", cause: "", response: "", category: ""},
  3: {id: 3, date: "2017-07-06T15:00:00", tantou: 1, work: "屋根工事", fact: "おとした", risk: "通行人にあたる", proposal: "", cause: "", response: "", category: ""},
}
const TantouList = (props) => {
    const list = props.list
    const lists = Object.keys(props.list).map((key) => {
      return (<TantouItem tantou={list[key]} />)
    })
  return (
    <List>
      {lists}
    </List>
  )
}

const TantouItem = (props) => {
  const t = props.tantou
  const icon = t.curTemper > t.avgTemper * 1.02 ? <FontIcon className="material-icons">block</FontIcon> : <FontIcon className="material-icons">thumb_up</FontIcon> 
  return <ListItem primaryText={t.name} leftIcon={icon} />
}
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Page />
      </div>
    );
  }
}

export default App;
