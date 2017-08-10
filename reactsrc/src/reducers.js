import { combineReducers } from 'redux'
import {
  INIT,
  SELECT_SITE,
  SELECT_WORKER,
  VIEW_SITE_INCIDENTS,
  RETURN_APP_TOP,
  RETURN_SITE_TOP,
  VIEW_WORKER_INCIDENT,
  RETURN_WORKER_TOP,
  EDIT_INCIDENT,
  CHANGE_INCIDENT,
  SAVE_INCIDENT,
  SAVE_INCIDENT_START,
  SAVE_INCIDENT_COMPLETE,
  DELETE_INCIDENT,
  LOAD_SITES,
  REQUEST_SITES,
  RESPONSE_SITES,
  LOAD_WORKERS,
  REQUEST_WORKERS,
  RESPONSE_WORKERS,
  LOAD_SITE_INCIDENTS,
  REQUEST_SITE_INCIDENTS,
  RESPONSE_SITE_INCIDENTS,
  LOAD_WORKER_INCIDENTS,
  REQUEST_WORKER_INCIDENTS,
  RESPONSE_WORKER_INCIDENTS,
  LOAD_INCIDENT,
  REQUEST_INCIDENT,
  RESPONSE_INCIDENT,
  UPDATE_BITAL,
  HOT_ALERT,
  HOT_ALERT_OK,
  Pages
} from './actions'

const initialState = {
  title: "現場安全管理",
  page: 'WORKER_INCIDENT',
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
    1: {id: 1, date: "2017-07-06T10:00:00", tantou: 1, work: "屋根工事", fact: "すべった", risk: "落ちる", proposal: "", cause: "", response: "", category: ""},
    2: {id: 2, date: "2017-07-06T12:00:00", tantou: 2, work: "内装工事", fact: "穴があった", risk: "落ちる", proposal: "穴をふさぐ", cause: "", response: "", category: ""},
    3: {id: 3, date: "2017-07-06T15:00:00", tantou: 1, work: "屋根工事", fact: "おとした", risk: "通行人にあたる", proposal: "", cause: "", response: "", category: ""},
  },
  incidents: [1,2,3]
}

function title(state="現場安全管理", action) {
  switch (action.type) {
    case VIEW_WORKER_INCIDENT:
      return "ヒヤリハット一覧"
    case RETURN_WORKER_TOP:
      return "現場安全管理"
    default:
      return state
  }
}

function page(state=Pages.WORKER_TOP, action) {
  switch (action.type) {
    case SELECT_SITE:
      return Pages.SITE_TOP
    case VIEW_WORKER_INCIDENT:
      return Pages.WORKER_INCIDENTS
    case RETURN_WORKER_TOP:
      return Pages.WORKER_TOP
    default:
      return state
  }
}

function incidentById(state={}, action) {
  switch (action.type) {
    case INIT:
      return initialState.incidentById
    case RESPONSE_INCIDENT:
      return action.json
    case EDIT_INCIDENT:
    {
      let incident = Object.assign({}, state)
      incident[action.id].editmode = true
      return incident
    }
    case CHANGE_INCIDENT:
    {
      let incident = Object.assign({}, state)
      incident[action.id][action.elementId] = action.value
      return incident
    }
    case SAVE_INCIDENT_START:
    {
      let incident = Object.assign({}, state)
      incident[action.id].editmode = false
      return incident
    }
    case SAVE_INCIDENT_COMPLETE:
    {
      let incident = Object.assign({}, state)
      incident[action.id].editmode = false
      return incident
    }
    default:
      return state
  }
}

function incidents(state=[], action) {
  switch (action.type) {
    case INIT:
      return initialState.incidents
    case RESPONSE_INCIDENT:
      return Object.keys(action.json)
    default:
      return state
  }
}

function bitalData(state={IRValue:[],hbr:0}, action) {
  switch (action.type) {
    case UPDATE_BITAL: {
      console.log("UPDATE_BITAL")
      console.log(action)
      let IRValue = []
      for (let i = 0; i < state.IRValue.length; i++) {
        IRValue.push(state.IRValue[i])
      }
      if (IRValue.length >= 30) IRValue.shift()
      IRValue.push(action.IRValue)
      let hbr = action.hbr
      return {IRValue: IRValue, hbr: hbr}
    }
    default:
      return state
  }
}

function hotAlert(state={}, action) {
  switch (action.type) {
    case HOT_ALERT:
      console.log(action)
      return {open: true, temperature: action.temperature}
    case HOT_ALERT_OK:
      return {open: false}
    default:
      return state
  }
}

function sites(state=[], action) {
  switch (action.type) {
    case RESPONSE_SITES: {
      return Object.keys(action.json)
    }
    default:
      return state
  }
}
function siteById(state={}, action) {
  switch (action.type) {
    case RESPONSE_SITES: {
      return action.json
    }
    default:
      return state
  }
}
function siteId(state=null, action) {
  switch (action.type) {
    case SELECT_SITE:
      return action.id
    default:
      return state
  }
}
function workers(state=[], action) {
  switch (action.type) {
    case RESPONSE_WORKERS:
      return Object.keys(action.json)
    default:
      return state
  }
}
function workerById(state={}, action) {
  switch (action.type) {
    case RESPONSE_WORKERS:
      return action.json
    default:
      return state
  }
}
function workerId(state=null, action) {
  switch (action.type) {
    case SELECT_WORKER:
      return action.id
    default:
      return state
  }
}

const rootReducer = combineReducers({
  title,
  page,
  sites,
  siteById,
  siteId,
  workers,
  workerById,
  workerId,
  incidentById,
  incidents,
  bitalData,
  hotAlert
})

export default rootReducer