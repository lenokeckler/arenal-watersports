import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import {
  CATEGORY_CONFIGURE_SAVE_STATUS as STATUS,
  type CategoryConfigureSaveStatus,
} from "../constants/CategoryConfigureSaveStatus.constants";
import { resolveCategoryConfigureSaveMessage } from "../utils/resolveCategoryConfigureSaveMessage";

const { DIRTY_PLURAL, FAILED, FIX_FIELDS_SINGULAR, SAVED } =
  CATEGORY_CONFIGURE_SAVE_COPY;

const CASES: [
  CategoryConfigureSaveStatus,
  number,
  number,
  NullableRef<string>,
][] = [
  [STATUS.IDLE, LENGTH.ZERO, LENGTH.ZERO, null],
  [STATUS.SAVING, LENGTH.TWO, LENGTH.ZERO, null],
  [STATUS.FAILED, LENGTH.TWO, LENGTH.ZERO, FAILED],
  [
    STATUS.IDLE,
    LENGTH.TWO,
    LENGTH.ONE,
    FIX_FIELDS_SINGULAR,
  ],
  [
    STATUS.SAVED,
    LENGTH.TWO,
    LENGTH.ZERO,
    DIRTY_PLURAL(LENGTH.TWO),
  ],
  [STATUS.SAVED, LENGTH.ZERO, LENGTH.ZERO, SAVED],
];

describe("resolveCategoryConfigureSaveMessage", () => {
  it.each(CASES)(
    "resolves the message for status %s, %i changes and %i invalid fields",
    (status, changedCount, invalidFieldCount, expected) => {
      expect(
        resolveCategoryConfigureSaveMessage({
          status,
          changedCount,
          invalidFieldCount,
        })
      ).toBe(expected);
    }
  );
});
