import { DISPATCH_BOARD_PAGINATION } from "../constants/DispatchBoard.constants";
import { getDispatchPage } from "../utils/getDispatchPage";

describe("getDispatchPage", () => {
  it("accepts a positive integer page", () => {
    expect(getDispatchPage("3")).toBe(3);
  });

  it("uses the first page for invalid query values", () => {
    expect(getDispatchPage("0")).toBe(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE
    );
    expect(getDispatchPage("invalid")).toBe(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE
    );
    expect(getDispatchPage("2e1")).toBe(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE
    );
    expect(getDispatchPage(["2", "3"])).toBe(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE
    );
  });
});
