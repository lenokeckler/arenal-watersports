import { describe, expect, it } from "vitest";
import { buildAgendaItems } from "../utils/buildAgendaItems";
import { MAINTENANCE_JOBS } from "./MaintenanceData.constants";

describe("buildAgendaItems", () => {
  it("keeps the record id beside each entry", () => {
    expect(
      buildAgendaItems(MAINTENANCE_JOBS, []).map(
        (item) => item.id
      )
    ).toEqual(MAINTENANCE_JOBS.map((job) => job.id));
  });
});
