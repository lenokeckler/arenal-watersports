import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

const MILLISECONDS_PER_HOUR = 3_600_000;
const MINUTES_PER_HOUR = 60;

export const createEquipmentHoursFixture = async (
  customerName: string,
  unitCode: string,
  hours: number
): Promise<void> => {
  const client = createServiceRoleClient();
  const { data: worker, error: workerError } = await client
    .from(E2E_SUPABASE_TABLE.WORKERS)
    .select("id")
    .eq("base_role", "administracion")
    .limit(1)
    .single();
  const { data: unit, error: unitError } = await client
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_UNITS)
    .select("id, category_id")
    .eq("code", unitCode)
    .single();

  if (workerError || !worker || unitError || !unit) {
    failE2eOperation(
      "find the worker and unit of the dispatch",
      workerError?.message ?? unitError?.message ?? "no row"
    );
    return;
  }

  const dispatchedAt = new Date(
    Date.now() - hours * MILLISECONDS_PER_HOUR * 2
  );
  const closedAt = new Date(
    dispatchedAt.getTime() + hours * MILLISECONDS_PER_HOUR
  );
  const audit = {
    created_by: worker.id,
    updated_by: worker.id,
  };

  const { data: reservation, error: reservationError } =
    await client
      .from(E2E_SUPABASE_TABLE.RESERVATIONS)
      .insert({
        ...audit,
        customer_name: customerName,
        duration_minutes: hours * MINUTES_PER_HOUR,
        people_count: 1,
        starts_at: dispatchedAt.toISOString(),
        status: "closed",
        type: "rental",
      })
      .select("id")
      .single();

  if (reservationError || !reservation) {
    failE2eOperation(
      "create the reservation",
      reservationError?.message ?? "no row"
    );
    return;
  }

  const { data: dispatch, error: dispatchError } =
    await client
      .from("reservation_dispatches")
      .insert({
        ...audit,
        category_id: unit.category_id,
        closed_at: closedAt.toISOString(),
        dispatched_at: dispatchedAt.toISOString(),
        duration_minutes: hours * MINUTES_PER_HOUR,
        reservation_id: reservation.id,
      })
      .select("id")
      .single();

  if (dispatchError || !dispatch) {
    failE2eOperation(
      "create the dispatch",
      dispatchError?.message ?? "no row"
    );
    return;
  }

  const { error: itemError } = await client
    .from(E2E_SUPABASE_TABLE.RESERVATION_ITEMS)
    .insert({
      ...audit,
      dispatch_id: dispatch.id,
      reservation_id: reservation.id,
      unit_id: unit.id,
    });

  if (itemError) {
    failE2eOperation(
      "create the dispatched unit",
      itemError.message
    );
  }
};
