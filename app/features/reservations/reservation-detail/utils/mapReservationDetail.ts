import type { ReservationDetail } from "../models/ReservationDetail.interface";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";
import type { ReservationDetailWorkerName } from "../models/ReservationDetailWorkerName.interface";
import { resolveReservationDetailChargeSummary } from "./resolveReservationDetailChargeSummary";
import { getReservationDetailWorkerName } from "./getReservationDetailWorkerName";
import { mapReservationDetailDispatches } from "./mapReservationDetailDispatches";
import { mapReservationDetailEquipment } from "./mapReservationDetailEquipment";
import { mapReservationDetailExtras } from "./mapReservationDetailExtras";
import { mapReservationDetailGuides } from "./mapReservationDetailGuides";

export const mapReservationDetail = (
  source: ReservationDetailReservationSource,
  workerNames: ReservationDetailWorkerName[]
): ReservationDetail => {
  const chargeSummary =
    resolveReservationDetailChargeSummary(
      source.parent_reservation_id,
      source.reservation_pricing,
      source.reservation_charges,
      source.refunds
    );

  return {
    cancellation_reason: source.cancellation_reason,
    chargeStatus: chargeSummary.status,
    charges: chargeSummary.charges,
    closed_at: source.closed_at,
    code: source.code,
    comboName: source.combo?.name ?? null,
    created_at: source.created_at,
    createdByName: getReservationDetailWorkerName(
      workerNames,
      source.created_by
    ),
    customer_name: source.customer_name,
    dispatched_at: source.dispatched_at,
    dispatches: mapReservationDetailDispatches(source),
    duration_minutes: source.duration_minutes,
    ends_at: source.ends_at,
    equipment: mapReservationDetailEquipment(source),
    extraTimeCharges: chargeSummary.extraTimeCharges,
    extras: mapReservationDetailExtras(source),
    guides: mapReservationDetailGuides(source, workerNames),
    id: source.id,
    parent_reservation_id: source.parent_reservation_id,
    people_count: source.people_count,
    refunds: chargeSummary.refunds,
    starts_at: source.starts_at,
    status: source.status,
    type: source.type,
    updated_at: source.updated_at,
    updatedByName: getReservationDetailWorkerName(
      workerNames,
      source.updated_by
    ),
  };
};
