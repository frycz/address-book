import React from "react";
import { shallow } from "enzyme";
import { AddressBook, Props } from "./AddressBook";
import mockUsers from "../../../mocks/users.json";

const mockPropsDefault: Props = {
  users: mockUsers as Props["users"],
  maxPage: 20,
  isFetching: false,
  isError: false,
  countries: { ch: true, es: true, fr: false },
  currentPage: 1,
  getUsers: jest.fn(),
  displayPage: jest.fn()
};

describe("AddressBook", () => {
  const addressBookDefault = shallow(<AddressBook {...mockPropsDefault} />);
  const addressBookTwoPages = shallow(
    <AddressBook {...{ ...mockPropsDefault, currentPage: 2 }} />
  );
  const addressBookMaxPage = shallow(
    <AddressBook {...{ ...mockPropsDefault, maxPage: 1 }} />
  );
  const addressBookAllPages = shallow(
    <AddressBook {...{ ...mockPropsDefault, currentPage: 3, maxPage: 3 }} />
  );
  const addressBookFetching = shallow(
    <AddressBook {...{ ...mockPropsDefault, isFetching: true }} />
  );

  it("should match smapshot", () => {
    expect(addressBookDefault.debug()).toMatchSnapshot();
  });

  it("should display first page", () => {
    expect(
      addressBookDefault.find(".address-book__table > tbody > tr")
    ).toHaveLength(2);
    expect(
      addressBookMaxPage.find(".address-book__table > tbody > tr")
    ).toHaveLength(2);
  });

  it("should display user details", () => {
    addressBookDefault
      .find(".address-book__table > tbody > tr")
      .first()
      .simulate("click");
    expect(addressBookDefault.exists(".address-book__details-modal")).toEqual(
      true
    );
  });

  it("should display two pages", () => {
    expect(
      addressBookTwoPages.find(".address-book__table > tbody > tr")
    ).toHaveLength(4);
  });

  it("should display end of catalogue message", () => {
    expect(addressBookAllPages.find(".address-book__message").text()).toEqual(
      "End of user catalogue"
    );
  });

  it("should display end of catalogue message", () => {
    expect(addressBookAllPages.find(".address-book__message").text()).toEqual(
      "End of user catalogue"
    );
  });

  it("should display search results", () => {
    addressBookAllPages
      .find(".address-book__search")
      .simulate("change", { target: { value: "an" } });
    expect(
      addressBookAllPages.find(".address-book__table > tbody > tr")
    ).toHaveLength(2);

    addressBookAllPages
      .find(".address-book__search")
      .simulate("change", { target: { value: "bo" } });
    expect(
      addressBookAllPages.find(".address-book__table > tbody > tr")
    ).toHaveLength(1);

    addressBookAllPages
      .find(".address-book__search")
      .simulate("change", { target: { value: "bob obr" } });
    expect(
      addressBookAllPages.find(".address-book__table > tbody > tr")
    ).toHaveLength(1);

    addressBookAllPages
      .find(".address-book__search")
      .simulate("change", { target: { value: "xyz" } });
    expect(
      addressBookAllPages.find(".address-book__table > tbody > tr")
    ).toHaveLength(0);
  });

  it("should display loading message message", () => {
    expect(addressBookFetching.find(".address-book__message").text()).toEqual(
      "Loading..."
    );
    expect(addressBookDefault.find(".address-book__message").text()).toEqual(
      "Loading..."
    );
  });
});
