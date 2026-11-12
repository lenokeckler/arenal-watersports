import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { getMaintenanceOverview } from "../services/getMaintenanceOverview";
import { getOilChangeText } from "../utils/getOilChangeText";
import {
  MAINTENANCE_ROWS,
  OIL_TEXT_CASES,
} from "./Maintenance.constants";

type Rpc = ReturnType<typeof createOperationsClient>["rpc"];

const queueRows = (rpc: Rpc, rows: unknown) => {
  rpc.mockReset();
  rpc.mockResolvedValueOnce({ data: true, error: null });
  rpc.mockResolvedValueOnce({ data: rows, error: null });
};

describe("getMaintenanceOverview", () => {
  it("splits the machines due for an oil change from the ones out of service", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, MAINTENANCE_ROWS);

    const overview = await getMaintenanceOverview();

    expect(rpc).toHaveBeenLastCalledWith(
      "maintenance_units"
    );
    expect(
      overview.oilDue.map((unit) => unit.code)
    ).toEqual(["JS-1", "CU-1", "JS-3"]);
    expect(
      overview.outOfService.map((unit) => unit.code)
    ).toEqual(["JS-2", "JS-3"]);
  });

  it("keeps how far a machine went past its threshold", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, MAINTENANCE_ROWS);

    const { oilDue } = await getMaintenanceOverview();

    expect(oilDue[0]).toMatchObject({
      nextOilChangeAt: 100,
      oilOverage: 10,
      usageTotal: 110,
    });
  });

  it("answers empty lists when nothing needs maintenance", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, null);

    await expect(getMaintenanceOverview()).resolves.toEqual(
      {
        oilDue: [],
        outOfService: [],
      }
    );
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getMaintenanceOverview()
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});

describe("getOilChangeText", () => {
  it.each(OIL_TEXT_CASES)(
    "writes the oil change of $code",
    async ({ code, text }) => {
      const { rpc } = createOperationsClient(true, true);
      queueRows(rpc, MAINTENANCE_ROWS);
      const { oilDue } = await getMaintenanceOverview();
      const unit = oilDue.find(
        (item) => item.code === code
      );

      expect(unit && getOilChangeText(unit)).toBe(text);
    }
  );
});
