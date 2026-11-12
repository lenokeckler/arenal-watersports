import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { normalizePersonalEmail } from "../normalizePersonalEmail";
import { VALID_ADDRESS } from "./personalEmail.constants";

describe("normalizePersonalEmail", () => {
  it("trims and lowercases the text", () => {
    expect(
      normalizePersonalEmail(
        `${STRING.SPACE}${VALID_ADDRESS.toUpperCase()}${STRING.SPACE}`
      )
    ).toBe(VALID_ADDRESS);
  });

  it("turns a blank text into an empty one", () => {
    expect(normalizePersonalEmail(STRING.SPACE)).toBe(
      STRING.Empty
    );
  });
});
