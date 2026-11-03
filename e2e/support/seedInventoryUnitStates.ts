import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  E2E_INVENTORY_SCENARIO,
  E2E_INVENTORY_UNIT_STATES,
  E2E_INVENTORY_UNIT_SEED_SELECT,
} from "../constants/E2eInventoryScenario.constants";
import type { E2eInventoryFixture } from "../models/E2eInventoryFixture.type";

export const seedInventoryUnitStates = async (
  fixture: E2eInventoryFixture
) => {
  const units = E2E_INVENTORY_UNIT_STATES.map((status) => ({
    category_id: fixture.id,
    code: `${E2E_INVENTORY_SCENARIO.UNIT_CODE_PREFIX}${status}`,
    created_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
    status,
    updated_by: E2E_INVENTORY_SCENARIO.ADMIN_ID,
  }));
  const { data, error } = await fixture.client
    .from(INVENTORY_DATA_SOURCE.EQUIPMENT_UNITS_TABLE)
    .insert(units)
    .select(E2E_INVENTORY_UNIT_SEED_SELECT);
  throwIfSupabaseError(error, fixture.name);
  if (data === null) {
    throw new Error(
      E2E_INVENTORY_SCENARIO.MISSING_UNIT_INSERT_RESULT
    );
  }

  const idsByCode = new Map(
    data.map(({ code, id }) => [code, id])
  );
  return units.map((unit) => {
    const id = idsByCode.get(unit.code);
    if (!id) {
      throw new Error(
        E2E_INVENTORY_SCENARIO.MISSING_UNIT_INSERT_RESULT
      );
    }
    return { ...unit, id };
  });
};
