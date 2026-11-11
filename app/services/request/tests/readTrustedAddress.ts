import type { NullableRef } from "@/app/types";
import type { ClientHeaders } from "../models/ClientHeaders.interface";
import { readClientAddress } from "../readClientAddress";

export const readTrustedAddress = (
  headers: ClientHeaders
): NullableRef<string> => readClientAddress(headers, true);
