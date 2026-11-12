import { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCreatedDeparture } from "../models/ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitItemRow } from "../models/ReservationSplitItemRow.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitItem } from "../models/ReservationSplitItem.interface";
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

export const COSTA_RICA_MIDNIGHT_CASES = [
  ["2035-04-13T06:00:00+00:00", "2035-04-13", "00:00"],
  ["2035-04-13T05:59:00+00:00", "2035-04-12", "23:59"],
] as const;

export const SPLIT_DRAFT_KEY = "draft-1";
export const SPLIT_ORIGINAL_TIME = "14:30";
export const SPLIT_DRAFT_TIME = "16:00";
export const SPLIT_UNIT_ERROR = "Elija una salida.";

export const SPLIT_UNIT_ITEM: ReservationSplitItem = {
  categoryName: SPLIT_BOAT_CATEGORY.name,
  id: UNIT_ITEM_ROW.id,
  kind: RESERVATION_SPLIT_ITEM_KIND.UNIT,
  label: "Lancha L-03",
  pieces: 1,
};

export const SPLIT_DRAFT: ReservationSplitDraft = {
  key: SPLIT_DRAFT_KEY,
  peopleCount: 1,
  quantities: {},
  time: SPLIT_DRAFT_TIME,
};

export const SPLIT_DEPARTURE_NUMBER = 2;
export const SPLIT_PEOPLE_ERROR =
  "Cada salida necesita al menos 1 persona.";
export const SPLIT_ITEMS_ERROR =
  "Cada salida necesita al menos 1 equipo.";

export const SPLIT_SECOND_DRAFT_KEY = "draft-2";
export const SPLIT_SECOND_DEPARTURE_NUMBER = 3;
export const SPLIT_SECOND_DRAFT_TIME = "17:00";

export const SPLIT_DURATION_CASES = [
  [30, "30 min"],
  [60, "1 hora"],
  [90, "1 h 30 min"],
  [150, "2 h 30 min"],
  [1440, "24 horas"],
] as const;

export const SPLIT_OTHER_UNIT_ITEM: ReservationSplitItem = {
  ...SPLIT_UNIT_ITEM,
  id: "e2900000-0000-4000-8000-000000000404",
  label: "Lancha L-04",
};

export const SPLIT_FORM_ERROR = "Sin conexión.";
export const SPLIT_CALENDAR_HREF = "/reservations/calendar";

export const SPLIT_CREATED_DEPARTURES: ReservationSplitCreatedDeparture[] =
  [
    {
      code: "R-000124",
      reservationId: "e1900000-0000-4000-8000-000000000061",
    },
    {
      code: "R-000125",
      reservationId: "e1900000-0000-4000-8000-000000000062",
    },
  ];

export const SPLIT_SUBMIT_STATE_CASES = [
  ["idle", {}, RESERVATION_SPLIT_UI_COPY.SUBMIT, false],
  [
    "pending",
    { isPending: true, isSubmitDisabled: true },
    RESERVATION_SPLIT_UI_COPY.SUBMITTING,
    true,
  ],
  [
    "stale",
    { isStale: true, isSubmitDisabled: true },
    RESERVATION_SPLIT_UI_COPY.SUBMIT,
    true,
  ],
] as const;

export const SPLIT_UNAVAILABLE_REASONS = [
  RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED,
  RESERVATION_SPLIT_BLOCK.TOO_FEW_PEOPLE,
  RESERVATION_SPLIT_BLOCK.TOO_LITTLE_EQUIPMENT,
] as const;

export const SPLIT_QUANTITY_ONLY_SPLIT: ReservationSplit = {
  ...EXPECTED_SPLIT,
  items: EXPECTED_SPLIT.items.filter(
    (item) => item.kind !== RESERVATION_SPLIT_ITEM_KIND.UNIT
  ),
};

export const NEXT_NOT_FOUND = "NEXT_NOT_FOUND";
export const NEXT_REDIRECT = "NEXT_REDIRECT";
