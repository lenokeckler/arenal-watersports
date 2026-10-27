import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { Database } from "@/app/types";
import { validateDamageReportInput } from "./validateDamageReportInput";

export interface CreateDamageReportInput {
  unitId: string;
  cause: Database["public"]["Enums"]["damage_cause"];
  description: string;
  impactDelta: number;
}

export const createDamageReport = async (
  input: CreateDamageReportInput
): Promise<void> => {
  validateDamageReportInput(input);
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user found");
  }

  const { error } = await supabase
    .from("damage_reports")
    .insert({
      unit_id: input.unitId,
      cause: input.cause,
      description: input.description,
      impact_delta: input.impactDelta,
      created_by: user.id,
    });

  throwIfSupabaseError(error, "create damage report");
};
