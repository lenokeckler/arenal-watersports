import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { mapTariffSaveErrorToMessage } from "../utils/mapTariffSaveErrorToMessage";
import { buildPostgrestError } from "./buildPostgrestError";

describe("mapTariffSaveErrorToMessage", () => {
  it.each([
    [
      POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      TARIFF_FORM_COPY.FORBIDDEN_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE,
      TARIFF_FORM_COPY.REMOVE_TARIFF_ERROR,
    ],
  ])("maps %s to its message", (code, message) => {
    expect(
      mapTariffSaveErrorToMessage(buildPostgrestError(code))
    ).toBe(message);
  });

  it("shows the database message of an invalid parameter", () => {
    const error = buildPostgrestError(
      POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE
    );

    expect(mapTariffSaveErrorToMessage(error)).toBe(
      error.message
    );
  });

  it("leaves other errors and no error unmapped", () => {
    expect(
      mapTariffSaveErrorToMessage(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.RAISE_EXCEPTION
        )
      )
    ).toBeNull();
    expect(mapTariffSaveErrorToMessage(null)).toBeNull();
  });
});
