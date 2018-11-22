import React from "react";
import Enzyme, { shallow } from "enzyme";
import BaseForm from "./";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("BaseForm", () => {
  it("renders a form with the initial values", () => {
    let form = shallow(
      <BaseForm initialState={{ name: "Gabriel Chertok" }}>
        {({ state }) => <input value={state.name} />}
      </BaseForm>
    );
    expect(
      form
        .find("input")
        .first()
        .getElement().props.value
    ).toEqual("Gabriel Chertok");
  });

  it("correctly changes the value", () => {
    let form = shallow(
      <BaseForm initialState={{ name: "Gabriel Chertok" }}>
        {({ state, onChange }) => <input value={state.name} onChange={onChange("name")} />}
      </BaseForm>
    );
    form
      .find("input")
      .first()
      .simulate("change", { target: { value: "Gabriel", type: "text" } });
    expect(
      form
        .find("input")
        .first()
        .getElement().props.value
    ).toEqual("Gabriel");
  });

  it("correctly changes nested values", () => {
    let form = shallow(
      <BaseForm initialState={{ person: { name: "Gabriel Chertok" } }}>
        {({ state, onChange }) => (
          <input value={state.person.name} onChange={onChange("person.name")} />
        )}
      </BaseForm>
    );
    form
      .find("input")
      .first()
      .simulate("change", { target: { value: "Gabriel", type: "text" } });
    expect(
      form
        .find("input")
        .first()
        .getElement().props.value
    ).toEqual("Gabriel");
  });
});
