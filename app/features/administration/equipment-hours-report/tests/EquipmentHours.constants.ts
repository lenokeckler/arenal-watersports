import type { EquipmentHoursCategory } from "../models/EquipmentHours.interface";

export const EQUIPMENT_HOURS_TEST = {
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
} as const;

export const EQUIPMENT_HOURS_ROWS = [
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
    categoryName: "Kayak doble",
    code: "KD-02",
    dispatchCount: 0,
    hours: 0,
    lastDispatchedAt: null,
    unitId: "bbbbbbbb-0000-0000-0000-000000000002",
  },
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
    categoryName: "Kayak doble",
    code: "KD-01",
    dispatchCount: 3,
    hours: 4.5,
    lastDispatchedAt: "2026-11-02T15:00:00+00:00",
    unitId: "bbbbbbbb-0000-0000-0000-000000000001",
  },
  {
    categoryId: "aaaaaaaa-0000-0000-0000-000000000000",
    categoryName: "Jet Ski",
    code: "JET-01",
    dispatchCount: 1,
    hours: 1,
    lastDispatchedAt: "2026-10-01T15:00:00+00:00",
    unitId: "bbbbbbbb-0000-0000-0000-000000000003",
  },
];

export const EQUIPMENT_HOURS_CATEGORIES: EquipmentHoursCategory[] =
  [
    {
      categoryId: "aaaaaaaa-0000-0000-0000-000000000000",
      name: "Jet Ski",
      units: [
        {
          code: "JET-01",
          dispatchCount: 1,
          hours: 1,
          lastDispatchedAt: "2026-10-01T15:00:00+00:00",
          unitId: "bbbbbbbb-0000-0000-0000-000000000003",
        },
      ],
    },
    {
      categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
      name: "Kayak doble",
      units: [
        {
          code: "KD-01",
          dispatchCount: 3,
          hours: 4.5,
          lastDispatchedAt: "2026-11-02T15:00:00+00:00",
          unitId: "bbbbbbbb-0000-0000-0000-000000000001",
        },
        {
          code: "KD-02",
          dispatchCount: 0,
          hours: 0,
          lastDispatchedAt: null,
          unitId: "bbbbbbbb-0000-0000-0000-000000000002",
        },
      ],
    },
  ];
