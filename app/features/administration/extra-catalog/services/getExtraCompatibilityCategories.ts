import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { ExtraCompatibilityCategories } from "../models/ExtraCompatibilityCategories.interface";
import { buildExtraCompatibilityCategories } from "../utils/buildExtraCompatibilityCategories";
import { fetchExtraCompatibilityCategories } from "./fetchExtraCompatibilityCategories";
import { fetchExtraCompatibilityExtra } from "./fetchExtraCompatibilityExtra";
import { fetchExtraLinkedUnitIds } from "./fetchExtraLinkedUnitIds";

export const getExtraCompatibilityCategories = async (
  extraId: string
): Promise<NullableRef<ExtraCompatibilityCategories>> => {
  const supabase = await createServerSupabaseClient();

  const extra = await fetchExtraCompatibilityExtra(
    supabase,
    extraId
  );
  if (!extra) {
    return null;
  }

  const [categoryRows, linkedUnitIds] = await Promise.all([
    fetchExtraCompatibilityCategories(supabase),
    fetchExtraLinkedUnitIds(supabase, extraId),
  ]);

  return {
    extra,
    categories: buildExtraCompatibilityCategories(
      categoryRows,
      new Set(linkedUnitIds)
    ),
  };
};
