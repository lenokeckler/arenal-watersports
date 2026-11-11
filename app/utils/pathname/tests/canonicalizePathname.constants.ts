export const CANONICAL_CASES = [
  ["/", "/"],
  ["//", "/"],
  ["///", "/"],
  ["/board", "/board"],
  ["/board/", "/board"],
  ["/board//", "/board"],
  ["//board", "/board"],
  ["/access//first-sign-in", "/access/first-sign-in"],
  ["/access/first-sign-in/", "/access/first-sign-in"],
  ["/Access/First-Sign-In", "/Access/First-Sign-In"],
] as const;
