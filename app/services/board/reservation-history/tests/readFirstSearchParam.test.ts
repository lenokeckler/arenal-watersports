import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { readFirstSearchParam } from "../utils/readFirstSearchParam";
import {
  HISTORY_REPEATED_PARAMETERS,
  HISTORY_VALID_DATE,
} from "./ReservationHistoryQuery.constants";

describe("readFirstSearchParam", () => {
  it("returns a single value untouched", () => {
    expect(readFirstSearchParam(HISTORY_VALID_DATE)).toBe(
      HISTORY_VALID_DATE
    );
  });

  it("takes the first value of a repeated param", () => {
    expect(
      readFirstSearchParam([...HISTORY_REPEATED_PARAMETERS])
    ).toBe(HISTORY_REPEATED_PARAMETERS[LENGTH.ZERO]);
  });

  it("returns undefined for an absent param", () => {
    expect(readFirstSearchParam(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty list", () => {
    expect(readFirstSearchParam([])).toBeUndefined();
  });
});
