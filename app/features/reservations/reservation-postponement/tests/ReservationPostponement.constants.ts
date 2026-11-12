import { RESERVATION_POSTPONEMENT_BLOCK } from "../constants/ReservationPostponementBlock.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementCategoryRow } from "../models/ReservationPostponementCategoryRow.interface";
import type { ReservationPostponementItemRow } from "../models/ReservationPostponementItemRow.interface";
import type { ReservationPostponementReadingUnit } from "../models/ReservationPostponementReadingUnit.interface";
import type { ReservationPostponementRow } from "../models/ReservationPostponementRow.interface";

export const POSTPONEMENT_RESERVATION_ID =
  "e2000000-0000-4000-8000-000000000001";
export const POSTPONEMENT_UPDATED_AT =
  "2026-11-02T15:04:05.123456+00:00";
export const POSTPONEMENT_STARTS_AT =
  "2026-11-02T20:30:00+00:00";
export const MALFORMED_RESERVATION_ID = "not-a-uuid";
export const OPEN_DISPATCH = { closed_at: null };
export const CLOSED_DISPATCH = {
  closed_at: "2026-11-02T22:00:00+00:00",
};

export const FUEL_CATEGORY: ReservationPostponementCategoryRow =
  {
    consumes_fuel: true,
    name: "Moto de agua",
    usage_metric: "engine_hours",
  };

export const KILOMETERS_CATEGORY: ReservationPostponementCategoryRow =
  {
    consumes_fuel: false,
    name: "Lancha",
    usage_metric: "kilometers",
  };

export const PLAIN_CATEGORY: ReservationPostponementCategoryRow =
  {
    consumes_fuel: false,
    name: "Kayak",
    usage_metric: null,
  };

const buildItemRow = (
  id: string,
  overrides: Partial<ReservationPostponementItemRow>
): ReservationPostponementItemRow => ({
  category: null,
  category_id: null,
  dispatch: null,
  dispatch_id: null,
  extra_id: null,
  fuel_out: null,
  id,
  quantity: null,
  unit: null,
  unit_id: null,
  usage_out: null,
  ...overrides,
});

export const QUANTITY_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000021",
  {
    category: PLAIN_CATEGORY,
    category_id: "e2000000-0000-4000-8000-000000000011",
    quantity: 4,
  }
);

export const FUEL_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000022",
  {
    dispatch: OPEN_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000051",
    fuel_out: 6,
    unit: {
      category: FUEL_CATEGORY,
      code: "JS-04",
      fuel_max: 8,
      usage_total: 1250,
    },
    unit_id: "e2000000-0000-4000-8000-000000000031",
    usage_out: 1245.2,
  }
);

export const KILOMETERS_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000023",
  {
    dispatch: OPEN_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000052",
    unit: {
      category: KILOMETERS_CATEGORY,
      code: "L-03",
      fuel_max: 10,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000032",
    usage_out: 8120,
  }
);

export const CLOSED_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000024",
  {
    dispatch: CLOSED_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000053",
    unit: {
      category: PLAIN_CATEGORY,
      code: "K-01",
      fuel_max: 1,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000033",
  }
);

export const PLAIN_OPEN_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000027",
  {
    dispatch: OPEN_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000054",
    unit: {
      category: PLAIN_CATEGORY,
      code: "K-02",
      fuel_max: 4,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000035",
  }
);

export const UNREAD_FUEL_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000028",
  {
    dispatch: OPEN_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000055",
    unit: {
      category: FUEL_CATEGORY,
      code: "JS-06",
      fuel_max: 8,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000036",
  }
);

export const FUEL_ONLY_CATEGORY: ReservationPostponementCategoryRow =
  {
    consumes_fuel: true,
    name: "Bote",
    usage_metric: null,
  };

export const FUEL_ONLY_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000029",
  {
    dispatch: OPEN_DISPATCH,
    dispatch_id: "e2000000-0000-4000-8000-000000000056",
    fuel_out: 3,
    unit: {
      category: FUEL_ONLY_CATEGORY,
      code: "B-01",
      fuel_max: 5,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000037",
    usage_out: 77,
  }
);

export const DISPATCH_MISSING_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000030",
  {
    dispatch: null,
    dispatch_id: "e2000000-0000-4000-8000-000000000057",
    unit: {
      category: FUEL_CATEGORY,
      code: "JS-07",
      fuel_max: 8,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000038",
  }
);

export const EXPECTED_PLAIN_READING_UNIT: ReservationPostponementReadingUnit =
  {
    categoryName: PLAIN_CATEGORY.name,
    fuelMax: null,
    fuelOut: null,
    itemId: PLAIN_OPEN_UNIT_ITEM_ROW.id,
    unitCode: "K-02",
    usageFloor: null,
    usageMetric: null,
    usageOut: null,
  };

export const EXPECTED_UNREAD_FUEL_READING_UNIT: ReservationPostponementReadingUnit =
  {
    categoryName: FUEL_CATEGORY.name,
    fuelMax: 8,
    fuelOut: null,
    itemId: UNREAD_FUEL_UNIT_ITEM_ROW.id,
    unitCode: "JS-06",
    usageFloor: 0,
    usageMetric: "engine_hours",
    usageOut: null,
  };

