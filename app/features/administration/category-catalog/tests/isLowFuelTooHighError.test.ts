import { PostgrestError } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  POSTGRES_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { LOW_FUEL_LINES_DATABASE_ERROR } from "../constants/CategoryBehaviorValidation.constants";
import { isLowFuelTooHighError } from "../utils/isLowFuelTooHighError";

const OPERATION = "isLowFuelTooHighError";
const OTHER_MESSAGE = "boom";

const buildQueryError = (
  message: string
): SupabaseQueryError =>
  new SupabaseQueryError(
    OPERATION,
    new PostgrestError({
      code: POSTGRES_ERROR_CODE.CHECK_VIOLATION,
      details: STRING.Empty,
      hint: STRING.Empty,
      message,
    })
  );

describe("isLowFuelTooHighError", () => {
  it.each([
    {
      description: "the low fuel database error",
      error: buildQueryError(
        LOW_FUEL_LINES_DATABASE_ERROR.TOO_HIGH_MESSAGE
      ),
      expected: true,
    },
    {
      description: "another database error",
      error: buildQueryError(OTHER_MESSAGE),
      expected: false,
    },
    {
      description: "an error that is not a query error",
      error: new Error(OTHER_MESSAGE),
      expected: false,
    },
  ])(
    "answers $expected for $description",
    ({ error, expected }) => {
      expect(isLowFuelTooHighError(error)).toBe(expected);
    }
  );
});
