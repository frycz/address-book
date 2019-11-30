import React from "react";
import { shallow } from "enzyme";
import { AddressBook, Props } from "./AddressBook";
import mockUsers from "../../../mocks/users.json";

const mockProps: Props = {
  users: mockUsers as Props['users'],
  maxPage: 20,
  isFetching: false,
  isError: false,
  countries: { ch: true, es: true, fr: false },
  currentPage: 1,
  getUsers: jest.fn(),
  displayPage: jest.fn()
};

describe("AddressBook", () => {
  it("should match smapshot", () => {
    const settings = shallow(<AddressBook {...mockProps} />);
    expect(settings.debug()).toMatchSnapshot();
  });
});
jest.fn();
