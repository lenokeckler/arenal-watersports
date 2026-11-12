import { randomUUID } from "node:crypto";
import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { getCostaRicaDayRange } from "@/app/components/dispatch-board/utils/getCostaRicaDayRange";
import {
  E2E_DISPATCH_READINGS,
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_SEED,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { createInventoryCategoryFixture } from "./createInventoryCategoryFixture";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";
import { makeMaintenanceNeeds } from "./makeMaintenanceNeeds";
import { makeDispatchLate } from "./makeDispatchLate";
import { addMaintenanceJobs } from "./addMaintenanceJobs";
import { addDamageReports } from "./addDamageReports";
import { readUnitCorrection } from "./readUnitCorrection";
import { addUnitPhoto } from "./addUnitPhoto";
import {
  grantGeneralManagerMark,
  removeGeneralManagerMark,
} from "./grantGeneralManagerMark";
import { readUnitPhotos } from "./readUnitPhotos";
import { removeUnitPhotos } from "./removeUnitPhotos";
import { removeUnitCorrections } from "./removeUnitCorrections";
import { readUnitId } from "./readUnitId";
import { removeDamageReports } from "./removeDamageReports";
import { readMaintenanceJobs } from "./readMaintenanceJobs";
import { removeMaintenanceJobs } from "./removeMaintenanceJobs";
import { readGroupClosing } from "./readGroupClosing";
import { readDispatchDuration } from "./readDispatchDuration";
import { readDispatchReadings } from "./readDispatchReadings";
import { readDispatchSheetState } from "./readDispatchSheetState";
import { removeDispatchSheetFixture } from "./removeDispatchSheetFixture";

interface DispatchSheetFixtureOptions {
  hasMotor?: boolean;
  isOnBoard?: boolean;
}

export const createDispatchSheetFixture = async (
  workerId: string,
  {
    hasMotor = false,
    isOnBoard = false,
  }: DispatchSheetFixtureOptions = {}
): Promise<DispatchSheetFixture> => {
  const audit = {
    created_by: workerId,
    updated_by: workerId,
  };
  const supabase = createServiceRoleClient();
  const category = await createInventoryCategoryFixture(
    INVENTORY_TRACKING_MODE.BY_UNIT,
    `${E2E_DISPATCH_SHEET_SEED.CATEGORY_NAME_PREFIX} ${randomUUID()}`
  );
  const suffix = randomUUID().slice(0, 8);
  const unitCodes = Array.from(
    { length: E2E_DISPATCH_SHEET_SEED.UNIT_COUNT },
    (_, index) =>
      `${E2E_DISPATCH_SHEET_SEED.UNIT_CODE_PREFIX}-${suffix}-${index + 1}`
  );
  const customerName = buildE2eCustomerName();

  if (hasMotor || isOnBoard) {
    const motor = await supabase
      .from(E2E_DISPATCH_SHEET_TABLE.CATEGORIES)
      .update({
        ...(hasMotor && {
          consumes_fuel: true,
          has_condition_photos: true,
          has_motor: true,
          usage_metric: "engine_hours",
        }),
        ...(isOnBoard && {
          default_duration_minutes:
            E2E_DISPATCH_SHEET_SEED.DURATION_MINUTES,
          is_reservable: true,
        }),
      })
      .eq("id", category.id);

    if (motor.error) {
      await category.cleanup();

      return failE2eOperation(
        E2E_DISPATCH_SHEET_ERROR.OPERATION_MARK_MOTOR,
        motor.error.message
      );
    }
  }

  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .insert(
      unitCodes.map((code) => ({
        ...audit,
        category_id: category.id,
        code,
        ...(hasMotor && {
          fuel_level: E2E_DISPATCH_READINGS.LAST_FUEL,
          usage_total: E2E_DISPATCH_READINGS.LAST_USAGE,
        }),
      }))
    );

  if (units.error) {
    await category.cleanup();

    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_INSERT_UNITS,
      units.error.message
    );
  }

  const reservation = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.RESERVATIONS)
    .insert({
      ...audit,
      customer_name: customerName,
      duration_minutes:
        E2E_DISPATCH_SHEET_SEED.DURATION_MINUTES,
      people_count: E2E_DISPATCH_SHEET_SEED.PEOPLE_COUNT,
      starts_at: getCostaRicaDayRange(new Date()).startsAt,
      type: E2E_DISPATCH_SHEET_SEED.TYPE,
    })
    .select("id")
    .single();

  if (reservation.error) {
    await category.cleanup();

    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_INSERT_RESERVATION,
      reservation.error.message
    );
  }

  const reservationId = reservation.data.id;
  const item = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.ITEMS)
    .insert({
      ...audit,
      category_id: category.id,
      quantity: E2E_DISPATCH_SHEET_SEED.COMMITTED_QUANTITY,
      reservation_id: reservationId,
    });

  if (item.error) {
    await removeDispatchSheetFixture(
      supabase,
      reservationId
    );
    await category.cleanup();

    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_INSERT_ITEM,
      item.error.message
    );
  }

  return {
    categoryId: category.id,
    categoryName: category.name,
    customerName,
    makeMaintenanceNeeds: () =>
      makeMaintenanceNeeds(supabase, unitCodes),
    makeDispatchLate: (minutesLate) =>
      makeDispatchLate(
        supabase,
        reservationId,
        minutesLate
      ),
    addMaintenanceJobs: () =>
      addMaintenanceJobs(supabase, unitCodes, workerId),
    addDamageReports: () =>
      addDamageReports(supabase, unitCodes, workerId),
    readUnitId: (code) => readUnitId(supabase, code),
    addUnitPhoto: (code, angle) =>
      addUnitPhoto(supabase, code, angle, workerId),
    grantGeneralManagerMark: () =>
      grantGeneralManagerMark(supabase, workerId),
    readUnitPhotos: (code) =>
      readUnitPhotos(supabase, code),
    readUnitCorrection: (code) =>
      readUnitCorrection(supabase, code),
    readMaintenanceJobs: () =>
      readMaintenanceJobs(supabase, unitCodes),
    readGroupClosing: () =>
      readGroupClosing(supabase, reservationId, unitCodes),
    readDispatchDuration: () =>
      readDispatchDuration(supabase, reservationId),
    readDispatchReadings: () =>
      readDispatchReadings(
        supabase,
        reservationId,
        unitCodes
      ),
    readDispatchState: () =>
      readDispatchSheetState(supabase, reservationId),
    remove: async () => {
      await removeMaintenanceJobs(supabase, unitCodes);
      await removeDamageReports(supabase, unitCodes);
      await removeUnitCorrections(supabase, unitCodes);
      await removeUnitPhotos(supabase, unitCodes);
      await removeGeneralManagerMark(supabase, workerId);
      await removeDispatchSheetFixture(
        supabase,
        reservationId
      );
      await category.cleanup();
    },
    reservationId,
    unitCodes,
  };
};
