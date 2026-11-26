import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import { mapComboWriteErrorToMessage } from "../utils/mapComboWriteErrorToMessage";
import { buildPostgrestError } from "./buildPostgrestError";

describe("mapComboWriteErrorToMessage", () => {
  it("maps insufficient privilege to the forbidden message", () => {
    expect(
      mapComboWriteErrorToMessage(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
        )
      )
    ).toBe(COMBO_CATALOG_COPY.FORBIDDEN_ERROR);
  });

  it.each([
    POSTGRES_ERROR_CODE.NO_DATA_FOUND,
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
  ])("maps %s to the not found message", (code) => {
    expect(
      mapComboWriteErrorToMessage(buildPostgrestError(code))
    ).toBe(COMBO_CATALOG_COPY.NOT_FOUND_ERROR);
  });

  it("leaves other errors and no error unmapped", () => {
    expect(
      mapComboWriteErrorToMessage(
        buildPostgrestError(
          POSTGRES_ERROR_CODE.RAISE_EXCEPTION
        )
      )
    ).toBeNull();
    expect(mapComboWriteErrorToMessage(null)).toBeNull();
  });
});
