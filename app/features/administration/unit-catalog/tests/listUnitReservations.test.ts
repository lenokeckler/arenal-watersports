import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { listUnitReservations } from "../services/listUnitReservations";
import { FAKE_UNIT_ID } from "./Unit.constants";
import {
  DEFAULT_UNIT_RESERVATION_ITEM,
  DEFAULT_UNIT_RESERVATION_ROW,
} from "./UnitReservationHistory.constants";

const mockFetchCount = vi.fn();
const mockFetchPage = vi.fn();
const PAST_THE_END_PAGE = 9;

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchUnitReservationCount", () => ({
  fetchUnitReservationCount: (
    ...args: unknown[]
  ): unknown => mockFetchCount(...args),
}));

vi.mock("../services/fetchUnitReservations", () => ({
  fetchUnitReservations: (...args: unknown[]): unknown =>
    mockFetchPage(...args),
}));

describe("listUnitReservations", () => {
  beforeEach(() => {
    mockFetchCount.mockReset();
    mockFetchPage.mockReset();
    mockFetchPage.mockResolvedValue([
      DEFAULT_UNIT_RESERVATION_ROW,
    ]);
  });

  it("counts the reservations of the unit before reading any page", async () => {
    mockFetchCount.mockResolvedValue(1);

    await listUnitReservations(FAKE_UNIT_ID, 1);

    expect(mockFetchCount).toHaveBeenCalledWith(
      expect.anything(),
      FAKE_UNIT_ID
    );
    expect(
      mockFetchCount.mock.invocationCallOrder[0]
    ).toBeLessThan(
      mockFetchPage.mock.invocationCallOrder[0]
    );
  });

  it("asks for the row range of the requested page and maps the rows", async () => {
    mockFetchCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE * 2
    );

    const page = await listUnitReservations(
      FAKE_UNIT_ID,
      2
    );

    expect(mockFetchPage).toHaveBeenCalledWith(
      expect.anything(),
      FAKE_UNIT_ID,
      {
        from: LIST_PAGINATION.PAGE_SIZE,
        to: LIST_PAGINATION.PAGE_SIZE * 2 - 1,
      }
    );
    expect(page).toEqual({
      reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
      pageCount: 2,
    });
  });

  it("reads no rows and reports the last page when the page is past the end", async () => {
    mockFetchCount.mockResolvedValue(
      LIST_PAGINATION.PAGE_SIZE
    );

    const page = await listUnitReservations(
      FAKE_UNIT_ID,
      PAST_THE_END_PAGE
    );

    expect(page).toEqual({
      reservations: [],
      pageCount: 1,
    });
    expect(mockFetchPage).not.toHaveBeenCalled();
  });

  it("rejects when the page read fails instead of returning a partial page", async () => {
    mockFetchCount.mockResolvedValue(1);
    mockFetchPage.mockRejectedValue(
      new Error("read failed")
    );

    await expect(
      listUnitReservations(FAKE_UNIT_ID, 1)
    ).rejects.toThrow("read failed");
  });
});
