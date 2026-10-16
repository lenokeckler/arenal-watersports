import { describe, expect, it } from "vitest";
import { createHeaders } from "./createHeaders";
import { createStubHeaders } from "./createStubHeaders";
import { readTrustedAddress } from "./readTrustedAddress";
import { VERCEL_HEADER } from "./request.constants";
import {
  BRACKETED_IPV6,
  BRACKETED_IPV6_PREFIX,
  BRACKETED_IPV6_WITH_PORT,
  BRACKETED_ZONED_IPV6,
  BRACKETED_ZONED_IPV6_PREFIX,
  DOTTED_CAPITAL_I,
  EMOJI_ADDRESS,
  IPV4_WITH_PORT,
  IPV4_WITHOUT_PORT,
  MAPPED_IPV4_RESULT,
  MIXED_CASE_IPV6,
  MIXED_CASE_IPV6_PREFIX,
  UNICODE_ADDRESS_UPPER,
  ZONED_MAPPED_IPV6,
  WIDE_UNICODE_ADDRESS,
} from "./requestEdges.constants";

describe("readClientAddress address shapes", () => {
  it("treats the same IPv4 address on two ports as one client", () => {
    const withPort = readTrustedAddress(
      createHeaders({ [VERCEL_HEADER]: IPV4_WITH_PORT })
    );
    const withoutPort = readTrustedAddress(
      createHeaders({ [VERCEL_HEADER]: IPV4_WITHOUT_PORT })
    );

    expect(withPort).toBe(withoutPort);
  });

  it("treats a bracketed IPv6 address with a port as the bare address", () => {
    const bracketed = readTrustedAddress(
      createHeaders({
        [VERCEL_HEADER]: BRACKETED_IPV6_WITH_PORT,
      })
    );
    const bare = readTrustedAddress(
      createHeaders({ [VERCEL_HEADER]: BRACKETED_IPV6 })
    );

    expect(bracketed).toBe(bare);
  });

  it("reduces a bracketed IPv6 address to its /64 prefix", () => {
    expect(
      readTrustedAddress(
        createHeaders({ [VERCEL_HEADER]: BRACKETED_IPV6 })
      )
    ).toBe(BRACKETED_IPV6_PREFIX);
  });

  it("reduces a mixed case IPv6 address to its lowercase prefix", () => {
    expect(
      readTrustedAddress(
        createHeaders({ [VERCEL_HEADER]: MIXED_CASE_IPV6 })
      )
    ).toBe(MIXED_CASE_IPV6_PREFIX);
  });

  it("rejects a unicode address", () => {
    expect(
      readTrustedAddress(
        createStubHeaders({
          [VERCEL_HEADER]: UNICODE_ADDRESS_UPPER,
        })
      )
    ).toBeNull();
  });

  it.each([
    WIDE_UNICODE_ADDRESS,
    EMOJI_ADDRESS,
    DOTTED_CAPITAL_I,
  ])(
    "sends the unicode value %j to the shared bucket",
    (value) => {
      const address = readTrustedAddress(
        createStubHeaders({ [VERCEL_HEADER]: value })
      );

      expect(address).toBeNull();
    }
  );

  it("maps a zoned IPv4-mapped address to its IPv4 address", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [VERCEL_HEADER]: ZONED_MAPPED_IPV6,
        })
      )
    ).toBe(MAPPED_IPV4_RESULT);
  });

  it("strips the zone and port of a bracketed IPv6 address", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [VERCEL_HEADER]: BRACKETED_ZONED_IPV6,
        })
      )
    ).toBe(BRACKETED_ZONED_IPV6_PREFIX);
  });
});
