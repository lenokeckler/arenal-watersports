import { describe, expect, it, vi } from "vitest";
import { runWithUnknownFallback } from "../runWithUnknownFallback";
import {
  FALLBACK_RESULT,
  OPERATION_FAILURE_MESSAGE,
  OPERATION_INPUT,
  OPERATION_RESULT,
} from "./runWithUnknownFallback.constants";

describe("runWithUnknownFallback", () => {
  it("passes the input to the operation and returns its result", async () => {
    const operation = vi
      .fn()
      .mockResolvedValue(OPERATION_RESULT);

    await expect(
      runWithUnknownFallback(
        operation,
        OPERATION_INPUT,
        FALLBACK_RESULT
      )
    ).resolves.toBe(OPERATION_RESULT);

    expect(operation).toHaveBeenCalledOnce();
    expect(operation).toHaveBeenCalledWith(OPERATION_INPUT);
  });

  it("returns the fallback when the operation rejects", async () => {
    const operation = vi
      .fn()
      .mockRejectedValue(
        new Error(OPERATION_FAILURE_MESSAGE)
      );

    await expect(
      runWithUnknownFallback(
        operation,
        OPERATION_INPUT,
        FALLBACK_RESULT
      )
    ).resolves.toBe(FALLBACK_RESULT);
  });
});
