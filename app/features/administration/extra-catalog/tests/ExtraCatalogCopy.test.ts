import { describe, expect, it } from "vitest";
import { STRING, TYPE_OF } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import {
  EXTRA_FORM_SUBMIT_LABEL,
  EXTRA_FORM_SUCCESS_TOAST,
  EXTRA_FORM_TITLE,
} from "../constants/ExtraFormModeCopy.constants";
import { EXTRA_COMPATIBILITY_UNIT_STATUS_COPY } from "../constants/ExtraCompatibilityUnitStatusCopy.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import { EXTRA_REMOVAL_OUTCOME_COPY } from "../constants/ExtraRemovalOutcomeCopy.constants";
import { NON_USTED_WORDS_PATTERN } from "./Extra.constants";

describe("extra catalog copy", () => {
  it.each([
    ...Object.entries(EXTRA_CATALOG_COPY),
    ...Object.entries(EXTRA_OCCUPANCY_COPY).filter(
      ([, text]) => typeof text === TYPE_OF.STRING
    ),
    ...Object.entries(EXTRA_COMPATIBILITY_COPY).filter(
      ([, text]) => typeof text === TYPE_OF.STRING
    ),
    ...Object.entries(EXTRA_COMPATIBILITY_UNIT_STATUS_COPY),
    ...Object.entries(EXTRA_REMOVAL_OUTCOME_COPY),
    ...Object.entries(EXTRA_FORM_TITLE),
    ...Object.entries(EXTRA_FORM_SUBMIT_LABEL),
    ...Object.entries(EXTRA_FORM_SUCCESS_TOAST),
    ...Object.values(EXTRA_PRICE_ERROR_COPY).flatMap(
      Object.entries
    ),
  ])("has non-empty usted copy for %s", (_key, text) => {
    expect(text).not.toBe(STRING.Empty);
    expect(text).not.toMatch(NON_USTED_WORDS_PATTERN);
  });
});
