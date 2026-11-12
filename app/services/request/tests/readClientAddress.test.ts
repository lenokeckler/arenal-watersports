import { describe, expect, it } from "vitest";
import { readTrustedAddress } from "./readTrustedAddress";
import { createHeaders } from "./createHeaders";
import {
  BLANK_VALUE,
  EMPTY_FIRST_HOP,
  EMPTY_VALUE,
  FORWARDED_HEADER,
  IPV4_ADDRESS,
  IPV6_ADDRESS,
  IPV6_PREFIX,
  OTHER_IPV4_ADDRESS,
  PADDED_ADDRESS,
  PROXY_CHAIN,
  VERCEL_HEADER,
} from "./request.constants";

describe("readClientAddress", () => {
  it("prefers the Vercel header over the forwarded one", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: IPV4_ADDRESS,
      [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
    });

    expect(readTrustedAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("falls back to the forwarded header", () => {
    const headers = createHeaders({
      [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
    });

    expect(readTrustedAddress(headers)).toBe(
      OTHER_IPV4_ADDRESS
    );
  });

  it("falls back when the Vercel header is blank", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: BLANK_VALUE,
      [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
    });

    expect(readTrustedAddress(headers)).toBe(
      OTHER_IPV4_ADDRESS
    );
  });

  it("takes only the first hop of a chain", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: PROXY_CHAIN,
    });

    expect(readTrustedAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("trims the address", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: PADDED_ADDRESS,
    });

    expect(readTrustedAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("reduces an IPv6 address to its lowercase /64 prefix", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: IPV6_ADDRESS,
    });

    expect(readTrustedAddress(headers)).toBe(IPV6_PREFIX);
  });

  it("returns null without any header", () => {
    expect(
      readTrustedAddress(createHeaders({}))
    ).toBeNull();
  });

  it.each([EMPTY_VALUE, BLANK_VALUE, EMPTY_FIRST_HOP])(
    "returns null for the unusable value %j",
    (value) => {
      const headers = createHeaders({
        [VERCEL_HEADER]: value,
      });

      expect(readTrustedAddress(headers)).toBeNull();
    }
  );
});
