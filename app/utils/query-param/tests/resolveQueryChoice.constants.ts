import type { NullableUndefined } from "@/app/types";

export const CHOICES = ["alpha", "beta"] as const;

export const MEMBER_CASES = [
  ["alpha", "alpha"],
  ["beta", "beta"],
] as const;

export const NON_MEMBER_VALUES: readonly NullableUndefined<
  string | string[]
>[] = [
  undefined,
  "",
  "gamma",
  "ALPHA",
  " alpha",
  "<script>",
  ["alpha"],
  ["alpha", "beta"],
  [],
];

export const PROTOTYPE_KEYS = [
  "__proto__",
  "constructor",
  "toString",
  "hasOwnProperty",
] as const;

export const EMPTY_CHOICES: readonly string[] = [];
export const MEMBER_VALUE = "alpha";
