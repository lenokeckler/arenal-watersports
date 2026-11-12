import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it, vi } from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { MAINTENANCE_HISTORY_PAGINATION } from "../constants/MaintenanceHistory.constants";
import { getMaintenanceHistory } from "../services/getMaintenanceHistory";
import { getEntryDetailText } from "../utils/getEntryDetailText";
import { getHistoryPage } from "../utils/getHistoryPage";
import { getHistoryPageHref } from "../utils/getHistoryPageHref";
import {
  DETAIL_CASES,
  HISTORY_ENTRY,
  HISTORY_FREE_ENTRY,
  HISTORY_FREE_ROW,
  HISTORY_ROW,
  PAGE_CASES,
} from "./MaintenanceHistory.constants";

const queueRows = (rows: unknown) => {
  const { client } = createOperationsClient(true, true);
  const range = vi
    .fn()
    .mockResolvedValue({ data: rows, error: null });
  const secondOrder = vi.fn().mockReturnValue({ range });
  const firstOrder = vi
    .fn()
    .mockReturnValue({ order: secondOrder });
  const select = vi
    .fn()
    .mockReturnValue({ order: firstOrder });
  Object.assign(client, {
    from: vi.fn().mockReturnValue({ select }),
  });

  return { firstOrder, range, secondOrder };
};

describe("getMaintenanceHistory", () => {
  it("reads the latest jobs first with their unit, cost and external mark", async () => {
    const { firstOrder, range } = queueRows([
      HISTORY_ROW,
      HISTORY_FREE_ROW,
    ]);

    const page = await getMaintenanceHistory(1);

    expect(firstOrder).toHaveBeenCalledWith(
      "performed_at",
      {
        ascending: false,
      }
    );
    expect(range).toHaveBeenCalledWith(
      0,
      MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE
    );
    expect(page).toEqual({
      entries: [HISTORY_ENTRY, HISTORY_FREE_ENTRY],
      hasNextPage: false,
      page: 1,
    });
  });

  it("asks for the rows of the page that was requested", async () => {
    const { range } = queueRows([]);

    await getMaintenanceHistory(3);

    expect(range).toHaveBeenCalledWith(
      2 * MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE,
      3 * MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE
    );
  });

  it("knows there is a next page when one more row comes back", async () => {
    queueRows(
      Array.from(
        {
          length:
            MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE + 1,
        },
        () => HISTORY_ROW
      )
    );

    const page = await getMaintenanceHistory(1);

    expect(page.hasNextPage).toBe(true);
    expect(page.entries).toHaveLength(
      MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE
    );
  });

  it("answers an empty page when there are no jobs", async () => {
    queueRows(null);

    await expect(getMaintenanceHistory(1)).resolves.toEqual(
      {
        entries: [],
        hasNextPage: false,
        page: 1,
      }
    );
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getMaintenanceHistory(1)
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});

describe("getHistoryPage", () => {
  it.each(PAGE_CASES)(
    "reads %j as page $expected",
    ({ expected, param }) => {
      expect(getHistoryPage(param)).toBe(expected);
    }
  );

  it("builds the link of a page", () => {
    expect(getHistoryPageHref(2)).toBe(
      "/operations/maintenance/history?pagina=2"
    );
  });
});

describe("getEntryDetailText", () => {
  it.each(DETAIL_CASES)(
    "writes the detail of $entry.id",
    ({ entry, text }) => {
      expect(getEntryDetailText(entry)).toBe(text);
    }
  );
});
