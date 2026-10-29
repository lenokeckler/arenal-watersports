import { createHmac } from "node:crypto";
import {
  CLIENT_ADDRESS,
  NETWORK_KEY,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const deriveClientNetworkKey = (
  address: NullableRef<string>,
  secret: string
): string =>
  createHmac(NETWORK_KEY.HMAC_ALGORITHM, secret)
    .update(address ?? CLIENT_ADDRESS.UNKNOWN_BUCKET)
    .digest(NETWORK_KEY.DIGEST_ENCODING);
