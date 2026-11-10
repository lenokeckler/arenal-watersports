import type { Instrumentation } from "next";

type OnRequestErrorParameters =
  Parameters<Instrumentation.onRequestError>;

export const REQUEST_PATH_WITH_QUERY =
  "/access/login?username=operaciones1&token=secret-token";

export const ERROR_REQUEST: OnRequestErrorParameters[1] = {
  headers: {},
  method: "POST",
  path: REQUEST_PATH_WITH_QUERY,
};

export const ERROR_CONTEXT: OnRequestErrorParameters[2] = {
  revalidateReason: undefined,
  routePath: "/access/login",
  routerKind: "App Router",
  routeType: "action",
};

export const EXPECTED_OPERATION = "action:/access/login";
export const REQUEST_FAILURE_MESSAGE = "render failed";

export const ROUTE_TYPES = [
  "render",
  "route",
  "action",
  "proxy",
] as const;
