////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time

import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  getInitialState() {
      return {
        billingName: '',
        billingState: '',
        sameAsBilling: false,
        shippingName: '',
        shippingState: ''
      }
  },
  determineShippingName(){
    return this.state.sameAsBilling ? this.state.billingName : this.state.shippingName
  },
  determineShippingState() {
    return this.state.sameAsBilling ? this.state.billingState: this.state.shippingState
  },
  updateShippingName(e) {
    if (!this.state.sameAsBilling){
        this.setState({
          shippingName: e.target.value
        })
    }
  },
  updateShippingState(e) {
    if (!this.state.sameAsBilling){
      this.setState({
        shippingState: e.target.value
      })
    }
  },
  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name:
                <input type="text" value={this.state.billingName}
                       onChange={(e) => this.setState({billingName: e.target.value})}
                  />
              </label>
            </p>
            <p>
              <label>Billing State:
                <input type="text" size="2" value={this.state.billingState}
                       onChange={(e) => this.setState({billingState: e.target.value})}
                    />
                {(this.state.billingState.length > 2) && (
                  <span style={{color: "red"}}>Warning, you should be using the 2 character abbreviation.</span>
                  )}
              </label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label>
              <input type="checkbox" checked={this.state.sameAsBilling}
                     onChange={(e) => this.setState({sameAsBilling: e.target.checked})}
                  />
              Same as billing
            </label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name:
                <input type="text" value={this.determineShippingName()}
                       onChange={this.updateShippingName}
                    />
              </label>
            </p>
            <p>
              <label>Shipping State:
                <input type="text" size="2" value={this.determineShippingState()}
                    onChange={this.updateShippingState}/>
                {(this.determineShippingState().length > 2) && (
                    <span style={{color: "red"}}>Warning, you should be using the 2 character abbreviation.</span>
                )}
              </label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
