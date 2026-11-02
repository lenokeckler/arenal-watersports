import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { resolveBoardGroupKey } from "../utils/resolveBoardGroupKey";
import { BOARD_GROUP_NAME } from "./EquipmentBoardUtils.constants";

describe("resolveBoardGroupKey", () => {
  it("returns null for a null group name", () => {
    expect(resolveBoardGroupKey(null)).toBeNull();
  });

  it("returns null for an empty group name", () => {
    expect(resolveBoardGroupKey(STRING.Empty)).toBeNull();
  });

  it("returns null for a blank group name", () => {
    expect(
      resolveBoardGroupKey(BOARD_GROUP_NAME.BLANK)
    ).toBeNull();
  });

  it("lower-cases a named group", () => {
    expect(
      resolveBoardGroupKey(BOARD_GROUP_NAME.KAYAK)
    ).toBe(BOARD_GROUP_NAME.KAYAK_LOWER);
  });
});
