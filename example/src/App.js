import React, { Component } from "react";

import BaseForm from "react-base-form";

export default class App extends Component {
  onSubmit = (validate, state) => event => {
    event.preventDefault();
    if (validate()) {
      // this.props.onSubmit(state)
      console.log(state);
    }
  };

  render() {
    return (
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
            {errorsFor("name").map(error => (
              <p key={error}>{error}</p>
            ))}
            <br />
            <input type="email" value={state.email} onChange={onChange("email")} />
            {errorsFor("email").map(error => (
              <p key={error}>{error}</p>
            ))}
            <br />
            <input
              type="date"
              value={state.extraInformation.dob}
              onChange={onChange("extraInformation.dob")}
            />
            {errorsFor("extraInformation.dob").map(error => (
              <p key={error}>{error}</p>
            ))}
            <br />
            <button onClick={this.onSubmit(validate, state)}>Save</button>
          </div>
        )}
      </BaseForm>
    );
  }
}
