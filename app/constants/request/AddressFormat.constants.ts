export const ADDRESS_FORMAT = {
  BRACKETED_PATTERN: /^\[([^\]]+)\](?::\d+)?$/,
  BYTE_BITS: 8,
  BYTE_MASK: 0xff,
  COMPRESSION: "::",
  EMBEDDED_IPV4_PATTERN:
    /^(.*:)(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
  HEXTET_COUNT: 8,
  HEXTET_SEPARATOR: ":",
  HEX_RADIX: 16,
  IPV4_SEPARATOR: ".",
  IPV4_WITH_PORT_PATTERN: /^(\d+(?:\.\d+){3}):\d+$/,
  MAPPED_MARKER: 0xffff,
  MAPPED_MARKER_INDEX: 5,
  MAPPED_ZERO_HEXTETS: 5,
  PREFIX_HEXTETS: 4,
  ZONE_PATTERN: /%.*$/,
  ZERO_HEXTET: "0",
  NO_TEXT: "",
} as const;

export const IP_VERSION = {
  V4: 4,
  V6: 6,
} as const;
