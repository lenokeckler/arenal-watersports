import { describe, expect, it } from "vitest";
import { getInitialTakeCount } from "../utils/getInitialTakeCount";
import { isTakeAdjustable } from "../utils/isTakeAdjustable";
import { parseRadioChannel } from "../utils/parseRadioChannel";
import {
  ASSIGNED_GROUP_FIXTURE,
  DISPATCH_FIXTURE_COUNT,
  QUANTITY_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const RADIO_TEXT = {
  ABOVE: "100",
  BLANK: "   ",
  CHANNEL: " 7 ",
  LETTERS: "7a",
  ZERO: "0",
} as const;
const RADIO_CHANNEL = 7;
const NOTHING_TAPPED = 0;
const MORE_THAN_PENDING = 5;

describe("parseRadioChannel", () => {
  it("reads a channel from the text, ignoring the spaces", () => {
    expect(parseRadioChannel(RADIO_TEXT.CHANNEL)).toBe(
      RADIO_CHANNEL
    );
  });

  it.each([
    RADIO_TEXT.ZERO,
    RADIO_TEXT.ABOVE,
    RADIO_TEXT.LETTERS,
    RADIO_TEXT.BLANK,
  ])("reads %j as no channel", (text) => {
    expect(parseRadioChannel(text)).toBeNull();
  });
});

describe("getInitialTakeCount", () => {
  it("takes every pending unit when nothing was tapped on the board", () => {
    expect(
      getInitialTakeCount(
        UNIT_GROUP_FIXTURE,
        NOTHING_TAPPED
      )
    ).toBe(DISPATCH_FIXTURE_COUNT.TWO);
  });

  it("takes only the units tapped on the board", () => {
    expect(
      getInitialTakeCount(
        UNIT_GROUP_FIXTURE,
        DISPATCH_FIXTURE_COUNT.ONE
      )
    ).toBe(DISPATCH_FIXTURE_COUNT.ONE);
  });

  it("never takes more units than are pending", () => {
    expect(
      getInitialTakeCount(
        UNIT_GROUP_FIXTURE,
        MORE_THAN_PENDING
      )
    ).toBe(DISPATCH_FIXTURE_COUNT.TWO);
  });
});

describe("isTakeAdjustable", () => {
  it("lets the worker choose how many leave when several units are pending", () => {
    expect(isTakeAdjustable(UNIT_GROUP_FIXTURE)).toBe(true);
  });

  it("does not when a single unit is pending", () => {
    expect(
      isTakeAdjustable({
        ...UNIT_GROUP_FIXTURE,
        requiredQuantity: DISPATCH_FIXTURE_COUNT.ONE,
      })
    ).toBe(false);
  });

  it("does not when the units are already assigned to the reservation", () => {
    expect(isTakeAdjustable(ASSIGNED_GROUP_FIXTURE)).toBe(
      false
    );
  });

  it("does not for a category counted by quantity", () => {
    expect(isTakeAdjustable(QUANTITY_GROUP_FIXTURE)).toBe(
      false
    );
  });
});
