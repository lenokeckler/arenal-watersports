import { expect, it } from "vitest";
import { parseInventoryCountQuantity } from "../utils/parseInventoryCountQuantity";

it.each([
  ["0", 0],
  ["12", 12],
  [" 7 ", 7],
  ["999999", 999999],
])("reads %j as %i", (text, expected) => {
  expect(parseInventoryCountQuantity(text)).toBe(expected);
});

it.each([
  [""],
  ["-1"],
  ["1.5"],
  ["abc"],
  ["1000000"],
  ["1e3"],
])("refuses %j", (text) => {
  expect(parseInventoryCountQuantity(text)).toBeNull();
});
