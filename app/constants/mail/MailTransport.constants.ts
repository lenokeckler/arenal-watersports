export const MAIL_TRANSPORT = {
  IMPLICIT_TLS_PORT: 465,
  LINE_BREAK_PATTERN: /[\r\n]/,
  LOOPBACK_HOSTS: ["127.0.0.1", "localhost", "::1"],
  MAXIMUM_PORT: 65535,
  MINIMUM_PORT: 1,
  PLAIN_ADDRESS_PATTERN:
    /^[^\s\u0085@<>()[\]\\,;:"]+@[^\s\u0085@<>()[\]\\,;:"]+$/,
  PORT_PATTERN: /^\d+$/,
} as const;
