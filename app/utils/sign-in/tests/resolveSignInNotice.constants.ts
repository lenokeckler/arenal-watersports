export const UNSUPPORTED_REASONS = [
  "",
  "INACTIVE",
  " inactive",
  "inactive ",
  "__proto__",
  "constructor",
  "toString",
  "<script>alert(1)</script>",
  "something-else",
  "%69nactive",
  "inactive\n",
  "inactive\u0000",
  "inactive,inactive",
];

export const UNSUPPORTED_REASON_LISTS: string[][] = [
  [],
  ["", "inactive"],
  ["other", "inactive"],
  ["inactive", "other"],
];
