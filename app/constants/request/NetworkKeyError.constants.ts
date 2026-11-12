export const NETWORK_KEY_ERROR_CODE = {
  SECRET_MISSING: "network-key-secret-missing",
  SECRET_TOO_SHORT: "network-key-secret-too-short",
} as const;

export type NetworkKeyErrorCode =
  (typeof NETWORK_KEY_ERROR_CODE)[keyof typeof NETWORK_KEY_ERROR_CODE];
