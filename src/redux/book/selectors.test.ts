import { getDisplayedPage, getLoadedPage } from "./selectors";
import state from "../../../mocks/state";

describe("Redux utils", () => {
  it("should return current page", () => {
    expect(getDisplayedPage(state)).toEqual(1);
  });

  it("should return loaded page number", () => {
    expect(getLoadedPage(state)).toEqual(3);
  });
});
