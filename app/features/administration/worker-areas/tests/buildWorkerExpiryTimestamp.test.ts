import { describe, expect, it } from "vitest";
import { buildWorkerExpiryTimestamp } from "../utils/buildWorkerExpiryTimestamp";
import { WORKER_EXPIRY_TEST } from "./WorkerExpiry.constants";

describe("buildWorkerExpiryTimestamp", () => {
  it("ends the chosen day at the Costa Rica end of day", () => {
    expect(
      buildWorkerExpiryTimestamp(
        WORKER_EXPIRY_TEST.NEW_DATE
      )
    ).toBe(WORKER_EXPIRY_TEST.NEW_TIMESTAMP);
  });

  it.each([
    [""],
    ["2026-12"],
    ["05/12/2026"],
    ["2026-13-01"],
    ["2026-02-31"],
    ["2026-12-05T10:00"],
  ])("rejects %j", (value) => {
    expect(buildWorkerExpiryTimestamp(value)).toBeNull();
  });
});
