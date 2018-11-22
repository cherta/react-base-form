import React, { Component } from "react";
import set from "lodash.set";
import get from "lodash.get";
import validate from "validate.js";

const isEmpty = obj => Object.getOwnPropertyNames(obj).length === 0;

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { form: props.initialState, validations: {} };
  }

  onChange = key => event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    let form = { ...this.state.form };
    form = set(form, key, value);

    const validations = { ...this.state.validations };
    delete validations[key];

    this.setState({ form, validations });
  };

  validate = () => {
    const validations = validate(this.state.form, this.props.validations) || {};
    this.setState({ validations });
    return isEmpty(validations);
  };

  errorsFor = key => get(this.state.validations, key) || [];

  render() {
    const { children } = this.props;
    return (
      <form>
        {children({
          onChange: this.onChange,
          state: this.state.form,
          errorsFor: this.errorsFor,
          errors: this.state.validations,
          validate: this.validate
        })}
      </form>
    );
  }
}
