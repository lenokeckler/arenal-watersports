import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { ExtraCompatibilityUnits } from "../models/ExtraCompatibilityUnits.interface";
import { buildExtraCompatibilityUnits } from "../utils/buildExtraCompatibilityUnits";
import { fetchExtraCompatibilityCategory } from "./fetchExtraCompatibilityCategory";
import { fetchExtraCompatibilityExtra } from "./fetchExtraCompatibilityExtra";
import { fetchExtraLinkedUnitIds } from "./fetchExtraLinkedUnitIds";

export const getExtraCompatibilityUnits = async (
  extraId: string,
  categoryId: string
): Promise<NullableRef<ExtraCompatibilityUnits>> => {
  const supabase = await createServerSupabaseClient();

  const [extra, categoryRow] = await Promise.all([
    fetchExtraCompatibilityExtra(supabase, extraId),
    fetchExtraCompatibilityCategory(supabase, categoryId),
  ]);
  if (!extra || !categoryRow) {
    return null;
  }

  const linkedUnitIds = await fetchExtraLinkedUnitIds(
    supabase,
    extraId
  );

  return {
    extra,
    category: {
      id: categoryRow.id,
      name: categoryRow.name,
    },
    units: buildExtraCompatibilityUnits(
      categoryRow.equipment_units,
      new Set(linkedUnitIds)
    ),
  };
};
