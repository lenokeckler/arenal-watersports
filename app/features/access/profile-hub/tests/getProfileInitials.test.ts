import { expect, it } from "vitest";
import { getProfileInitials } from "../utils/getProfileInitials";

it.each([
  ["Ana María Rojas", "AM"],
  ["  luis  ", "L"],
  ["", ""],
  ["jean-luc picard", "JP"],
])("turns %j into %j", (name, initials) => {
  expect(getProfileInitials(name)).toBe(initials);
});
