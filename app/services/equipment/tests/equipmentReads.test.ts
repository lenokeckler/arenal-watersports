import { describe, expect, it } from "vitest";
import { readEquipmentJobs } from "../readEquipmentJobs";
import { readFirstJobDate } from "../readFirstJobDate";
import { readFirstReportDate } from "../readFirstReportDate";
import { createQueryRecorder } from "./createQueryRecorder";

const RANGE = {
  before: "2026-09-01",
  since: "2026-08-01",
};

describe("equipment reads", () => {
  it("reads only the asked month", async () => {
    const { calls, client } = createQueryRecorder({
      data: [],
    });

    await readEquipmentJobs(client, RANGE);

    expect(calls.gte).toHaveBeenCalledWith(
      "performed_at",
      RANGE.since
    );
    expect(calls.lt).toHaveBeenCalledWith(
      "performed_at",
      RANGE.before
    );
  });

  it("answers no first date when nothing was recorded", async () => {
    const { client } = createQueryRecorder({ data: [] });

    await expect(
      readFirstJobDate(client)
    ).resolves.toBeNull();
    await expect(
      readFirstReportDate(client)
    ).resolves.toBeNull();
  });

  it("dates the first report in Costa Rica time", async () => {
    const { client } = createQueryRecorder({
      data: [{ created_at: "2026-09-01T03:00:00Z" }],
    });

    await expect(readFirstReportDate(client)).resolves.toBe(
      "2026-08-31"
    );
  });
});
