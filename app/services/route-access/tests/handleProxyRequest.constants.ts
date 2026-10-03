export const PROXY_FIXTURE = {
  ORIGIN: "http://localhost:3000",
  LOCATION_HEADER: "location",
  PROTECTED_PATHNAME: "/tablero",
  COOKIE: { name: "sb-access-token", value: "refreshed" },
} as const;
