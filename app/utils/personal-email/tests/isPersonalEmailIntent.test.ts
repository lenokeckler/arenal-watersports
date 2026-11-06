import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_INTENT,
  STRING,
} from "@/app/constants";
import { isPersonalEmailIntent } from "../isPersonalEmailIntent";
import { UNKNOWN_INTENT } from "./personalEmail.constants";

describe("isPersonalEmailIntent", () => {
  it.each(Object.values(PERSONAL_EMAIL_INTENT))(
    "accepts %s",
    (intent) => {
      expect(isPersonalEmailIntent(intent)).toBe(true);
    }
  );

  it.each([UNKNOWN_INTENT, STRING.Empty])(
    "rejects %j",
    (value) => {
      expect(isPersonalEmailIntent(value)).toBe(false);
    }
  );
});
