import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import type { ExtraSeedInput } from "../models/ExtraSeedInput.interface";
import type { SeededExtra } from "../models/SeededExtra.interface";

export const insertExtra = async (
  name: string,
  input: Pick<ExtraSeedInput, "status">
): Promise<SeededExtra> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from("extras")
    .insert({
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      name,
      status: input.status,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    })
    .select("id")
    .single();
  throwIfSupabaseError(error, "insertExtra");
  if (!data) {
    throw new Error(
      `insertExtra: no row returned for ${name}`
    );
  }

  return { id: data.id, name };
};

export const removeExtras = async (
  extraIds: string[]
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const failures: Error[] = [];

  for (const extraId of extraIds) {
    const { error } = await supabase
      .from("extras")
      .delete()
      .eq("id", extraId);
    if (error) {
      failures.push(
        new Error(`removeExtras: ${extraId}`, {
          cause: error,
        })
      );
    }
  }

  if (failures.length > 0) {
    throw new AggregateError(
      failures,
      "removeExtras: some extras were not removed"
    );
  }
};
