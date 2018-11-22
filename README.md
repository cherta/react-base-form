# React Base Form

> A base form component for React applications

[![NPM](https://img.shields.io/npm/v/react-base-form.svg)](https://www.npmjs.com/package/react-base-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-base-form validate.js flat
```

## Usage

```jsx
import React, { Component } from "react";
import BaseForm from "react-base-form";

const initialState = { name: "Hello", email: "", extraInformation: { dob: "" } };
const validations = {
  name: {
    presence: { allowEmpty: false }
  },
  "extraInformation.dob": { presence: { allowEmpty: false } }
};

class Example extends Component {
  render() {
    return (
      <BaseForm initialState={initialState} validations={validations}>
        {({ onChange, state, errorsFor, validate }) => (
          <div>
            <input value={state.name} onChange={onChange("name")} />
            {errorsFor("name") && errorsFor("name").map((error, i) => <p key={i}>{error}</p>)}
            <br />
            <input type="email" value={state.email} onChange={onChange("email")} />
            {errorsFor("email") && errorsFor("email").map((error, i) => <p key={i}>{error}</p>)}
            <br />
            <input
              type="date"
              value={state.extraInformation.dob}
              onChange={onChange("extraInformation.dob")}
            />
            {errorsFor("extraInformation.dob") &&
              errorsFor("extraInformation.dob").map((error, i) => <p key={i}>{error}</p>)}
            <br />
            <button onClick={this.onSubmit(validate, state)}>Save</button>
          </div>
        )}
      </BaseForm>
    );
  }
}
```

## License

MIT © [cherta](https://github.com/cherta)
