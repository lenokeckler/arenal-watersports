export const CLIENT_ADDRESS = {
  HEADER_NAMES: [
    "x-vercel-forwarded-for",
    "x-forwarded-for",
  ],
  SEPARATOR: ",",
  UNKNOWN_BUCKET: "unknown-client",
} as const;
