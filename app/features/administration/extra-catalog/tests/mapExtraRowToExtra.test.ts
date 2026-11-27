import { describe, expect, it } from "vitest";
import { mapExtraRowToExtra } from "../utils/mapExtraRowToExtra";
import {
  DEFAULT_EXTRA,
  DEFAULT_EXTRA_ROW,
  OCCUPYING_EXTRA,
  OCCUPYING_EXTRA_ROW,
} from "./Extra.constants";

describe("mapExtraRowToExtra", () => {
  it("maps the row columns to the extra fields", () => {
    expect(mapExtraRowToExtra(DEFAULT_EXTRA_ROW)).toEqual(
      DEFAULT_EXTRA
    );
  });

  it("maps the occupied category, its name and the quantity", () => {
    expect(mapExtraRowToExtra(OCCUPYING_EXTRA_ROW)).toEqual(
      OCCUPYING_EXTRA
    );
  });
});
