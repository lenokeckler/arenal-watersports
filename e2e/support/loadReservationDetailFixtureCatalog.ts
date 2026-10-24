import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Database,
  NullableUndefined,
} from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureCatalog } from "../models/ReservationDetailFixtureCatalog.interface";
import type { ReservationDetailFixtureEquipment } from "../models/ReservationDetailFixtureEquipment.interface";
import type { ReservationDetailFixtureIdentifier } from "../models/ReservationDetailFixtureIdentifier.interface";
import type { ReservationDetailFixtureWorkers } from "../models/ReservationDetailFixtureWorkers.interface";
import { ensureReservationDetailFixtureLookup } from "./ensureReservationDetailFixtureLookup";

const getRequiredId = <
  Record extends ReservationDetailFixtureIdentifier,
>(
  value: NullableUndefined<Record>
): string => {
  if (value === undefined) {
    throw new Error(fixture.FAILURE);
  }
  return value.id;
};

const loadWorkers = async (
  supabase: SupabaseClient<Database>
): Promise<ReservationDetailFixtureWorkers> => {
  const [creatorResult, guideResult] = await Promise.all([
    supabase
      .from("workers")
      .select("id, full_name")
      .eq("username", fixture.CREATED_BY_USERNAME)
      .maybeSingle(),
    supabase
      .from("workers")
      .select("id, full_name")
      .eq("username", fixture.GUIDE_USERNAME)
      .maybeSingle(),
  ]);
  return {
    createdBy: ensureReservationDetailFixtureLookup(
      creatorResult,
      fixture.OPERATION.LOAD_CREATED_BY
    ),
    guide: ensureReservationDetailFixtureLookup(
      guideResult,
      fixture.OPERATION.LOAD_GUIDE
    ),
  };
};

const loadEquipmentCatalog = async (
  supabase: SupabaseClient<Database>
) => {
  const [categoriesResult, unitsResult] = await Promise.all(
    [
      supabase
        .from("equipment_categories")
        .select("id, name")
        .in("name", [
          fixture.FIRST_CATEGORY_NAME,
          fixture.SECOND_CATEGORY_NAME,
        ]),
      supabase
        .from("equipment_units")
        .select("id, code")
        .in("code", [
          fixture.FIRST_UNIT_CODE,
          fixture.SECOND_UNIT_CODE,
        ]),
    ]
  );
  return {
    categories: ensureReservationDetailFixtureLookup(
      categoriesResult,
      fixture.OPERATION.LOAD_CATEGORIES
    ),
    units: ensureReservationDetailFixtureLookup(
      unitsResult,
      fixture.OPERATION.LOAD_UNITS
    ),
  };
};

const loadEquipmentIds = async (
  supabase: SupabaseClient<Database>
): Promise<ReservationDetailFixtureEquipment> => {
  const { categories, units } =
    await loadEquipmentCatalog(supabase);
  return {
    firstCategoryId: getRequiredId(
      categories.find(
        ({ name }) => name === fixture.FIRST_CATEGORY_NAME
      )
    ),
    firstUnitId: getRequiredId(
      units.find(
        ({ code }) => code === fixture.FIRST_UNIT_CODE
      )
    ),
    secondCategoryId: getRequiredId(
      categories.find(
        ({ name }) => name === fixture.SECOND_CATEGORY_NAME
      )
    ),
    secondUnitId: getRequiredId(
      units.find(
        ({ code }) => code === fixture.SECOND_UNIT_CODE
      )
    ),
  };
};

const loadExtraId = async (
  supabase: SupabaseClient<Database>
): Promise<string> => {
  const result = await supabase
    .from("extras")
    .select("id")
    .eq("name", fixture.EXTRA_NAME)
    .maybeSingle();
  return getRequiredId(
    ensureReservationDetailFixtureLookup(
      result,
      fixture.OPERATION.LOAD_EXTRA
    )
  );
};

export const loadReservationDetailFixtureCatalog = async (
  supabase: SupabaseClient<Database>
): Promise<ReservationDetailFixtureCatalog> => {
  const [workers, equipment, extraId] = await Promise.all([
    loadWorkers(supabase),
    loadEquipmentIds(supabase),
    loadExtraId(supabase),
  ]);
  return {
    createdById: workers.createdBy.id,
    createdByName: workers.createdBy.full_name,
    extraId,
    firstCategoryId: equipment.firstCategoryId,
    firstUnitId: equipment.firstUnitId,
    guideId: workers.guide.id,
    guideName: workers.guide.full_name,
    secondCategoryId: equipment.secondCategoryId,
    secondUnitId: equipment.secondUnitId,
  };
};
