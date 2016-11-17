/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

class Form extends React.Component {
  static childContextTypes = {
    form: React.PropTypes.shape({
      handleSubmit: React.PropTypes.func.isRequired
    }).isRequired
  }

  getChildContext = () => ({
    form: {
      handleSubmit: this.props.handleSubmit
    }
  })
  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    form: React.PropTypes.shape({
      handleSubmit: React.PropTypes.func.isRequired
    }).isRequired
  }

  render() {
    return <button onClick={this.context.form.handleSubmit}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    form: React.PropTypes.shape({
      handleSubmit: React.PropTypes.func.isRequired
    }).isRequired
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13){
      this.context.form.handleSubmit();
    }
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.onKeyDown}
      />
    )
  }
}

class App extends React.Component {

  handleSubmit = () => {
    alert('YOU WIN!')
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form handleSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
