import { CLIENT_ADDRESS } from "@/app/constants";

export const [VERCEL_HEADER, FORWARDED_HEADER] =
  CLIENT_ADDRESS.HEADER_NAMES;

export const IPV4_ADDRESS = "203.0.113.7";
export const OTHER_IPV4_ADDRESS = "198.51.100.9";
export const IPV6_ADDRESS = "2001:DB8::AbCd";
export const IPV6_PREFIX = "2001:db8:0:0::";
export const PADDED_ADDRESS = `  ${IPV4_ADDRESS}  `;
export const PROXY_CHAIN = `${IPV4_ADDRESS}, ${OTHER_IPV4_ADDRESS}`;
export const EMPTY_VALUE = "";
export const BLANK_VALUE = "   ";
export const EMPTY_FIRST_HOP = `, ${OTHER_IPV4_ADDRESS}`;

export const IPV4_WITH_PORT = `${IPV4_ADDRESS}:5678`;
export const BRACKETED_IPV6_NO_PORT = "[2001:db8::1]";
export const BRACKETED_IPV6_WITH_PORT_VALUE =
  "[2001:db8::1]:443";
export const COMPRESSED_IPV6 = "2001:db8::1";
export const EXPANDED_SAME_PREFIX_IPV6 = "2001:0db8:0:0::2";
export const OTHER_PREFIX_IPV6 = "2001:db8:0:1::1";
export const MAPPED_IPV4_IPV6 = `::ffff:${IPV4_ADDRESS}`;
export const MAPPED_HEX_IPV6 = "::ffff:cb00:7107";
export const MAPPED_IPV4_WITH_PORT = `[::ffff:${IPV4_ADDRESS}]:80`;
export const ZONED_IPV6 = "fe80::1%eth0";
export const ZONED_IPV6_PREFIX = "fe80:0:0:0::";
export const LOOPBACK_IPV6 = "::1";
export const LOOPBACK_IPV6_PREFIX = "0:0:0:0::";
export const EMBEDDED_IPV4_IPV6 = "64:ff9b::192.0.2.33";
export const EMBEDDED_IPV4_IPV6_PREFIX = "64:ff9b:0:0::";
export const NOT_AN_ADDRESS_VALUES = [
  "not-an-ip",
  "999.1.1.1",
  "1.2.3",
  "1.2.3.4.5",
  "2001:db8::zz",
  "[2001:db8::1",
  "1.2.3.4:",
  "<script>",
] as const;
export const SPOOFED_ADDRESS = "198.51.100.77";
