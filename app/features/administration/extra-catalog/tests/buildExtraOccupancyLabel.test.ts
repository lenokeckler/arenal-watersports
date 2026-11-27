import { describe, expect, it } from "vitest";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { buildExtraOccupancyLabel } from "../utils/buildExtraOccupancyLabel";
import {
  DEFAULT_EXTRA,
  FAKE_OCCUPIED_CATEGORY_NAME,
  FAKE_OCCUPIED_QUANTITY,
  OCCUPYING_EXTRA,
} from "./Extra.constants";

describe("buildExtraOccupancyLabel", () => {
  it("names the quantity and the category an extra occupies", () => {
    expect(buildExtraOccupancyLabel(OCCUPYING_EXTRA)).toBe(
      EXTRA_OCCUPANCY_COPY.OCCUPIES_LABEL(
        FAKE_OCCUPIED_QUANTITY,
        FAKE_OCCUPIED_CATEGORY_NAME
      )
    );
  });

  it("says charge only for an extra that occupies nothing", () => {
    expect(buildExtraOccupancyLabel(DEFAULT_EXTRA)).toBe(
      EXTRA_OCCUPANCY_COPY.CHARGE_ONLY_LABEL
    );
  });
});
