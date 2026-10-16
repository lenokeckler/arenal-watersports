import { CLIENT_ADDRESS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ClientHeaders } from "./models/ClientHeaders.interface";

const readFirstHop = (value: string | null): string =>
  (value ?? "")
    .split(CLIENT_ADDRESS.SEPARATOR)[0]
    .trim()
    .toLowerCase();

export const readClientAddress = (
  headers: ClientHeaders
): NullableRef<string> => {
  for (const name of CLIENT_ADDRESS.HEADER_NAMES) {
    const address = readFirstHop(headers.get(name));

    if (address) {
      return address;
    }
  }

  return null;
};
