import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return class Connect extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object.isRequired
      }
      render() {
        return <Component dispatch={this.context.store.dispatch} counter={this.context.store.getState()}/>;
      }
    }
  }
}
