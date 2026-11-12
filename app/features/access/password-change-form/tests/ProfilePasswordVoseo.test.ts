import { describe, expect, it } from "vitest";
import { PROFILE_PASSWORD_ERROR_COPY } from "../constants/ProfilePasswordErrorCopy.constants";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import { VOSEO_WORDS_PATTERN } from "@/app/utils/copy/tests/ustedCopyPatterns";

describe("profile password copy voseo guard", () => {
  it.each([
    ...Object.entries(PROFILE_PASSWORD_ERROR_COPY),
    ...Object.entries(PROFILE_PASSWORD_FORM_COPY),
  ])("keeps %s free of voseo", (_key, text) => {
    expect(text).not.toMatch(VOSEO_WORDS_PATTERN);
  });

  it.each(["Escribí la clave", "Podés cambiarla", "vos"])(
    "detects the voseo in %s",
    (text) => {
      expect(text).toMatch(VOSEO_WORDS_PATTERN);
    }
  );
});
