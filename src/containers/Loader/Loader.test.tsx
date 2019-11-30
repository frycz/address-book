import React from "react";
import { shallow } from "enzyme";
import { Loader } from "./Loader";

describe("Loader", () => {
  it("should match smapshot", () => {
    const loader = shallow(<Loader />);
    expect(loader.debug()).toMatchSnapshot();
  });
});
