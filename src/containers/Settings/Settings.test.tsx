import React from "react";
import { shallow } from "enzyme";
import { Settings, Props } from "./Settings";

const mockProps: Props = {
  initialCountries: { ch: true, es: true, fr: false },
  updateSettings: jest.fn()
};

describe("Settings", () => {
  const settings = shallow(<Settings {...mockProps} />);

  it("should match smapshot", () => {
    expect(settings.debug()).toMatchSnapshot();
  });

  it("should render countries checkboxes", () => {
    expect(settings.find('input[type="checkbox"]')).toHaveLength(3);
  });

  it("should check ch", () => {
    expect(settings.find('#settings-ch').props().checked).toEqual(true);
  });

  it("should render check es", () => {
    expect(settings.find('#settings-es').props().checked).toEqual(true);
  });

  it("should not check fr", () => {
    expect(settings.find('#settings-fr').props().checked).toEqual(false);
  });
});
