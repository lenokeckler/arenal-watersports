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

export const MINIMUM_SECRET_LENGTH = 32;
export const SECRET_BELOW_MINIMUM = "k".repeat(
  MINIMUM_SECRET_LENGTH - 1
);
export const SECRET_AT_MINIMUM = "k".repeat(
  MINIMUM_SECRET_LENGTH
);
export const SECRET_ABOVE_MINIMUM = "k".repeat(
  MINIMUM_SECRET_LENGTH + 1
);
export const SECRET_WITH_INNER_SPACES = `${"s".repeat(15)} ${"s".repeat(15)} ${"s".repeat(14)}`;
export const SECRET_WITH_INNER_SPACES_SHORT = `${"s".repeat(15)} ${"s".repeat(15)}`;
export const SECRET_PADDING = "  ";
export const SECRET_PADDING_TAB_NEWLINE = "\t\n ";
export const SHORT_AFTER_TRIM = `  ${"k".repeat(MINIMUM_SECRET_LENGTH - 1)}  `;
export const SHORT_WITH_LEADING_SPACES = `${" ".repeat(MINIMUM_SECRET_LENGTH)}x`;

export const HMAC_ALGORITHM = "sha256";
export const HMAC_ENCODING = "hex";
export const SWAP_ADDRESS = "b".repeat(32);
export const SWAP_SECRET = "203.0.113.7".padEnd(32, "z");

export const PROPERTY_ADDRESSES: ReadonlyArray<
  string | null
> = [
  null,
  "",
  " ",
  "0.0.0.0",
  "255.255.255.255",
  "1.2.3.4:5678",
  "::1",
  "[2001:db8::1]:443",
  "fe80::1%eth0",
  "é中\u{1f600}",
  "a".repeat(10000),
  "\u0000",
  "x,y,z",
];

export const PROPERTY_SECRETS: ReadonlyArray<string> = [
  "a".repeat(32),
  "b".repeat(33),
  "c".repeat(512),
  `${"d".repeat(15)} ${"d".repeat(16)}`,
  "é".repeat(32),
  "\u{1f600}".repeat(32),
  "0123456789abcdef0123456789ABCDEF",
];

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
