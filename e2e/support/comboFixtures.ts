import { RESERVATION_TYPE } from "@/app/constants";
import { CATEGORY_STATUS } from "@/app/features/administration/category-catalog/constants/CategoryStatus.constants";
import { COMBO_AUDIENCE } from "@/app/features/administration/combo-catalog/constants/ComboAudience.constants";
import { COMBO_AUDIENCE_CURRENCY } from "@/app/features/administration/combo-catalog/constants/ComboAudienceCurrency.constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_COMBO_SEED } from "../constants/E2eComboList.constants";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { E2E_DEPOSIT_RESERVATION } from "../constants/E2ePendingDeposits.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import type { ComboSeedInput } from "../models/ComboSeedInput.interface";
import type { SeededCombo } from "../models/SeededCombo.interface";
import { buildE2eCustomerName } from "./buildE2eCustomerName";

const requireRow = <Row>(
  row: Row | null,
  operation: string
): Row => {
  if (!row) {
    throw new Error(`${operation}: no row returned`);
  }

  return row;
};

const loadActiveCategory = async () => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
    .select("id, name")
    .eq(E2E_SUPABASE_COLUMN.STATUS, CATEGORY_STATUS.ACTIVE)
    .order("name")
    .limit(1)
    .single();
  throwIfSupabaseError(error, "loadActiveCategory");

  return requireRow(data, "loadActiveCategory");
};

export const insertCombo = async (
  name: string,
  input: Omit<ComboSeedInput, "scenario">
): Promise<SeededCombo> => {
  const supabase = createServiceRoleSupabaseClient();
  const category = await loadActiveCategory();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.COMBOS)
    .insert({
      audience: input.audience,
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      name,
      package_price_crc:
        input.audience === COMBO_AUDIENCE.NATIONAL
          ? input.price
          : null,
      package_price_usd:
        input.audience === COMBO_AUDIENCE.FOREIGN
          ? input.price
          : null,
      status: input.status,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    })
    .select("id")
    .single();
  throwIfSupabaseError(error, "insertCombo");
  const combo = requireRow(data, "insertCombo");

  const items = await supabase
    .from(E2E_SUPABASE_TABLE.COMBO_ITEMS)
    .insert({
      category_id: category.id,
      combo_id: combo.id,
      quantity: E2E_COMBO_SEED.ITEM_QUANTITY,
    });
  throwIfSupabaseError(items.error, "insertComboItems");

  return {
    id: combo.id,
    itemsSummary: `${E2E_COMBO_SEED.ITEM_QUANTITY.toString()} ${category.name}`,
    name,
    priceLabel: formatMoney({
      amount: input.price,
      currency: COMBO_AUDIENCE_CURRENCY[input.audience],
    }),
  };
};

export const insertComboSale = async (
  comboId: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert({
      combo_id: comboId,
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      customer_name: buildE2eCustomerName(),
      duration_minutes:
        E2E_DEPOSIT_RESERVATION.DURATION_MINUTES,
      people_count: E2E_DEPOSIT_RESERVATION.PEOPLE_COUNT,
      starts_at: E2E_DEPOSIT_RESERVATION.STARTS_AT,
      type: RESERVATION_TYPE.COMBO,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    })
    .select("id")
    .single();
  throwIfSupabaseError(error, "insertComboSale");

  return requireRow(data, "insertComboSale").id;
};

export const removeComboSales = async (
  comboIds: string[]
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .in(E2E_SUPABASE_COLUMN.COMBO_ID, comboIds);
  throwIfSupabaseError(error, "removeComboSales");
};

export const removeCombos = async (
  comboIds: string[]
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const items = await supabase
    .from(E2E_SUPABASE_TABLE.COMBO_ITEMS)
    .delete()
    .in(E2E_SUPABASE_COLUMN.COMBO_ID, comboIds);
  throwIfSupabaseError(items.error, "removeComboItems");

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.COMBOS)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, comboIds);
  throwIfSupabaseError(error, "removeCombos");
};

export const comboExists = async (
  comboId: string
): Promise<boolean> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.COMBOS)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(E2E_SUPABASE_COLUMN.ID, comboId)
    .maybeSingle();
  throwIfSupabaseError(error, "comboExists");

  return data !== null;
};
