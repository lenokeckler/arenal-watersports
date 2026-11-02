import { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitItemRow } from "../models/ReservationSplitItemRow.interface";
import type { ReservationSplitRow } from "../models/ReservationSplitRow.interface";

export const SPLIT_RESERVATION_ID =
  "e1900000-0000-4000-8000-000000000001";
export const SPLIT_UPDATED_AT =
  "2026-11-02T15:04:05.123456+00:00";
export const SPLIT_STARTS_AT = "2026-11-02T20:30:00+00:00";
export const SPLIT_DEPARTURE_ID =
  "e1900000-0000-4000-8000-000000000002";

export const SPLIT_CATEGORY = {
  id: "e1900000-0000-4000-8000-000000000011",
  name: "Kayak",
};

export const SPLIT_BOAT_CATEGORY = {
  id: "e1900000-0000-4000-8000-000000000012",
  name: "Lancha",
};

export const QUANTITY_ITEM_ROW: ReservationSplitItemRow = {
  category: SPLIT_CATEGORY,
  category_id: SPLIT_CATEGORY.id,
  dispatch_id: null,
  extra_id: null,
  id: "e1900000-0000-4000-8000-000000000022",
  quantity: 4,
  unit: null,
  unit_id: null,
};

export const UNIT_ITEM_ROW: ReservationSplitItemRow = {
  category: null,
  category_id: null,
  dispatch_id: null,
  extra_id: null,
  id: "e1900000-0000-4000-8000-000000000021",
  quantity: null,
  unit: { category: SPLIT_BOAT_CATEGORY, code: "L-03" },
  unit_id: "e1900000-0000-4000-8000-000000000031",
};

export const EXTRA_ITEM_ROW: ReservationSplitItemRow = {
  ...QUANTITY_ITEM_ROW,
  extra_id: "e1900000-0000-4000-8000-000000000041",
  id: "e1900000-0000-4000-8000-000000000023",
};

export const DISPATCHED_ITEM_ROW: ReservationSplitItemRow =
  {
    ...QUANTITY_ITEM_ROW,
    dispatch_id: "e1900000-0000-4000-8000-000000000051",
    id: "e1900000-0000-4000-8000-000000000024",
  };

export const SPLIT_ROW: ReservationSplitRow = {
  code: "R-000123",
  customer_name: "Grupo Prueba",
  duration_minutes: 120,
  id: SPLIT_RESERVATION_ID,
  people_count: 6,
  reservation_items: [
    QUANTITY_ITEM_ROW,
    UNIT_ITEM_ROW,
    EXTRA_ITEM_ROW,
    DISPATCHED_ITEM_ROW,
  ],
  starts_at: SPLIT_STARTS_AT,
  status: "scheduled",
  updated_at: SPLIT_UPDATED_AT,
};

export const EXPECTED_SPLIT: ReservationSplit = {
  code: "R-000123",
  customerName: "Grupo Prueba",
  date: "2026-11-02",
  durationMinutes: 120,
  expectedUpdatedAt: SPLIT_UPDATED_AT,
  id: SPLIT_RESERVATION_ID,
  items: [
    {
      categoryName: SPLIT_BOAT_CATEGORY.name,
      id: UNIT_ITEM_ROW.id,
      kind: RESERVATION_SPLIT_ITEM_KIND.UNIT,
      label: "Lancha L-03",
      pieces: 1,
    },
    {
      categoryName: SPLIT_CATEGORY.name,
      id: QUANTITY_ITEM_ROW.id,
      kind: RESERVATION_SPLIT_ITEM_KIND.QUANTITY,
      label: SPLIT_CATEGORY.name,
      pieces: 4,
    },
  ],
  peopleCount: 6,
  splitBlock: RESERVATION_SPLIT_BLOCK.NONE,
  time: "14:30",
};

export const SINGLE_PERSON_COUNT = 1;
export const SINGLE_PIECE_QUANTITY = 1;
export const MALFORMED_RESERVATION_ID = "not-a-uuid";

export const VALID_DEPARTURE_INPUT: ReservationSplitDepartureInput =
  {
    items: [{ itemId: UNIT_ITEM_ROW.id, quantity: 1 }],
    peopleCount: 2,
    time: "15:00",
  };

export const VALID_SPLIT_INPUT: ReservationSplitInput = {
  departures: [VALID_DEPARTURE_INPUT],
  expectedUpdatedAt: SPLIT_UPDATED_AT,
  reservationId: SPLIT_RESERVATION_ID,
};
