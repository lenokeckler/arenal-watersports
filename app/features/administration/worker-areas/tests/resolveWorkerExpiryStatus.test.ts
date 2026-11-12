import { describe, expect, it } from "vitest";
import { WORKER_EXPIRY_STATUS } from "../constants/WorkerExpiry.constants";
import { resolveWorkerExpiryStatus } from "../utils/resolveWorkerExpiryStatus";
import { WORKER_EXPIRY_TEST } from "./WorkerExpiry.constants";

describe("resolveWorkerExpiryStatus", () => {
  it.each([
    [
      WORKER_EXPIRY_TEST.EXPIRED_AT,
      WORKER_EXPIRY_STATUS.EXPIRED,
    ],
    [
      WORKER_EXPIRY_TEST.EXPIRING_AT,
      WORKER_EXPIRY_STATUS.EXPIRING,
    ],
    [
      WORKER_EXPIRY_TEST.VALID_AT,
      WORKER_EXPIRY_STATUS.VALID,
    ],
    [null, WORKER_EXPIRY_STATUS.NONE],
    ["not a date", WORKER_EXPIRY_STATUS.NONE],
  ])("resolves %j as %s", (expiresAt, expected) => {
    expect(
      resolveWorkerExpiryStatus(
        expiresAt,
        WORKER_EXPIRY_TEST.NOW
      )
    ).toBe(expected);
  });

  it("treats the exact expiry instant as expired", () => {
    expect(
      resolveWorkerExpiryStatus(
        WORKER_EXPIRY_TEST.NOW.toISOString(),
        WORKER_EXPIRY_TEST.NOW
      )
    ).toBe(WORKER_EXPIRY_STATUS.EXPIRED);
  });

  it("starts warning exactly seven days before the expiry", () => {
    const sevenDaysBefore = new Date(
      Date.parse(WORKER_EXPIRY_TEST.VALID_AT) -
        7 * WORKER_EXPIRY_TEST.DAY_MS
    );

    expect(
      resolveWorkerExpiryStatus(
        WORKER_EXPIRY_TEST.VALID_AT,
        sevenDaysBefore
      )
    ).toBe(WORKER_EXPIRY_STATUS.EXPIRING);
  });
});
