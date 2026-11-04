import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import {
  E2E_AUTH_ERROR,
  E2E_AUTH_FLOW,
  E2E_SUPABASE_AUTH_OPTIONS,
} from "../constants/E2eInventory.constants";
import { createLocalInventoryClient } from "./createLocalInventoryClient";

const createInventoryAuthToken = async (
  username: string
): Promise<string> => {
  const { data, error } =
    await createLocalInventoryClient().auth.admin.generateLink(
      {
        email: toAuthEmail(username),
        type: E2E_AUTH_FLOW.LINK_TYPE,
      }
    );
  if (error) {
    throw new Error(E2E_AUTH_ERROR.LINK, { cause: error });
  }
  return data.properties.hashed_token;
};
export const createInventoryAuthSession = async (
  username: string
) => {
  const tokenHash =
    await createInventoryAuthToken(username);
  const client = createClient(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    { auth: E2E_SUPABASE_AUTH_OPTIONS }
  );
  const { data, error } = await client.auth.verifyOtp({
    token_hash: tokenHash,
    type: E2E_AUTH_FLOW.OTP_TYPE,
  });
  if (error || !data.session) {
    throw new Error(E2E_AUTH_ERROR.SESSION, {
      cause: error,
    });
  }
  return data.session;
};
