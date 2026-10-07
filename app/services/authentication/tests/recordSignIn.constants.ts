import { PostgrestError } from "@supabase/supabase-js";

export const SIGNED_IN_USER_ID =
  "00000000-0000-0000-0000-000000000009";

export const RPC_FAILURE = new PostgrestError({
  code: "XX000",
  details: "",
  hint: "",
  message: "rpc failed",
});

export const OTHER_USERNAME = "someoneelse";
