export const REALTIME_REFRESH_TEST = {
  BURST_COUNT: 3,
  CHANNEL: "realtime-refresh-test",
  CONNECTING_STATUS: "CONNECTING",
  HIDDEN_STATE: "hidden",
  TABLES: ["first_table", "second_table"],
} as const;

export const REALTIME_HARNESS = {
  CHANGE_HANDLER_ARGUMENT: 2,
  FIRST_CALL: 0,
  STATUS_HANDLER_ARGUMENT: 0,
} as const;

export const REALTIME_HARNESS_CLIENT = {
  CHANNEL: "realtime-harness",
  KEY: "realtime-harness-key",
  URL: "http://localhost",
} as const;
