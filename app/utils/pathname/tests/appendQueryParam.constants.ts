export const APPEND_CASES = [
  [
    "/profile",
    "notice",
    "password-changed",
    "/profile?notice=password-changed",
  ],
  [
    "/access/login",
    "reason",
    "blocked-attempts",
    "/access/login?reason=blocked-attempts",
  ],
  [
    "/profile",
    "notice",
    "a b&c=d",
    "/profile?notice=a+b%26c%3Dd",
  ],
  [
    "/profile",
    "notice",
    "<script>",
    "/profile?notice=%3Cscript%3E",
  ],
  ["/profile", "notice", "", "/profile?notice="],
] as const;

export const EDGE_CASES = [
  ["/profile#top", "/profile#top?notice=done"],
  ["/profile?tab=1", "/profile?tab=1?notice=done"],
] as const;
