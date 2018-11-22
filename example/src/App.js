import React, { Component } from "react";

import BaseForm from "react-base-form";

export default class App extends Component {
  onSubmit = (validate, state) => event => {
    event.preventDefault();
    if (validate()) {
      // this.props.onSubmit(state)
    }
  };

  render() {
    return (
      <div>
        <BaseForm
          initialState={{ name: "Hello", email: "", extraInformation: { dob: "" } }}
          validations={{
            name: {
              presence: { allowEmpty: false }
            },
            "extraInformation.dob": { presence: { allowEmpty: false } }
          }}
        >
          {({ onChange, state, errorsFor, validate, errors }) => (
            <div>
              <input value={state.name} onChange={onChange("name")} />
              {errorsFor("name").map((error, i) => (
                <p key={i}>{error}</p>
              ))}
              <br />
              <input type="email" value={state.email} onChange={onChange("email")} />
              {errorsFor("email").map((error, i) => (
                <p key={i}>{error}</p>
              ))}
              <br />
              <input
                type="date"
                value={state.extraInformation.dob}
                onChange={onChange("extraInformation.dob")}
              />
              {errorsFor("extraInformation.dob").map((error, i) => (
                <p key={i}>{error}</p>
              ))}
              <br />
              <button onClick={this.onSubmit(validate, state)}>Save</button>
            </div>
          )}
        </BaseForm>
      </div>
    );
  }
}
