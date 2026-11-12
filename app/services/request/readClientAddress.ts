import {
  ADDRESS_FORMAT,
  CLIENT_ADDRESS,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { canonicalizeClientAddress } from "./canonicalizeClientAddress";
import type { ClientHeaders } from "./models/ClientHeaders.interface";

const readFirstHop = (value: string | null): string =>
  (value ?? ADDRESS_FORMAT.NO_TEXT)
    .split(CLIENT_ADDRESS.SEPARATOR)[0]
    .trim();

export const readClientAddress = (
  headers: ClientHeaders,
  trustAddressHeaders: boolean
): NullableRef<string> => {
  if (!trustAddressHeaders) {
    return null;
  }

  for (const name of CLIENT_ADDRESS.HEADER_NAMES) {
    const address = readFirstHop(headers.get(name));

    if (address) {
      return canonicalizeClientAddress(address);
    }
  }

  return null;
};
