import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it } from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { getMaintenanceOverview } from "../services/getMaintenanceOverview";
import { MAINTENANCE_ROWS } from "./Maintenance.constants";

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
    ).toEqual(["JS-1", "CU-1", "JS-3", "JS-4"]);
    expect(
      overview.outOfService.map((unit) => unit.code)
    ).toEqual(["JS-2", "JS-3"]);
  });

  it("keeps how far a machine is from its oil change, before or after it", async () => {
    const { rpc } = createOperationsClient(true, true);
    queueRows(rpc, MAINTENANCE_ROWS);

    const { oilDue } = await getMaintenanceOverview();

    expect(oilDue[0]).toMatchObject({
      nextOilChangeAt: 100,
      oilOverage: 10,
      oilRemaining: -10,
      oilWarning: true,
      usageTotal: 110,
    });
    expect(oilDue[3]).toMatchObject({
      oilRemaining: 5,
      oilWarning: true,
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
