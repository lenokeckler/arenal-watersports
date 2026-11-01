import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import { resolveWrittenAddress } from "../resolveWrittenAddress";
import {
  PASSWORD,
  VALID_ADDRESS,
} from "./personalEmail.constants";

describe("resolveWrittenAddress", () => {
  it("writes the address when saving", () => {
    expect(
      resolveWrittenAddress({
        address: VALID_ADDRESS,
        currentPassword: PASSWORD,
        intent: PERSONAL_EMAIL_INTENT.SAVE,
      })
    ).toBe(VALID_ADDRESS);
  });

  it("writes nothing when removing", () => {
    expect(
      resolveWrittenAddress({
        currentPassword: PASSWORD,
        intent: PERSONAL_EMAIL_INTENT.REMOVE,
      })
    ).toBeNull();
  });
});
