import { describe, expect, it } from "vitest";
import { buildSystemNavigationInitials } from "../utils/buildSystemNavigationInitials";

describe("buildSystemNavigationInitials", () => {
  it.each([
    ["Ana Rojas", "AR"],
    ["ana maría rojas", "AM"],
    ["  admin  ", "A"],
    ["", ""],
  ])("turns %j into %j", (fullName, initials) => {
    expect(buildSystemNavigationInitials(fullName)).toBe(
      initials
    );
  });
});
