import { PostgrestError } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";

const buildError = (code: string): PostgrestError =>
  new PostgrestError({
    code,
    details: "",
    hint: "",
    message: "boom",
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
      expected: {
        message:
          UNIT_CATALOG_COPY.CATEGORY_NOT_BY_UNIT_ERROR,
      },
    },
  ])(
    "maps the $code error to a friendly result",
    ({ code, expected }) => {
      expect(
        mapUnitWriteErrorToResult(buildError(code))
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
});
