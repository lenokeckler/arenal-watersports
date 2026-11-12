import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { onRequestError } from "@/instrumentation";
import { reportServerError } from "../reportServerError";
import {
  ERROR_CONTEXT,
  ERROR_REQUEST,
  REQUEST_FAILURE_MESSAGE,
  ROUTE_TYPES,
} from "./instrumentation.constants";

vi.mock("../reportServerError", () => ({
  reportServerError: vi.fn(),
}));

describe("onRequestError route types", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it.each(ROUTE_TYPES)(
    "reports a %s error under its route type and path",
    async (routeType) => {
      const error = new Error(REQUEST_FAILURE_MESSAGE);

      await onRequestError(error, ERROR_REQUEST, {
        ...ERROR_CONTEXT,
        routeType,
      });

      expect(reportServerError).toHaveBeenCalledWith(
        `${routeType}:${ERROR_CONTEXT.routePath}`,
        error
      );
    }
  );
});
