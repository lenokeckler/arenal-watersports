import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_ERROR_CODE,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { findPersonalEmailRemovalError } from "../findPersonalEmailRemovalError";
import {
  REMOVAL,
  REPLACEMENT,
} from "./ownPersonalEmail.constants";

describe("findPersonalEmailRemovalError", () => {
  it.each([
    SUPABASE_WORK_AREA.OPERATIONS,
    SUPABASE_WORK_AREA.RESERVATIONS,
  ])(
    "finds nothing when the %s area removes its address",
    (area) => {
      expect(
        findPersonalEmailRemovalError(REMOVAL, area)
      ).toBeNull();
    }
  );

  it("finds the administration requirement when the administration area removes its address", () => {
    expect(
      findPersonalEmailRemovalError(
        REMOVAL,
        SUPABASE_WORK_AREA.ADMINISTRATION
      )
    ).toEqual(
      createPersonalEmailError(
        PERSONAL_EMAIL_ERROR_CODE.ADMINISTRATION_EMAIL_REQUIRED
      )
    );
  });

  it("finds nothing when the administration area replaces its address", () => {
    expect(
      findPersonalEmailRemovalError(
        REPLACEMENT,
        SUPABASE_WORK_AREA.ADMINISTRATION
      )
    ).toBeNull();
  });
});
