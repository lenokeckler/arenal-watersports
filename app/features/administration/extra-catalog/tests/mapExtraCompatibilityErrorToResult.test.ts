import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { mapExtraCompatibilityErrorToResult } from "../utils/mapExtraCompatibilityErrorToResult";
import { buildPostgrestError } from "./buildPostgrestError";

describe("mapExtraCompatibilityErrorToResult", () => {
  it.each([
    [
      POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      EXTRA_COMPATIBILITY_COPY.FORBIDDEN_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.NO_DATA_FOUND,
      EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE,
      EXTRA_COMPATIBILITY_COPY.INVALID_INPUT_ERROR,
    ],
  ])("maps the code %s to its message", (code, message) => {
    expect(
      mapExtraCompatibilityErrorToResult(
        buildPostgrestError(code)
      )
    ).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message,
    });
  });

  it("returns null for an unexpected code and for no error", () => {
    expect(
      mapExtraCompatibilityErrorToResult(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.RAISE_EXCEPTION
        )
      )
    ).toBeNull();
    expect(
      mapExtraCompatibilityErrorToResult(null)
    ).toBeNull();
  });
});
