import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { CLIENT_ADDRESS } from "@/app/constants";
import { deriveClientNetworkKey } from "../deriveClientNetworkKey";
import { NETWORK_KEY_PATTERN } from "./request.constants";
import {
  HMAC_ALGORITHM,
  HMAC_ENCODING,
  PROPERTY_ADDRESSES,
  PROPERTY_SECRETS,
  SECRET_AT_MINIMUM,
  SWAP_ADDRESS,
  SWAP_SECRET,
} from "./requestEdges.constants";

describe("deriveClientNetworkKey properties", () => {
  it("always returns 64 lowercase hex characters", () => {
    const keys = PROPERTY_SECRETS.flatMap((secret) =>
      PROPERTY_ADDRESSES.map((address) =>
        deriveClientNetworkKey(address, secret)
      )
    );

    expect(keys).toHaveLength(
      PROPERTY_SECRETS.length * PROPERTY_ADDRESSES.length
    );
    keys.forEach((key) => {
      expect(key).toMatch(NETWORK_KEY_PATTERN);
    });
  });

  it("never repeats a key across distinct addresses for one secret", () => {
    const keys = PROPERTY_ADDRESSES.map((address) =>
      deriveClientNetworkKey(address, SECRET_AT_MINIMUM)
    );

    expect(new Set(keys).size).toBe(
      new Set(PROPERTY_ADDRESSES).size
    );
  });

  it("uses the secret as the HMAC key and the address as its data", () => {
    const expected = createHmac(HMAC_ALGORITHM, SWAP_SECRET)
      .update(SWAP_ADDRESS)
      .digest(HMAC_ENCODING);
    const swapped = createHmac(HMAC_ALGORITHM, SWAP_ADDRESS)
      .update(SWAP_SECRET)
      .digest(HMAC_ENCODING);

    expect(
      deriveClientNetworkKey(SWAP_ADDRESS, SWAP_SECRET)
    ).toBe(expected);
    expect(expected).not.toBe(swapped);
  });

  it("matches an independent HMAC for every property input", () => {
    PROPERTY_SECRETS.forEach((secret) => {
      PROPERTY_ADDRESSES.forEach((address) => {
        expect(
          deriveClientNetworkKey(address, secret)
        ).toBe(
          createHmac(HMAC_ALGORITHM, secret)
            .update(
              address ?? CLIENT_ADDRESS.UNKNOWN_BUCKET
            )
            .digest(HMAC_ENCODING)
        );
      });
    });
  });
});
