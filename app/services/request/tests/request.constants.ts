import { CLIENT_ADDRESS } from "@/app/constants";

export const [VERCEL_HEADER, FORWARDED_HEADER] =
  CLIENT_ADDRESS.HEADER_NAMES;

export const IPV4_ADDRESS = "203.0.113.7";
export const OTHER_IPV4_ADDRESS = "198.51.100.9";
export const IPV6_ADDRESS = "2001:DB8::AbCd";
export const LOWERCASE_IPV6_ADDRESS = "2001:db8::abcd";
export const PADDED_ADDRESS = `  ${IPV4_ADDRESS}  `;
export const PROXY_CHAIN = `${IPV4_ADDRESS}, ${OTHER_IPV4_ADDRESS}`;
export const EMPTY_VALUE = "";
export const BLANK_VALUE = "   ";
export const EMPTY_FIRST_HOP = `, ${OTHER_IPV4_ADDRESS}`;

export const VALID_SECRET = "a".repeat(32);
export const OTHER_SECRET = "b".repeat(32);
export const SHORT_SECRET = "c".repeat(31);
export const PADDED_SHORT_SECRET = `  ${"d".repeat(31)}  `;
export const BLANK_SECRET = "   ";

export const NETWORK_KEY_PATTERN = /^[0-9a-f]{64}$/;
