import {
  NETWORK_KEY,
  NETWORK_KEY_ERROR_CODE,
} from "@/app/constants";
import { NetworkKeyError } from "./NetworkKeyError";

export const readNetworkKeySecret = (): string => {
  const secret =
    process.env[
      NETWORK_KEY.SECRET_ENVIRONMENT_NAME
    ]?.trim() ?? "";

  if (!secret) {
    throw new NetworkKeyError(
      NETWORK_KEY_ERROR_CODE.SECRET_MISSING
    );
  }

  if (secret.length < NETWORK_KEY.MINIMUM_SECRET_LENGTH) {
    throw new NetworkKeyError(
      NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT
    );
  }

  return secret;
};
