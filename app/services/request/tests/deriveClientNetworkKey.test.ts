import { describe, expect, it } from "vitest";
import { deriveClientNetworkKey } from "../deriveClientNetworkKey";
import {
  IPV4_ADDRESS,
  NETWORK_KEY_PATTERN,
  OTHER_IPV4_ADDRESS,
  OTHER_SECRET,
  VALID_SECRET,
} from "./request.constants";

describe("deriveClientNetworkKey", () => {
  it("returns 64 lowercase hex characters", () => {
    expect(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    ).toMatch(NETWORK_KEY_PATTERN);
  });

  it("is deterministic", () => {
    expect(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    ).toBe(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    );
  });

  it("differs by secret", () => {
    expect(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    ).not.toBe(
      deriveClientNetworkKey(IPV4_ADDRESS, OTHER_SECRET)
    );
  });

  it("differs by address", () => {
    expect(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    ).not.toBe(
      deriveClientNetworkKey(
        OTHER_IPV4_ADDRESS,
        VALID_SECRET
      )
    );
  });

  it("never contains the address", () => {
    expect(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    ).not.toContain(IPV4_ADDRESS);
  });

  it("keeps one stable key for every unknown address", () => {
    const unknownKey = deriveClientNetworkKey(
      null,
      VALID_SECRET
    );

    expect(unknownKey).toMatch(NETWORK_KEY_PATTERN);
    expect(unknownKey).toBe(
      deriveClientNetworkKey(null, VALID_SECRET)
    );
    expect(unknownKey).not.toBe(
      deriveClientNetworkKey(IPV4_ADDRESS, VALID_SECRET)
    );
  });
});
