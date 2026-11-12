import { describe, expect, it } from "vitest";
import type { NullableRef } from "@/app/types";
import { createHeaders } from "./createHeaders";
import { readTrustedAddress } from "./readTrustedAddress";
import {
  BRACKETED_IPV6_NO_PORT,
  BRACKETED_IPV6_WITH_PORT_VALUE,
  COMPRESSED_IPV6,
  EMBEDDED_IPV4_IPV6,
  EMBEDDED_IPV4_IPV6_PREFIX,
  EXPANDED_SAME_PREFIX_IPV6,
  IPV4_ADDRESS,
  IPV4_WITH_PORT,
  IPV6_PREFIX,
  LOOPBACK_IPV6,
  LOOPBACK_IPV6_PREFIX,
  MAPPED_HEX_IPV6,
  MAPPED_IPV4_IPV6,
  MAPPED_IPV4_WITH_PORT,
  NOT_AN_ADDRESS_VALUES,
  OTHER_PREFIX_IPV6,
  VERCEL_HEADER,
  ZONED_IPV6,
  ZONED_IPV6_PREFIX,
} from "./request.constants";

const read = (value: string): NullableRef<string> =>
  readTrustedAddress(
    createHeaders({ [VERCEL_HEADER]: value })
  );

describe("readClientAddress canonical form", () => {
  it("strips the port of an IPv4 address", () => {
    expect(read(IPV4_WITH_PORT)).toBe(IPV4_ADDRESS);
  });

  it("strips brackets and port of an IPv6 address", () => {
    expect(read(BRACKETED_IPV6_NO_PORT)).toBe(IPV6_PREFIX);
    expect(read(BRACKETED_IPV6_WITH_PORT_VALUE)).toBe(
      IPV6_PREFIX
    );
  });

  it("maps IPv4-mapped IPv6 to the IPv4 address", () => {
    expect(read(MAPPED_IPV4_IPV6)).toBe(IPV4_ADDRESS);
    expect(read(MAPPED_HEX_IPV6)).toBe(IPV4_ADDRESS);
    expect(read(MAPPED_IPV4_WITH_PORT)).toBe(IPV4_ADDRESS);
  });

  it("gives two spellings of one /64 the same address", () => {
    expect(read(COMPRESSED_IPV6)).toBe(
      read(EXPANDED_SAME_PREFIX_IPV6)
    );
  });

  it("separates two different /64 prefixes", () => {
    expect(read(COMPRESSED_IPV6)).not.toBe(
      read(OTHER_PREFIX_IPV6)
    );
  });

  it("ignores the zone of an IPv6 address", () => {
    expect(read(ZONED_IPV6)).toBe(ZONED_IPV6_PREFIX);
  });

  it("handles the loopback and embedded IPv4 forms", () => {
    expect(read(LOOPBACK_IPV6)).toBe(LOOPBACK_IPV6_PREFIX);
    expect(read(EMBEDDED_IPV4_IPV6)).toBe(
      EMBEDDED_IPV4_IPV6_PREFIX
    );
  });

  it.each(NOT_AN_ADDRESS_VALUES)(
    "sends the non-address %j to the shared bucket",
    (value) => {
      expect(read(value)).toBeNull();
    }
  );
});
