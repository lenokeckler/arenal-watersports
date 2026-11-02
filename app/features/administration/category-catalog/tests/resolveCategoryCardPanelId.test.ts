import { describe, expect, it } from "vitest";
import { resolveCategoryCardPanelId } from "../utils/resolveCategoryCardPanelId";

describe("resolveCategoryCardPanelId", () => {
  it("builds a different id for every category", () => {
    expect(resolveCategoryCardPanelId("first")).not.toBe(
      resolveCategoryCardPanelId("second")
    );
  });

  it("ends with the category id", () => {
    expect(resolveCategoryCardPanelId("first")).toMatch(
      /first$/
    );
  });
});
