import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import type { ReservationCancellationInput } from "../models/ReservationCancellationInput.interface";
import type { ReservationCancellationItemRow } from "../models/ReservationCancellationItemRow.interface";
import type { ReservationCancellationRow } from "../models/ReservationCancellationRow.interface";

export const CANCELLATION_RESERVATION_ID =
  "e2b10000-0000-4000-8000-000000000301";
export const CANCELLATION_UPDATED_AT =
  "2026-11-10T15:00:00.000000+00:00";
export const MALFORMED_RESERVATION_ID = "not-a-uuid";
export const CANCELLATION_REASON = "El cliente no llegó";

const UNIT_ITEM_ROW: ReservationCancellationItemRow = {
  category: null,
  extra_id: null,
  id: "e2b10000-0000-4000-8000-000000000402",
  quantity: null,
  unit: {
    category: { name: "Lancha" },
    code: "BENNINGTON",
  },
  unit_id: "e2b10000-0000-4000-8000-000000000201",
};

const QUANTITY_ITEM_ROW: ReservationCancellationItemRow = {
  category: { name: "Kayak doble" },
  extra_id: null,
  id: "e2b10000-0000-4000-8000-000000000401",
  quantity: 3,
  unit: null,
  unit_id: null,
};

const EXTRA_ITEM_ROW: ReservationCancellationItemRow = {
  category: { name: "Kayak doble" },
  extra_id: "e2b10000-0000-4000-8000-000000000501",
  id: "e2b10000-0000-4000-8000-000000000403",
  quantity: 1,
  unit: null,
  unit_id: null,
};

export const SCHEDULED_ROW: ReservationCancellationRow = {
  code: "R-000210",
  customer_name: "Grupo Cancelado",
  id: CANCELLATION_RESERVATION_ID,
  reservation_items: [
    UNIT_ITEM_ROW,
    EXTRA_ITEM_ROW,
    QUANTITY_ITEM_ROW,
  ],
  starts_at: "2026-11-02T20:30:00+00:00",
  status: "scheduled",
  updated_at: CANCELLATION_UPDATED_AT,
};

export const EXPECTED_SCHEDULED: ReservationCancellation = {
  code: "R-000210",
  customerName: "Grupo Cancelado",
  date: "2026-11-02",
  equipment: [
    {
      id: QUANTITY_ITEM_ROW.id,
      label: "Kayak doble",
      quantity: 3,
    },
    {
      id: UNIT_ITEM_ROW.id,
      label: "Lancha BENNINGTON",
      quantity: null,
    },
  ],
  expectedUpdatedAt: CANCELLATION_UPDATED_AT,
  id: CANCELLATION_RESERVATION_ID,
  isCancellable: true,
  status: "scheduled",
  time: "14:30",
};

export const NOT_CANCELLABLE_STATUSES = [
  "dispatched",
  "closed",
  "cancelled",
] as const;

export const VALID_CANCELLATION_INPUT: ReservationCancellationInput =
  {
    expectedUpdatedAt: CANCELLATION_UPDATED_AT,
    reason: CANCELLATION_REASON,
    reservationId: CANCELLATION_RESERVATION_ID,
  };

export const CANCELLATION_UNEXPECTED_ERROR = new Error(
  "Unexpected cancellation failure"
);
export const CANCELLATION_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);
