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
  EXPECTED_OPERATION,
  REQUEST_FAILURE_MESSAGE,
  REQUEST_PATH_WITH_QUERY,
} from "./instrumentation.constants";

vi.mock("../reportServerError", () => ({
  reportServerError: vi.fn(),
}));

describe("onRequestError", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("reports the error once under the route type and route path", async () => {
    const error = new Error(REQUEST_FAILURE_MESSAGE);

    await onRequestError(
      error,
      ERROR_REQUEST,
      ERROR_CONTEXT
    );

    expect(reportServerError).toHaveBeenCalledOnce();
    expect(reportServerError).toHaveBeenCalledWith(
      EXPECTED_OPERATION,
      error
    );
  });

  it("never reports the request path", async () => {
    let reportedOperation = "";
    vi.mocked(reportServerError).mockImplementation(
      (operation) => {
        reportedOperation = operation;
      }
    );

    await onRequestError(
      new Error(REQUEST_FAILURE_MESSAGE),
      ERROR_REQUEST,
      ERROR_CONTEXT
    );

    expect(reportServerError).toHaveBeenCalledOnce();
    expect(reportedOperation).not.toContain(
      REQUEST_PATH_WITH_QUERY
    );
  });
});
