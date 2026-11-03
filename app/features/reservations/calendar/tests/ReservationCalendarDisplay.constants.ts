import type { ReservationCalendarEntry } from "@/app/components/reservation-calendar/models/ReservationCalendarEntry.interface";
import type { ReservationCalendarDispatch } from "@/app/components/reservation-calendar/models/ReservationCalendarDispatch.interface";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";

export const CALENDAR_BLOCK_ENTRY: ReservationCalendarEntry =
  {
    ...mapReservationCalendarEntry(CALENDAR_RESERVATION),
    customerName:
      "María José de los Ángeles Fernández Rodríguez",
    dispatches: [
      {
        categoryId: "kayak",
        categoryName: "Kayak doble",
        closedAt: "2026-10-14T17:30:00Z",
        endsAt: "2026-10-14T17:15:00Z",
        id: "closed-group",
        startsAt: "2026-10-14T16:15:00Z",
      },
      {
        categoryId: "jet-ski",
        categoryName: "Moto acuática",
        closedAt: null,
        endsAt: null,
        id: "open-group",
        startsAt: "2026-10-14T18:00:00Z",
      },
    ],
    equipment: [
      {
        categoryId: "kayak",
        categoryName:
          "Kayak doble de travesía para dos personas",
        quantity: 12,
        unitCode: null,
      },
      {
        categoryId: "jet-ski",
        categoryName: "Moto acuática de turismo",
        quantity: 1,
        unitCode: "JS-00000003",
      },
    ],
  };

export const CALENDAR_BLOCK_EXPECTED = {
  ACTUAL_LABELS: [
    "Kayak doble. Salida real: 14 de octubre de 2026, 10:15. Regreso esperado: 14 de octubre de 2026, 11:15. Regreso real: 14 de octubre de 2026, 11:30",
    "Moto acuática. Salida real: 14 de octubre de 2026, 12:00. Regreso esperado: Sin hora prevista. Regreso real: Sin regreso registrado",
  ],
  ACTUAL_DEPARTURE:
    "Salida real: 14 de octubre de 2026, 10:15",
  ACTUAL_RETURN:
    "Regreso real: 14 de octubre de 2026, 11:30",
  BEFORE_MIDNIGHT: "13 de octubre de 2026, 23:59",
  EQUIPMENT:
    "12 × Kayak doble de travesía para dos personas, Moto acuática de turismo JS-00000003",
  EXPECTED_RETURN:
    "Regreso esperado: 14 de octubre de 2026, 11:15",
  MIDNIGHT: "14 de octubre de 2026, 00:00",
  MISSING_ACTUAL_RETURN:
    "Kayak doble. Salida real: 14 de octubre de 2026, 10:15. Regreso esperado: 14 de octubre de 2026, 11:15. Regreso real: Sin regreso registrado",
  MISSING_EXPECTED_RETURN:
    "Kayak doble. Salida real: 14 de octubre de 2026, 10:15. Regreso esperado: Sin hora prevista. Regreso real: 14 de octubre de 2026, 11:30",
  NEXT_DAY: "15 de octubre de 2026, 00:00",
  SCHEDULED:
    "Horario agendado: 14 de octubre de 2026, 10:00 – 14 de octubre de 2026, 11:00",
} as const;

export const CALENDAR_BLOCK_INSTANT = {
  BEFORE_MIDNIGHT: "2026-10-14T05:59:00Z",
  MIDNIGHT: "2026-10-14T06:00:00Z",
  NEXT_DAY: "2026-10-15T06:00:00Z",
} as const;

export const CALENDAR_BLOCK_CLOSED_DISPATCH: ReservationCalendarDispatch =
  CALENDAR_BLOCK_ENTRY.dispatches[0];

export const CALENDAR_BLOCK_MIDNIGHT_OFFSETS = [
  "2026-10-14T00:00:00-06:00",
  "2026-10-14T08:00:00+02:00",
] as const;
