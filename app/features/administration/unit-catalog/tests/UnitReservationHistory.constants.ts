import { RESERVATION_STATUS } from "@/app/constants";
import type { UnitReservationHistoryViewProps } from "../models/UnitReservationHistoryViewProps.interface";
import type { UnitReservationItem } from "../models/UnitReservationItem.interface";
import type { UnitReservationRow } from "../models/UnitReservationRow.type";
import { resolveUnitEditPath } from "../utils/resolveUnitPaths";
import {
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

export const FAKE_RESERVATION_ID = "fake-reservation-id";
export const FAKE_HISTORY_BASE_PATH = resolveUnitEditPath(
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID
);
export const MIDDLE_HISTORY_PAGE = 2;
export const MIDDLE_HISTORY_PAGE_COUNT = 3;
export const PAGE_PAST_THE_END = "9";

export const DEFAULT_UNIT_RESERVATION_ROW: UnitReservationRow =
  {
    id: FAKE_RESERVATION_ID,
    code: "R-0001",
    customer_name: "Ana Mora",
    starts_at: "2026-01-15T15:30:00.000Z",
    status: RESERVATION_STATUS.SCHEDULED,
  };

export const DEFAULT_UNIT_RESERVATION_ITEM: UnitReservationItem =
  {
    id: FAKE_RESERVATION_ID,
    code: "R-0001",
    customerName: "Ana Mora",
    startsAt: "2026-01-15T15:30:00.000Z",
    status: RESERVATION_STATUS.SCHEDULED,
  };

export const buildUnitReservationRow = (
  overrides: Partial<UnitReservationRow> = {}
): UnitReservationRow => ({
  ...DEFAULT_UNIT_RESERVATION_ROW,
  ...overrides,
});

export const buildUnitReservationItem = (
  overrides: Partial<UnitReservationItem> = {}
): UnitReservationItem => ({
  ...DEFAULT_UNIT_RESERVATION_ITEM,
  ...overrides,
});

export const DEFAULT_UNIT_RESERVATION_HISTORY_VIEW_PROPS: UnitReservationHistoryViewProps =
  {
    basePath: FAKE_HISTORY_BASE_PATH,
    currentPage: 1,
    fetchFailed: false,
    pageCount: 1,
    reservations: [DEFAULT_UNIT_RESERVATION_ITEM],
  };

export const buildUnitReservationHistoryViewProps = (
  overrides: Partial<UnitReservationHistoryViewProps> = {}
): UnitReservationHistoryViewProps => ({
  ...DEFAULT_UNIT_RESERVATION_HISTORY_VIEW_PROPS,
  ...overrides,
});
