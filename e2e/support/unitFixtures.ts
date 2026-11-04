import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { UNIT_STATUS } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import type { EquipmentUnitRow } from "@/app/features/administration/unit-catalog/models/EquipmentUnitRow.type";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { E2E_UNIT_DECOMMISSION_REASON } from "../constants/E2eCategoryUnits.constants";
import type { CategoryFixtureBehavior } from "../models/CategoryFixtureBehavior.interface";
import type { UnitFixtureSeed } from "../models/UnitFixtureSeed.interface";
import {
  findCategoryId,
  seedCategoryWithBehavior,
} from "./categoryFixtures";

const buildUnitRow = (
  categoryId: string,
  unit: UnitFixtureSeed
) => {
  const isDecommissioned =
    unit.status === UNIT_STATUS.DECOMMISSIONED;

  return {
    category_id: categoryId,
    code: unit.code,
    created_by: E2E_ADMIN_ACCOUNT.workerId,
    decommission_reason: isDecommissioned
      ? E2E_UNIT_DECOMMISSION_REASON
      : null,
    decommissioned_at: isDecommissioned
      ? new Date().toISOString()
      : null,
    status: unit.status,
    updated_by: E2E_ADMIN_ACCOUNT.workerId,
  };
};

export const removeCategoryWithUnits = async (
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const { data: category, error: selectError } =
    await supabase
      .from("equipment_categories")
      .select("id")
      .eq("name", categoryName)
      .maybeSingle();
  throwIfSupabaseError(
    selectError,
    "removeCategory.select"
  );
  if (!category) {
    return;
  }

  const { error: unitsError } = await supabase
    .from("equipment_units")
    .delete()
    .eq("category_id", category.id);
  throwIfSupabaseError(unitsError, "removeCategory.units");

  const { error: categoryError } = await supabase
    .from("equipment_categories")
    .delete()
    .eq("id", category.id);
  throwIfSupabaseError(
    categoryError,
    "removeCategory.delete"
  );
};

const insertUnits = async (
  categoryName: string,
  units: UnitFixtureSeed[]
): Promise<void> => {
  const categoryId = await findCategoryId(categoryName);
  const { error } = await createServiceRoleSupabaseClient()
    .from("equipment_units")
    .insert(
      units.map((unit) => buildUnitRow(categoryId, unit))
    );
  throwIfSupabaseError(
    error,
    "seedCategoryWithUnits.insert"
  );
};

export const seedCategoryWithUnits = async (
  categoryName: string,
  behavior: Partial<CategoryFixtureBehavior>,
  units: UnitFixtureSeed[]
): Promise<void> => {
  await removeCategoryWithUnits(categoryName);
  await seedCategoryWithBehavior(categoryName, behavior);

  if (units.length > 0) {
    await insertUnits(categoryName, units);
  }
};

export const readUnit = async (
  code: string
): Promise<EquipmentUnitRow> => {
  const { data: unit, error } =
    await createServiceRoleSupabaseClient()
      .from("equipment_units")
      .select("*")
      .eq("code", code)
      .single();
  throwIfSupabaseError(error, "readUnit");
  if (!unit) {
    throw new Error(`readUnit: no unit coded ${code}`);
  }

  return unit;
};

export const countUnitsOfCategory = async (
  categoryName: string
): Promise<number> => {
  const { count, error } =
    await createServiceRoleSupabaseClient()
      .from("equipment_units")
      .select("id", { count: "exact", head: true })
      .eq(
        "category_id",
        await findCategoryId(categoryName)
      );
  throwIfSupabaseError(error, "countUnitsOfCategory");

  return safeNumber(count);
};
