import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { mapExtraWriteErrorToResult } from "../utils/mapExtraWriteErrorToResult";
import { buildPostgrestError } from "./buildPostgrestError";

describe("mapExtraWriteErrorToResult", () => {
  it.each([
    {
      code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
      expected: {
        nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      expected: {
        message: EXTRA_CATALOG_COPY.FORBIDDEN_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.NO_DATA_FOUND,
      expected: {
        message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
      expected: {
        message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
      },
    },
  ])(
    "maps the $code error to a friendly result",
    ({ code, expected }) => {
      expect(
        mapExtraWriteErrorToResult(
          buildPostgrestError(code)
        )
      ).toEqual({
        status: EXTRA_MUTATION_STATUS.ERROR,
        ...expected,
      });
    }
  );

  it("returns null for a missing error and for any other error", () => {
    expect(mapExtraWriteErrorToResult(null)).toBeNull();
    expect(
      mapExtraWriteErrorToResult(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.CHECK_VIOLATION
        )
      )
    ).toBeNull();
  });
});