export const EXTRA_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000025",
  {
    category: PLAIN_CATEGORY,
    category_id: "e2000000-0000-4000-8000-000000000011",
    extra_id: "e2000000-0000-4000-8000-000000000041",
    quantity: 1,
  }
);

export const SCHEDULED_UNIT_ITEM_ROW = buildItemRow(
  "e2000000-0000-4000-8000-000000000026",
  {
    unit: {
      category: FUEL_CATEGORY,
      code: "JS-05",
      fuel_max: 8,
      usage_total: null,
    },
    unit_id: "e2000000-0000-4000-8000-000000000034",
  }
);

export const SCHEDULED_ROW: ReservationPostponementRow = {
  code: "R-000123",
  customer_name: "Grupo Prueba",
  duration_minutes: 120,
  id: POSTPONEMENT_RESERVATION_ID,
  reservation_items: [
    SCHEDULED_UNIT_ITEM_ROW,
    QUANTITY_ITEM_ROW,
    EXTRA_ITEM_ROW,
  ],
  starts_at: POSTPONEMENT_STARTS_AT,
  status: "scheduled",
  updated_at: POSTPONEMENT_UPDATED_AT,
};

export const DISPATCHED_ROW: ReservationPostponementRow = {
  ...SCHEDULED_ROW,
  reservation_items: [
    KILOMETERS_UNIT_ITEM_ROW,
    CLOSED_UNIT_ITEM_ROW,
    QUANTITY_ITEM_ROW,
    FUEL_UNIT_ITEM_ROW,
  ],
  status: "dispatched",
};

export const EXPECTED_QUANTITY_LINE_COUNT = 4;

export const EXPECTED_UNIT_LINE_LABEL =
  "Moto de agua JS-05";

export const EXPECTED_SCHEDULED: ReservationPostponement = {
  block: RESERVATION_POSTPONEMENT_BLOCK.NONE,
  code: "R-000123",
  customerName: "Grupo Prueba",
  date: "2026-11-02",
  durationMinutes: 120,
  equipment: [
    {
      id: QUANTITY_ITEM_ROW.id,
      label: PLAIN_CATEGORY.name,
      quantity: EXPECTED_QUANTITY_LINE_COUNT,
    },
    {
      id: SCHEDULED_UNIT_ITEM_ROW.id,
      label: EXPECTED_UNIT_LINE_LABEL,
      quantity: 4,
    },
    {
      id: SCHEDULED_UNIT_ITEM_ROW.id,
      label: "Moto de agua JS-05",
      quantity: null,
    },
  ],
  expectedUpdatedAt: POSTPONEMENT_UPDATED_AT,
  id: POSTPONEMENT_RESERVATION_ID,
  isDispatched: false,
  readingUnits: [],
  status: "scheduled",
  time: "14:30",
};

export const EXPECTED_FUEL_READING_UNIT: ReservationPostponementReadingUnit =
  {
    categoryName: FUEL_CATEGORY.name,
    fuelMax: 8,
    fuelOut: 6,
    itemId: FUEL_UNIT_ITEM_ROW.id,
    unitCode: "JS-04",
    usageFloor: 1250,
    usageMetric: "engine_hours",
    usageOut: 1245.2,
  };

export const EXPECTED_KILOMETERS_READING_UNIT: ReservationPostponementReadingUnit =
  {
    categoryName: KILOMETERS_CATEGORY.name,
    fuelMax: null,
    fuelOut: null,
    itemId: KILOMETERS_UNIT_ITEM_ROW.id,
    unitCode: "L-03",
    usageFloor: 8120,
    usageMetric: "kilometers",
    usageOut: 8120,
  };

export const NOT_POSTPONABLE_STATUS_CASES = [
  "closed",
  "cancelled",
] as const;

export const COSTA_RICA_MIDNIGHT_CASES = [
  ["2035-04-13T06:00:00+00:00", "2035-04-13", "00:00"],
  ["2035-04-13T05:59:00+00:00", "2035-04-12", "23:59"],
] as const;

export const EXPECTED_CLOSED: ReservationPostponement = {
  ...EXPECTED_SCHEDULED,
  block: RESERVATION_POSTPONEMENT_BLOCK.NOT_POSTPONABLE,
  status: "closed",
};

export const EXPECTED_DATE_TIME_TEXT =
  "lunes, 2 de noviembre de 2026, 14:30";

export const NEXT_NOT_FOUND = "NEXT_NOT_FOUND";
export const NEXT_REDIRECT = "NEXT_REDIRECT";
export const POSTPONEMENT_CALENDAR_HREF =
  "/reservations/calendar";

export const POSTPONEMENT_DATE_CASES = [
  ["2026-11-02", "lunes, 2 de noviembre de 2026"],
  ["2027-01-01", "viernes, 1 de enero de 2027"],
] as const;
