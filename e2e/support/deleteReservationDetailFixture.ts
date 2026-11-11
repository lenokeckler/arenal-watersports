import type {
  SupabaseClient,
  PostgrestError,
} from "@supabase/supabase-js";
import type { Database, NullableRef } from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureDeleteResult } from "../models/ReservationDetailFixtureDeleteResult.interface";

const getDeleteError = (
  result: PromiseLike<ReservationDetailFixtureDeleteResult>
): PromiseLike<NullableRef<PostgrestError>> =>
  result.then(({ error }) => error);

const deleteMoneyRecords = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<NullableRef<PostgrestError>[]> => {
  const refundFailure = await getDeleteError(
    supabase
      .from("refunds")
      .delete()
      .eq("reservation_id", reservationId)
  );
  const chargeFailure = await getDeleteError(
    supabase
      .from("reservation_charges")
      .delete()
      .eq("reservation_id", reservationId)
  );
  return [refundFailure, chargeFailure];
};

const deleteOperationalRecords = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<NullableRef<PostgrestError>[]> => {
  const itemFailure = await getDeleteError(
    supabase
      .from("reservation_items")
      .delete()
      .eq("reservation_id", reservationId)
  );
  const guideFailure = await getDeleteError(
    supabase
      .from("reservation_guides")
      .delete()
      .eq("reservation_id", reservationId)
  );
  const dispatchFailure = await getDeleteError(
    supabase
      .from("reservation_dispatches")
      .delete()
      .eq("reservation_id", reservationId)
  );
  const pricingFailure = await getDeleteError(
    supabase
      .from("reservation_pricing")
      .delete()
      .eq("reservation_id", reservationId)
  );
  return [
    itemFailure,
    guideFailure,
    dispatchFailure,
    pricingFailure,
  ];
};

const deleteRelatedRecords = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<NullableRef<PostgrestError>[]> => {
  const moneyErrors = await deleteMoneyRecords(
    supabase,
    reservationId
  );
  const operationalErrors = await deleteOperationalRecords(
    supabase,
    reservationId
  );
  return [...moneyErrors, ...operationalErrors];
};

const collectFailures = (
  failures: NullableRef<PostgrestError>[]
): PostgrestError[] =>
  failures.filter(
    (failure): failure is PostgrestError => failure !== null
  );

const throwIfCleanupFailed = (
  failures: PostgrestError[]
): void => {
  if (failures.length > 0) {
    throw new Error(fixture.FAILURE, {
      cause: new AggregateError(failures),
    });
  }
};

export const deleteReservationDetailFixture = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<void> => {
  const failures = collectFailures(
    await deleteRelatedRecords(supabase, reservationId)
  );
  const reservationFailure = await getDeleteError(
    supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId)
  );
  if (reservationFailure !== null) {
    failures.push(reservationFailure);
  }
  throwIfCleanupFailed(failures);
};
