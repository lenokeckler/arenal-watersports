import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { RESERVATION_EQUIPMENT_UNIT_STATUS } from "../constants/ReservationEquipmentUnitStatus.constants";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import { getOccupiedReservationUnitIds } from "../utils/getOccupiedReservationUnitIds";

const loadUnits = async (
  supabase: SupabaseClient<Database>,
  categoryId: string
) => {
  const { data: units, error } = await supabase
    .from("equipment_units")
    .select("id, code")
    .eq("category_id", categoryId)
    .eq(
      "status",
      RESERVATION_EQUIPMENT_UNIT_STATUS.AVAILABLE
    )
    .order("code");
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.UNITS
  );
  return units ?? [];
};

const loadUnitCommitments = async (
  supabase: SupabaseClient<Database>,
  unitIds: string[]
): Promise<ReservationUnitCommitment[]> => {
  const { data: commitments, error } = await supabase
    .from("reservation_items")
    .select(
      "unit_id, reservation:reservations!inner(starts_at, ends_at), dispatch:reservation_dispatches(closed_at, dispatched_at)"
    )
    .in("unit_id", unitIds)
    .in(
      "reservation.status",
      RESERVATION_AVAILABILITY.RESERVATION_STATUSES
    );
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.UNITS
  );
  return commitments ?? [];
};

export const getAvailableConcreteReservationUnits = async (
  supabase: SupabaseClient<Database>,
  categoryId: string,
  startsAt: string,
  endsAt: string
) => {
  const units = await loadUnits(supabase, categoryId);
  if (!units.length) {
    return [];
  }
  const commitments = await loadUnitCommitments(
    supabase,
    units.map((unit) => unit.id)
  );
  const occupiedUnitIds = getOccupiedReservationUnitIds(
    commitments,
    startsAt,
    endsAt
  );
  return units.filter(
    (unit) => !occupiedUnitIds.has(unit.id)
  );
};
