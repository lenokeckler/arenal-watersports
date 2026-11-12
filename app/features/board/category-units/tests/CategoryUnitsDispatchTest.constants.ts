import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import {
  DEFAULT_CATEGORY_UNIT,
  OCCUPIED_CATEGORY_UNIT,
} from "./CategoryUnits.constants";

export const DISPATCH_CATEGORY_ID =
  "aaaaaaaa-0000-4000-8000-000000000001";

export const SECOND_AVAILABLE_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  code: "JS-03",
  id: "unit-03",
};

export const MAINTENANCE_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  code: "JS-04",
  id: "unit-04",
  status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
};

export const DISPATCH_UNITS: CategoryUnit[] = [
  DEFAULT_CATEGORY_UNIT,
  OCCUPIED_CATEGORY_UNIT,
  SECOND_AVAILABLE_UNIT,
  MAINTENANCE_UNIT,
];

export const CATEGORY_RESERVATION: CategoryDispatchReservation =
  {
    code: "R-000200",
    customerName: "Ana Mora",
    peopleCount: 2,
    requiredCount: 2,
    reservationId: "dddddddd-0000-4000-8000-000000000200",
    startsAt: "2026-11-02T20:00:00.000Z",
  };

export const SMALL_CATEGORY_RESERVATION: CategoryDispatchReservation =
  {
    ...CATEGORY_RESERVATION,
    code: "R-000201",
    customerName: "Luis Vega",
    requiredCount: 1,
    reservationId: "dddddddd-0000-4000-8000-000000000201",
  };

export const EXPECTED_PICKER_TIME = "14:00";
