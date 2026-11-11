import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { listUnitReservations } from "../services/listUnitReservations";
import UnitReservationHistory from "../UnitReservationHistory";
import { resolveUnitEditPath } from "../utils/resolveUnitPaths";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import {
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";
import {
  DEFAULT_UNIT_RESERVATION_ITEM,
  MIDDLE_HISTORY_PAGE,
  MIDDLE_HISTORY_PAGE_COUNT,
  PAGE_PAST_THE_END,
} from "./UnitReservationHistory.constants";

const redirectMock = vi.hoisted(() => vi.fn());
const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("../services/listUnitReservations");

const renderEntry = (pageParam?: string) =>
  UnitReservationHistory({
    categoryId: FAKE_CATEGORY_ID,
    pageParam,
    unitId: FAKE_UNIT_ID,
  });

describe("UnitReservationHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    redirectMock.mockImplementation(() => {
      throw new Error(REDIRECT_ERROR_MESSAGE);
    });
    vi.mocked(listUnitReservations).mockResolvedValue({
      reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
      pageCount: 1,
    });
  });

  it("reads the page named in the address and passes the reservations to the view", async () => {
    vi.mocked(listUnitReservations).mockResolvedValue({
      reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
      pageCount: MIDDLE_HISTORY_PAGE_COUNT,
    });

    const element = await renderEntry(
      `${MIDDLE_HISTORY_PAGE}`
    );

    expect(listUnitReservations).toHaveBeenCalledWith(
      FAKE_UNIT_ID,
      MIDDLE_HISTORY_PAGE
    );
    expect(element.props).toEqual({
      basePath: resolveUnitEditPath(
        FAKE_CATEGORY_ID,
        FAKE_UNIT_ID
      ),
      currentPage: MIDDLE_HISTORY_PAGE,
      fetchFailed: false,
      pageCount: MIDDLE_HISTORY_PAGE_COUNT,
      reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
    });
  });

  it("flags a failed read and keeps the cause when the reservations cannot be loaded", async () => {
    const readError = new Error("read failed");
    vi.mocked(listUnitReservations).mockRejectedValue(
      readError
    );

    const element = await renderEntry();

    expect(element.props.fetchFailed).toBe(true);
    expect(element.props.reservations).toEqual([]);
    expect(element.props.fetchError.cause).toBe(readError);
  });

  it("sends the worker to the last page when the requested page is past the end", async () => {
    vi.mocked(listUnitReservations).mockResolvedValue({
      reservations: [],
      pageCount: MIDDLE_HISTORY_PAGE_COUNT,
    });

    await expect(
      renderEntry(PAGE_PAST_THE_END)
    ).rejects.toThrow(REDIRECT_ERROR_MESSAGE);

    expect(redirectMock).toHaveBeenCalledWith(
      resolveListPageHref(
        resolveUnitEditPath(FAKE_CATEGORY_ID, FAKE_UNIT_ID),
        MIDDLE_HISTORY_PAGE_COUNT
      )
    );
  });

  it("shows the empty state instead of redirecting when the unit has no reservations", async () => {
    vi.mocked(listUnitReservations).mockResolvedValue({
      reservations: [],
      pageCount: 0,
    });

    const element = await renderEntry();

    expect(redirectMock).not.toHaveBeenCalled();
    expect(element.props.reservations).toEqual([]);
  });
});
