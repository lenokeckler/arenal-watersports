import { describe, expect, it } from "vitest";
import { readClientAddress } from "../readClientAddress";
import { createHeaders } from "./createHeaders";
import {
  FORWARDED_HEADER,
  IPV4_ADDRESS,
  SPOOFED_ADDRESS,
  VERCEL_HEADER,
} from "./request.constants";

const spoofedHeaders = createHeaders({
  [VERCEL_HEADER]: SPOOFED_ADDRESS,
  [FORWARDED_HEADER]: SPOOFED_ADDRESS,
});

describe("readClientAddress trust", () => {
  it("ignores the address headers when they are not trusted", () => {
    expect(
      readClientAddress(spoofedHeaders, false)
    ).toBeNull();
  });

  it("honours the address headers when they are trusted", () => {
    expect(readClientAddress(spoofedHeaders, true)).toBe(
      SPOOFED_ADDRESS
    );
    expect(
      readClientAddress(
        createHeaders({ [VERCEL_HEADER]: IPV4_ADDRESS }),
        true
      )
    ).toBe(IPV4_ADDRESS);
  });
});
