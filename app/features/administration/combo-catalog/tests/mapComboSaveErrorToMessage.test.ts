import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { mapComboSaveErrorToMessage } from "../utils/mapComboSaveErrorToMessage";
import { buildPostgrestError } from "./buildPostgrestError";

describe("mapComboSaveErrorToMessage", () => {
  it.each([
    [
      POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      COMBO_CATALOG_COPY.FORBIDDEN_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE,
      COMBO_FORM_COPY.SOLD_COMBO_LOCKED_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.NO_DATA_FOUND,
      COMBO_FORM_COPY.NOT_FOUND_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
      COMBO_FORM_COPY.NAME_DUPLICATE_ERROR,
    ],
  ])("maps %s to its message", (code, message) => {
    expect(
      mapComboSaveErrorToMessage(buildPostgrestError(code))
    ).toBe(message);
  });

  it("shows the database message of an invalid parameter", () => {
    const error = buildPostgrestError(
      POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE
    );

    expect(mapComboSaveErrorToMessage(error)).toBe(
      error.message
    );
  });

  it("leaves other errors and no error unmapped", () => {
    expect(
      mapComboSaveErrorToMessage(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.RAISE_EXCEPTION
        )
      )
    ).toBeNull();
    expect(mapComboSaveErrorToMessage(null)).toBeNull();
  });
});
