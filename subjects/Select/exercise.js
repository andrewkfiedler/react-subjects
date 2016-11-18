import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Option extends React.Component {
  render() {
    return (
      <div className="option" onClick={() => {
        this.props.onClick(this.props.value)
      }}>{this.props.children}</div>
    )
  }
}

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  }
  state = {
    isOpen: false,
    value: this.props.defaultValue
  }
  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  isControlled = () => {
    return this.props.value != null
  }

  render() {
    let value = this.props.value || this.state.value
    let label
    const children = React.Children.map(this.props.children, (child) => {
      if (child.props.value === value){
        label = child.props.children
      }
      return React.cloneElement(child, {
        onClick: (value) => {
          this.setState({
            value: value,
            isOpen: false
          })
          this.props.onChange && this.props.onChange(value)
        }
      })
    })
    return (
        <div className="select">
          <div className="label" onClick={this.toggleOpen}>{label} <span className="arrow">▾</span></div>
          <div className="options"
              style={{
                display: this.state.isOpen ? 'block' : 'none'
              }}>
            {children}
          </div>
        </div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
   this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue: selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
