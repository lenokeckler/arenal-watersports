import { describe, expect, it } from "vitest";
import { toAuthEmail } from "../toAuthEmail";
import {
  SEEDED_AUTH_EMAIL,
  SEEDED_USERNAME,
  UNNORMALIZED_SEEDED_USERNAME,
} from "./toAuthEmail.constants";

describe("toAuthEmail", () => {
  it("maps a username to its auth email", () => {
    expect(toAuthEmail(SEEDED_USERNAME)).toBe(
      SEEDED_AUTH_EMAIL
    );
  });

  it("normalizes the username before mapping", () => {
    expect(toAuthEmail(UNNORMALIZED_SEEDED_USERNAME)).toBe(
      SEEDED_AUTH_EMAIL
    );
  });
});
