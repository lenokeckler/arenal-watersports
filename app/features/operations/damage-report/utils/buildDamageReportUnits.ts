import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type {
  DamageReportOpenRow,
  DamageReportTripRow,
  DamageReportUnitRow,
} from "../models/DamageReportRows.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

const buildWhen = (instant: string): string =>
  `${formatShortDay(toCostaRicaDate(instant))} ${getCostaRicaTime(new Date(instant))}`;

export const buildDamageReportUnits = (
  units: DamageReportUnitRow[],
  trips: DamageReportTripRow[],
  open: DamageReportOpenRow[],
  buildLabel: (when: string, customer: string) => string
): DamageReportUnit[] => {
  const outIds = new Set(open.map((row) => row.unit_id));
  const newestFirst = [...trips].sort((first, second) =>
    safeString(
      second.dispatch?.dispatched_at
    ).localeCompare(
      safeString(first.dispatch?.dispatched_at)
    )
  );

  return units.map((unit) => ({
    categoryName: unit.category.name,
    code: unit.code,
    id: unit.id,
    impactCount: unit.impact_count,
    isOut: outIds.has(unit.id),
    status: unit.status,
    trips: newestFirst
      .filter(
        (trip) => trip.unit_id === unit.id && trip.dispatch
      )
      .map((trip) => ({
        label: buildLabel(
          buildWhen(
            safeString(trip.dispatch?.dispatched_at)
          ),
          trip.reservation.customer_name
        ),
        reservationId: trip.reservation_id,
      })),
  }));
};
