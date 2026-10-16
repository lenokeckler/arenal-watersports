export const IPV4_WITH_PORT = "1.2.3.4:5678";
export const IPV4_WITHOUT_PORT = "1.2.3.4";
export const BRACKETED_IPV6_WITH_PORT = "[2001:DB8::1]:443";
export const BRACKETED_IPV6 = "[2001:DB8::1]";
export const MIXED_CASE_IPV6 = "FE80::AbCd:0F1E";
export const MIXED_CASE_IPV6_PREFIX = "fe80:0:0:0::";
export const BRACKETED_IPV6_PREFIX = "2001:db8:0:0::";
export const HOP_COUNT = 50;
export const HOP_PREFIX = "10.0.0.";
export const FIRST_OF_MANY_HOPS = "9.9.9.9";
export const SPACES_ONLY_HEADER = " ".repeat(40);
export const TAB_ONLY_HEADER = "\t\t";
export const UNICODE_ADDRESS_UPPER = "ÉÀÜ";
export const DOTTED_CAPITAL_I = "İ";
export const WIDE_UNICODE_ADDRESS = "中文";
export const EMOJI_ADDRESS = "\u{1f600}";

export const ZONED_MAPPED_IPV6 = "::ffff:203.0.113.7%eth0";
export const MAPPED_IPV4_RESULT = "203.0.113.7";
export const BRACKETED_ZONED_IPV6 = "[fe80::1%eth0]:80";
export const BRACKETED_ZONED_IPV6_PREFIX = "fe80:0:0:0::";
export const UNTRUSTED_VERCEL_VALUES = [
  "0",
  "true",
  "",
  " 1",
  "1 ",
  "2",
  "TRUE",
] as const;
