import {connect} from 'react-redux'
import IncidentList from './Incident'
import {
  editIncident,
  saveIncident,
  changeIncident  
} from './actions'


const mapStateToProps = (state, ownProps) => {
  return {
    incidents: state.incidents,
    incidentById: state.incidentById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmptyIncidentClick: (id) => {
      dispatch(editIncident(id))
    },
    onSaveClick: (id) => {
      dispatch(saveIncident(id))
    },
    onChange: (id, elementId, value) => {
      dispatch(changeIncident(id, elementId, value))
    },
    onEditClick: (id) => {
      dispatch(editIncident(id))
    }
  }
}

const IncidentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentList)

export default IncidentContainer