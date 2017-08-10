import fetch from 'isomorphic-fetch'
import {Promise} from 'es6-promise'
import {testdata, IRValue, hbr} from './testdata'

// Redux Actions
export const INIT = 'INIT'
// 画面遷移関係
// Pagse.APP_TOP
export const SELECT_SITE = 'SELECT_SITE'
// Pagse.SITE_TOP
export const SELECT_WORKER = 'SELECT_WORKER'
export const VIEW_SITE_INCIDENTS = 'VIEW_SITE_INCIDENTS'
export const RETURN_APP_TOP = 'RETURN_APP_TOP'
// Pagse.WORKER_TOP
export const RETURN_SITE_TOP = 'RETURN_SITE_TOP'
export const VIEW_WORKER_INCIDENT = 'VIEW_WORKER_INCIDENT'
// Pagse.WORKER_INCIDENT
export const RETURN_WORKER_TOP = 'RETURN_WORKER_TOP'

// ヒヤリハット編集
export const EDIT_INCIDENT = 'EDIT_INCIDENT'
export const CHANGE_INCIDENT = 'CHANGE_INCIDENT'
export const SAVE_INCIDENT = 'SAVE_INCIDENT'
export const SAVE_INCIDENT_START = 'SAVE_INCIDENT_START'
export const SAVE_INCIDENT_COMPLETE = 'SAVE_INCIDENT_COMPLETE'
export const DELETE_INCIDENT = 'DELETE_INCIDENT'

// Database Actions
export const LOAD_SITES = 'LOAD_SITES'
export const REQUEST_SITES = 'REQUEST_SITES'
export const RESPONSE_SITES = 'RESPONSE_SITES'
export const LOAD_WORKERS = 'LOAD_WORKERS'
export const REQUEST_WORKERS = 'REQUEST_WORKERS'
export const RESPONSE_WORKERS = 'RESPONSE_WORKERS'
export const LOAD_SITE_INCIDENTS = 'LOAD_SITE_INCIDENTS'
export const REQUEST_SITE_INCIDENTS = 'REQUEST_SITE_INCIDENTS'
export const RESPONSE_SITE_INCIDENTS = 'RESPONSE_SITE_INCIDENTS'
export const LOAD_WORKER_INCIDENTS = 'LOAD_WORKER_INCIDENTS'
export const REQUEST_WORKER_INCIDENTS = 'REQUEST_WORKER_INCIDENTS'
export const RESPONSE_WORKER_INCIDENTS = 'RESPONSE_WORKER_INCIDENTS'

export const LOAD_INCIDENT = 'LOAD_INCIDENT'
export const REQUEST_INCIDENT = 'REQUEST_INCIDENT'
export const RESPONSE_INCIDENT = 'RESPONSE_INCIDENT'

// Bital Actions
export const UPDATE_BITAL = 'UPDATE_BITAL'
export const HOT_ALERT = 'HOT_ALERT'
export const HOT_ALERT_OK = 'HOT_ALERT_OK'

/*
 * Other Constants
 */
export const Pages = {
  APP_TOP: 'APP_TOP',
  SITE_TOP: 'SITE_TOP',
  WORKER_TOP: 'WORKER_TOP',
  WORKER_INCIDENTS: 'WORKER_INCIDENTS',
  SITE_INCIDENTS: 'SITE_INCIDENTS'
}

/*
 * Action Creators
 */
export function selectSite(id) {
  console.log("Select Site Start")
  return (dispatch) => {
    dispatch({type: SELECT_SITE, id})
    dispatch(loadWorkers(id))
  }
}
export function selectWorker(id) {
  return {type: SELECT_WORKER, id}
}
export function createIncident() {

}
export function viewWorkerIncident(id) {
  return {type: VIEW_WORKER_INCIDENT, id}
}
export function editIncident(id) {
  return {type: EDIT_INCIDENT, id}
}
export function changeIncident(id, elementId, value) {
  return {type: CHANGE_INCIDENT, id, elementId, value}
}
export function saveIncidentStart(id) {
  return {type: SAVE_INCIDENT_START, id}
}
export function saveIncidentComplete(id) {
  return {type: SAVE_INCIDENT_COMPLETE, id}
}
export function deleteIncident(id) {
  return {type: DELETE_INCIDENT, id}
}
export function returnWorkerTop(id) {
  return {type: RETURN_WORKER_TOP, id}
}

