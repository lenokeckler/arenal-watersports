import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import {
  PERSONAL_EMAIL_ERROR_COPY,
  PERSONAL_EMAIL_REQUIRED_COPY,
} from "../constants/PersonalEmailErrorCopy.constants";
import { resolvePersonalEmailErrorCopy } from "../utils/resolvePersonalEmailErrorCopy";
import {
  ADMINISTRATION_OPTIONS,
  REQUIRED_COPY_CASES,
  UNREGISTERED_OPTIONS,
} from "./resolvePersonalEmailErrorCopy.constants";

describe("resolvePersonalEmailErrorCopy", () => {
  it.each(REQUIRED_COPY_CASES)(
    "words the empty save as %s",
    (_name, options, expected) => {
      expect(
        resolvePersonalEmailErrorCopy(options)[
          PERSONAL_EMAIL_ERROR_CODE.EMAIL_REQUIRED
        ]
      ).toBe(expected);
    }
  );

  it("words a refused removal with the administration text", () => {
    expect(
      resolvePersonalEmailErrorCopy(ADMINISTRATION_OPTIONS)[
        PERSONAL_EMAIL_ERROR_CODE
          .ADMINISTRATION_EMAIL_REQUIRED
      ]
    ).toBe(PERSONAL_EMAIL_REQUIRED_COPY.ADMINISTRATION);
  });

  it("leaves every other code with its base text", () => {
    expect(
      resolvePersonalEmailErrorCopy(UNREGISTERED_OPTIONS)
    ).toEqual(PERSONAL_EMAIL_ERROR_COPY);
  });
});
