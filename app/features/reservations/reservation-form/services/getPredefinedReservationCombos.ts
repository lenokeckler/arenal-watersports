import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  PREDEFINED_COMBO_INTERCHANGEABILITY,
  PREDEFINED_COMBO_RESERVABILITY,
  PREDEFINED_COMBO_STATUS,
} from "../constants/PredefinedCombo.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type {
  PredefinedComboCategoryRecord,
  PredefinedComboItemRecord,
  PredefinedComboQueryRecords,
} from "../models/PredefinedComboQueryRecords.interface";
import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { mapPredefinedComboRecords } from "../utils/mapPredefinedComboRecords";

const getComboItems = async (
  supabase: SupabaseClient<Database>,
  comboIds: string[]
): Promise<PredefinedComboItemRecord[]> => {
  const { data, error } = await supabase
    .from("combo_items")
    .select("combo_id, category_id, quantity")
    .in("combo_id", comboIds);
  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_PREDEFINED_COMBOS
  );
  return data ?? [];
};

const getActiveCategories = async (
  supabase: SupabaseClient<Database>,
  categoryIds: string[]
): Promise<PredefinedComboCategoryRecord[]> => {
  const { data, error } = await supabase
    .from("equipment_categories")
    .select(
      "id, name, status, is_reservable, units_are_interchangeable"
    )
    .in("id", categoryIds)
    .eq("status", PREDEFINED_COMBO_STATUS.ACTIVE)
    .eq(
      "is_reservable",
      PREDEFINED_COMBO_RESERVABILITY.RESERVABLE
    )
    .eq(
      "units_are_interchangeable",
      PREDEFINED_COMBO_INTERCHANGEABILITY.INTERCHANGEABLE
    );
  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_PREDEFINED_COMBOS
  );
  return data ?? [];
};

export const getPredefinedReservationCombos =
  async (): Promise<ReservationPredefinedCombo[]> => {
    const supabase =
      await getAuthorizedReservationFormClient();
    const { data: combos, error } = await supabase
      .from("combos")
      .select(
        "id, name, status, audience, package_price_crc, package_price_usd"
      )
      .eq("status", PREDEFINED_COMBO_STATUS.ACTIVE)
      .order("name");
    throwIfSupabaseError(
      error,
      RESERVATION_SERVICE_OPERATION.LOAD_PREDEFINED_COMBOS
    );
    if (!combos?.length) {
      return [];
    }

    const comboItems = await getComboItems(
      supabase,
      combos.map((combo) => combo.id)
    );
    if (!comboItems.length) {
      return [];
    }

    const categoryIds = Array.from(
      new Set(
        comboItems.map((comboItem) => comboItem.category_id)
      )
    );
    const categories = await getActiveCategories(
      supabase,
      categoryIds
    );
    const records: PredefinedComboQueryRecords = {
      categories,
      comboItems,
      combos,
    };
    return mapPredefinedComboRecords(records);
  };
