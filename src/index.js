import React, { Component } from "react";
import flatten, { unflatten } from "flat";
import validate from "validate.js";

const isEmpty = obj => Object.getOwnPropertyNames(obj).length === 0;

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { form: flatten(props.initialState), validations: {} };
  }

  onChange = key => event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const form = { ...this.state.form, [key]: value };
    const validations = { ...this.state.validations };
    delete validations[key];

    this.setState({ form, validations });
  };

  validate = () => {
    const form = this.getOriginalState();
    const validations = validate(form, this.props.validations) || {};
    this.setState({ validations });
    return isEmpty(validations);
  };

  getOriginalState = () => unflatten(this.state.form);

  errorsFor = key => this.state.validations[key] || [];

  render() {
    const { children } = this.props;
    return (
      <form>
        {children({
          onChange: this.onChange,
          state: this.getOriginalState(),
          errorsFor: this.errorsFor,
          errors: this.state.validations,
          validate: this.validate
        })}
      </form>
    );
  }
}
