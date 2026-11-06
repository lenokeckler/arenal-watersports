import { PostgrestError } from "@supabase/supabase-js";

export const buildPostgrestError = (
  code: string
): PostgrestError =>
  new PostgrestError({
    code,
    details: "",
    hint: "",
    message: "boom",
  });
