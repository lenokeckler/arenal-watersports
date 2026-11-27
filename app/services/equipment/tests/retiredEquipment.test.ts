import { describe, expect, it } from "vitest";
import { listRetiredUnitIds } from "@/app/utils/equipment-stats/listRetiredUnitIds";
import { mapEquipmentJob } from "../mapEquipmentJob";
import { mapEquipmentReport } from "../mapEquipmentReport";
import { readPendingDamageCount } from "../readPendingDamageCount";
import { readPendingEquipmentReports } from "../readPendingEquipmentReports";
import { createQueryRecorder } from "./createQueryRecorder";
import {
  JOB_ROW,
  REPORT_ROW,
} from "./equipmentRows.constants";

const PENDING = 2;
const RETIRED_FILTER = ["unit.status", "decommissioned"];

describe("retired machines", () => {
  it("marks the records of a retired machine", () => {
    expect(mapEquipmentJob(JOB_ROW).isRetired).toBe(true);
    expect(mapEquipmentReport(REPORT_ROW).isRetired).toBe(
      true
    );
  });

  it("leaves the records of a working machine unmarked", () => {
    expect(
      mapEquipmentJob({
        ...JOB_ROW,
        unit: { ...JOB_ROW.unit, status: "available" },
      }).isRetired
    ).toBe(false);
  });

  it("lists each retired machine once", () => {
    expect([
      ...listRetiredUnitIds([
        { isRetired: true, unitId: "a" },
        { isRetired: false, unitId: "b" },
        { isRetired: true, unitId: "a" },
      ]),
    ]).toEqual(["a"]);
  });

  it("leaves them out of the reports to complete", async () => {
    const { calls, client } = createQueryRecorder({
      data: [],
    });

    await readPendingEquipmentReports(client);

    expect(calls.neq).toHaveBeenCalledWith(
      ...RETIRED_FILTER
    );
  });

  it("leaves them out of the pending count", async () => {
    const { calls, client } = createQueryRecorder({
      count: PENDING,
    });

    await expect(
      readPendingDamageCount(client)
    ).resolves.toBe(PENDING);
    expect(calls.neq).toHaveBeenCalledWith(
      ...RETIRED_FILTER
    );
  });
});
