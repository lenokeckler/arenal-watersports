import { E2E_REFRESH_GRANT } from "../constants/E2eLogoutToken.constants";
import type { RefreshGrantBody } from "./models/RefreshGrantBody.type";
import type { RefreshGrantResponse } from "./models/RefreshGrantResponse.interface";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

const readString = (
  body: RefreshGrantBody,
  field: string
): string | undefined => {
  const value = body[field];

  return typeof value === "string" ? value : undefined;
};

export const requestRefreshGrant = async (
  refreshToken: string
): Promise<RefreshGrantResponse> => {
  const { anonKey, url } = readLocalSupabaseEnvironment();
  const endpoint = new URL(E2E_REFRESH_GRANT.PATH, url);
  endpoint.searchParams.set(
    E2E_REFRESH_GRANT.GRANT_TYPE_PARAM,
    E2E_REFRESH_GRANT.GRANT_TYPE
  );
  const response = await fetch(endpoint, {
    body: JSON.stringify({
      [E2E_REFRESH_GRANT.REFRESH_TOKEN_FIELD]: refreshToken,
    }),
    headers: {
      [E2E_REFRESH_GRANT.API_KEY_HEADER]: anonKey,
      [E2E_REFRESH_GRANT.CONTENT_TYPE_HEADER]:
        E2E_REFRESH_GRANT.CONTENT_TYPE,
    },
    method: E2E_REFRESH_GRANT.METHOD,
  });
  const body: RefreshGrantBody = await response.json();

  return {
    accessToken: readString(
      body,
      E2E_REFRESH_GRANT.ACCESS_TOKEN_FIELD
    ),
    errorCode: readString(
      body,
      E2E_REFRESH_GRANT.ERROR_CODE_FIELD
    ),
    status: response.status,
  };
};
