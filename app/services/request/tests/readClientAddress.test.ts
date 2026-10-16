import { describe, expect, it } from "vitest";
import { readClientAddress } from "../readClientAddress";
import { createHeaders } from "./createHeaders";
import {
  BLANK_VALUE,
  EMPTY_FIRST_HOP,
  EMPTY_VALUE,
  FORWARDED_HEADER,
  IPV4_ADDRESS,
  IPV6_ADDRESS,
  LOWERCASE_IPV6_ADDRESS,
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

    expect(readClientAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("falls back to the forwarded header", () => {
    const headers = createHeaders({
      [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
    });

    expect(readClientAddress(headers)).toBe(
      OTHER_IPV4_ADDRESS
    );
  });

  it("falls back when the Vercel header is blank", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: BLANK_VALUE,
      [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
    });

    expect(readClientAddress(headers)).toBe(
      OTHER_IPV4_ADDRESS
    );
  });

  it("takes only the first hop of a chain", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: PROXY_CHAIN,
    });

    expect(readClientAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("trims the address", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: PADDED_ADDRESS,
    });

    expect(readClientAddress(headers)).toBe(IPV4_ADDRESS);
  });

  it("lowercases an IPv6 address", () => {
    const headers = createHeaders({
      [VERCEL_HEADER]: IPV6_ADDRESS,
    });

    expect(readClientAddress(headers)).toBe(
      LOWERCASE_IPV6_ADDRESS
    );
  });

  it("returns null without any header", () => {
    expect(readClientAddress(createHeaders({}))).toBeNull();
  });

  it.each([EMPTY_VALUE, BLANK_VALUE, EMPTY_FIRST_HOP])(
    "returns null for the unusable value %j",
    (value) => {
      const headers = createHeaders({
        [VERCEL_HEADER]: value,
      });

      expect(readClientAddress(headers)).toBeNull();
    }
  );
});
