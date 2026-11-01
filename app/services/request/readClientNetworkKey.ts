import { headers } from "next/headers";
import { deriveClientNetworkKey } from "./deriveClientNetworkKey";
import { isVercelRuntime } from "./isVercelRuntime";
import { readClientAddress } from "./readClientAddress";
import { readNetworkKeySecret } from "./readNetworkKeySecret";

export const readClientNetworkKey =
  async (): Promise<string> => {
    const secret = readNetworkKeySecret();
    const address = readClientAddress(
      await headers(),
      isVercelRuntime()
    );

    return deriveClientNetworkKey(address, secret);
  };
