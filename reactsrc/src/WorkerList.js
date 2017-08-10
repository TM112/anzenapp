import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List'

import {
  loadWorkers
} from './actions'

class WorkerList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const workers = this.props.workers
    const workerById = this.props.workerById
    const lists = workers.map((id) => {
      const worker = workerById[id]
      return (
        <ListItem key={id}
          primaryText={worker.name} />
      )
    })
    return <List>{lists}</List>
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.workers,
    workerById: state.workerById
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerList)