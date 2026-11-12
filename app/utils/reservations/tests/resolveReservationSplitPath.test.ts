import { describe, expect, it } from "vitest";
import { resolveReservationSplitPath } from "../resolveReservationSplitPath";
import {
  EXPECTED_SPLIT_PATH,
  FAKE_RESERVATION_ID,
} from "./resolveReservationSplitPath.constants";

describe("resolveReservationSplitPath", () => {
  it("builds the split path of one reservation", () => {
    expect(
      resolveReservationSplitPath(FAKE_RESERVATION_ID)
    ).toBe(EXPECTED_SPLIT_PATH);
  });
});
