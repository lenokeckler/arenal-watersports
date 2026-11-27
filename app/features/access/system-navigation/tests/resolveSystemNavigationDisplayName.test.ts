import { describe, expect, it } from "vitest";
import { resolveSystemNavigationDisplayName } from "../utils/resolveSystemNavigationDisplayName";

const ROLE = "Administración";
const USERNAME = "admin";

describe("resolveSystemNavigationDisplayName", () => {
  it("shows the full name when it says who the person is", () => {
    expect(
      resolveSystemNavigationDisplayName({
        fullName: "Ana Rojas",
        role: ROLE,
        username: USERNAME,
      })
    ).toBe("Ana Rojas");
  });

  it.each([ROLE, "", "   "])(
    "shows the username when the full name is %j",
    (fullName) => {
      expect(
        resolveSystemNavigationDisplayName({
          fullName,
          role: ROLE,
          username: USERNAME,
        })
      ).toBe(USERNAME);
    }
  );
});
