import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import {
  getMovementReport,
  MovementReportAccessError,
} from "../services/getMovementReport";
import { MOVEMENT_TEST } from "./MovementReport.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

const results: Record<
  string,
  { data: unknown; error: unknown }
> = {};

const buildBuilder = (table: string) => {
  const builder: Record<string, unknown> = {};
  builder.select = () => builder;
  builder.order = () => builder;
  builder.limit = () => builder;
  builder.then = (resolve: (value: unknown) => unknown) =>
    resolve(results[table]);

  return builder;
};

describe("getMovementReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    results.monthly_departures = {
      data: [{ departures_count: 4, month: "2026-01-01" }],
      error: null,
    };
    results.weekday_departures = {
      data: [{ departures_count: 3, weekday: 6 }],
      error: null,
    };
    results.monthly_revenue_report = {
      data: [
        {
          currency: "USD",
          month: "2026-01-01",
          net_amount: 100,
        },
        {
          currency: "CRC",
          month: "2026-01-01",
          net_amount: 5000,
        },
        {
          currency: "USD",
          month: "2026-02-01",
          net_amount: 250,
        },
      ],
      error: null,
    };
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from: (table: string) => buildBuilder(table),
      } as never
    );
  });

  it("groups the income by currency and keeps the months in order", async () => {
    const report = await getMovementReport();

    expect(report.departuresByMonth).toEqual([
      { month: "2026-01-01", value: 4 },
    ]);
    expect(report.departuresByWeekday).toEqual([
      { value: 3, weekday: 6 },
    ]);
    expect(
      report.incomeByCurrency.map((s) => s.currency)
    ).toEqual(["CRC", "USD"]);
    expect(report.incomeByCurrency[1].months).toEqual([
      { month: "2026-01-01", value: 100 },
      { month: "2026-02-01", value: 250 },
    ]);
  });

  it("refuses anyone who is not an administrator before reading", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(
      getMovementReport()
    ).rejects.toBeInstanceOf(MovementReportAccessError);
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("throws the database error", async () => {
    results.weekday_departures = {
      data: null,
      error: MOVEMENT_TEST.DATABASE_ERROR,
    };

    await expect(getMovementReport()).rejects.toThrow();
  });
});
