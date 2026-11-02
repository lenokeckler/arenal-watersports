import { PostgrestError } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_DATABASE_MESSAGE } from "../constants/UnitDatabaseMessage.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";

const buildError = (
  code: string,
  message = "boom"
): PostgrestError =>
  new PostgrestError({
    code,
    details: "",
    hint: "",
    message,
  });

describe("mapUnitWriteErrorToResult", () => {
  it.each([
    {
      code: POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
      expected: {
        codeError: UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
      message: UNIT_DATABASE_MESSAGE.CATEGORY_NOT_BY_UNIT,
      expected: {
        message:
          UNIT_CATALOG_COPY.CATEGORY_NOT_BY_UNIT_ERROR,
      },
    },
    {
      code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
      message: UNIT_DATABASE_MESSAGE.UNIT_OCCUPIED,
      expected: {
        message: UNIT_CATALOG_COPY.UNIT_OCCUPIED_ERROR,
      },
    },
  ])(
    "maps the $code error to a friendly result",
    ({ code, message, expected }) => {
      expect(
        mapUnitWriteErrorToResult(buildError(code, message))
      ).toEqual({
        status: UNIT_MUTATION_STATUS.ERROR,
        ...expected,
      });
    }
  );

  it("returns null for a missing error and for any other error", () => {
    expect(mapUnitWriteErrorToResult(null)).toBeNull();
    expect(
      mapUnitWriteErrorToResult(
        buildError(POSTGRES_ERROR_CODE.CHECK_VIOLATION)
      )
    ).toBeNull();
  });

  it("does not claim a different P0001 error is about the category mode", () => {
    expect(
      mapUnitWriteErrorToResult(
        buildError(POSTGRES_ERROR_CODE.RAISE_EXCEPTION)
      )
    ).toBeNull();
  });
});
