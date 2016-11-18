////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMouse = (Component, offset) => {
  return class ComponentWithMouse extends React.Component {
    state = {
        mouse: {
          x: 0 + offset,
          y: 0 + offset
        }
    }
    onMouseMove = (event) => {
      this.setState({
        mouse: {
          x: event.clientX + offset,
          y: event.clientY + offset
        }
      })
    }

    componentDidMount = () => {
      document.addEventListener('mousemove', this.onMouseMove);
    }
    componentWillUnmount = () => {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
    render() {
      return <Component {...this.props} mouse={this.state.mouse}/>
    }
  }
}

class App extends React.Component {

  static propTypes = {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    return (
      <div>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }
}

const AppWithMouse = withMouse(withMouse(App, 500), 0)

render(<AppWithMouse/>, document.getElementById('app'))

