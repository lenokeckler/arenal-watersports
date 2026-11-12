import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";

export const createCustomComboPostgrestError = (
  message: string,
  code: string = POSTGRES_ERROR_CODE.RAISE_EXCEPTION
): PostgrestError => ({
  code,
  details: "",
  hint: "",
  message,
  name: "PostgrestError",
  toJSON: () => ({
    code,
    details: "",
    hint: "",
    message,
    name: "PostgrestError",
  }),
});
