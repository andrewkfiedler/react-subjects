import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return class Connect extends React.Component {
      static contextTypes = {
        store: React.PropTypes.object.isRequired
      }
      componentDidMount = () => {
        this.context.store.listen(() => {
          this.forceUpdate()
        })
      }
      render() {
        const props = mapStateToProps(this.context.store.getState())
        return <Component {...props} dispatch={this.context.store.dispatch}/>;
      }
    }
  }
}
