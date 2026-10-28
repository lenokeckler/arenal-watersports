export const SESSION_FIXTURE = {
  ORIGIN: "http://localhost:3000",
  PATHNAME: "/board",
  CLAIMS: { sub: "worker-id" },
  PENDING_CLAIMS: {
    sub: "worker-id",
    must_change_password: true,
  },
  SETTLED_CLAIMS: {
    sub: "worker-id",
    must_change_password: false,
  },
  NON_BOOLEAN_CLAIMS: {
    sub: "worker-id",
    must_change_password: "true",
  },
  ERROR_MESSAGE: "invalid jwt",
  REQUEST_COOKIE: {
    name: "sb-request",
    value: "from-request",
  },
  REFRESHED_COOKIE: {
    name: "sb-access-token",
    value: "refreshed",
    options: { path: "/" },
  },
} as const;