// Data Load Actions
export function responseSites(json) {
  console.log(json)
  return {type: RESPONSE_SITES, json}
}
export function responseWorkers(json) {
  console.log(json)
  return {type: RESPONSE_WORKERS, json}
}
export function loadIncident() {
  return {type: LOAD_INCIDENT}
}
export function requestIncident() {
  console.log("requestIncident")
  return {type: REQUEST_INCIDENT}
}
export function responseIncident(json) {
  console.log(json)
  return {type: RESPONSE_INCIDENT, json}
}

// Asyinc Action
const header = () => {
  let myHeaders = new Headers()
  myHeaders.append("Authorization", "Basic " + btoa("7836e195-d514-4e1f-9cfd-e9f85c51ba81-bluemix" + ":" + "930843c2b5251323a3fc0eb032b15a89999421c12272743b8c13eec1da322afe"))
  myHeaders.append("Content-Type","application/json")
  return myHeaders
}
const url = (path) => {
  let host =  "https://7836e195-d514-4e1f-9cfd-e9f85c51ba81-bluemix.cloudant.com"
  return host + path
}

export function loadSites() {
  console.log("Load Sites Start")
  return dispatch => {
    dispatch({type: REQUEST_SITES})
    let myRequest = {
      method: "POST",
      headers: header(),
      mode: "CORS",
      body: JSON.stringify({selector:{}, fields:[]})
    }
    return fetch(url("/site/_find"), myRequest)
      .then(response => response.json())
      .then(json => {
        let docs = json.docs
        let newJson = {}
        for (let i in docs) {
          newJson[docs[i]._id] = docs[i]
        }
        return dispatch(responseSites(newJson))
      })
  }
}

// param: site id
export function loadWorkers(id) {
  console.log("Load Workers Start:" + id)
  return dispatch => {
    dispatch({type: REQUEST_WORKERS})
    let myRequest = {
      method: "POST",
      headers: header(),
      mode: "CORS",
      body: JSON.stringify({selector:{_id: id}, fields:[]})
    }
    return fetch(url("/site/_find"), myRequest)
      .then(response => response.json())
      .then(json => {
        let workers = json.docs[0].workers
        let myRequest = {
          method: "POST",
          headers: header(),
          mode: "CORS",
          body: JSON.stringify({selector:{_id: {$in: workers}}, fields:[]})
        }
        return fetch(url("/worker/_find"), myRequest)
          .then(response => response.json())
          .then(json => {
            let docs = json.docs
            let newJson = {}
            for (let i in docs) {
              newJson[docs[i]._id] = docs[i]
            }
            return dispatch(responseWorkers(newJson))
          })
      })
  }
}

export function fetchIncident() {
  console.log("fetchIncident")
  return dispatch => {
    dispatch(requestIncident)

    let body = JSON.stringify({
      selector:{},fields:[]
    })
    let myInit = {
      method: "POST",
      headers: header(),
      mode: "CORS",
      body: body
    }
    let qurl = url("/incident/_find")
    return fetch(qurl,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        let docs = json.docs
        let newJson = {}
        for (let i in docs) {
          newJson[docs[i].id] = docs[i]
        }
        return dispatch(responseIncident(newJson))
      })
  }
}

export function saveIncident(id) {
  console.log("saveIncident")
  return (dispatch, getState) => {
    dispatch(saveIncidentStart(id))
    const doc = getState().incidentById[id]
    let myHeaders = new Headers()
    myHeaders.append("Authorization", "Basic " + btoa("7836e195-d514-4e1f-9cfd-e9f85c51ba81-bluemix" + ":" + "930843c2b5251323a3fc0eb032b15a89999421c12272743b8c13eec1da322afe"))
    myHeaders.append("Content-Type","application/json")
    let body = JSON.stringify(doc)
    let myInit = {
      method: "PUT",
      headers: myHeaders,
      mode: "CORS",
      body: body
    }
    let host =  "https://7836e195-d514-4e1f-9cfd-e9f85c51ba81-bluemix.cloudant.com"
    let url = host + "/incident/" + doc._id
    return fetch(url,myInit)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        return dispatch(saveIncidentComplete(id))
      })
    
  }
}

export function updateBital(i) {
  let j = i;
  let k = i % 24;
  console.log("update bital " + i)
  if (j >= IRValue.length) j = 0;
  return (dispatch) => {
    dispatch({type: UPDATE_BITAL, IRValue: IRValue[j], hbr: hbr[k]})
    // Hot Alert
    /*
    if (testdata[j].temperature > 38.5) {
      console.log("hot alert!")
      dispatch({type: HOT_ALERT, temperature: testdata[j].temperature})
    }
    */
    setTimeout(()=>{return dispatch(updateBital(++j))}, 1000)
  }
}