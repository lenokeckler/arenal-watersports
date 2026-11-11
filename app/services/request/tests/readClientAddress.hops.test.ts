import { describe, expect, it } from "vitest";
import { CLIENT_ADDRESS } from "@/app/constants";
import { createHeaders } from "./createHeaders";
import { readTrustedAddress } from "./readTrustedAddress";
import {
  FORWARDED_HEADER,
  IPV4_ADDRESS,
  OTHER_IPV4_ADDRESS,
  VERCEL_HEADER,
} from "./request.constants";
import {
  FIRST_OF_MANY_HOPS,
  HOP_COUNT,
  HOP_PREFIX,
  SPACES_ONLY_HEADER,
  TAB_ONLY_HEADER,
} from "./requestEdges.constants";

describe("readClientAddress hops and headers", () => {
  it("returns the first of many hops", () => {
    const hops = Array.from(
      { length: HOP_COUNT },
      (_, index) => `${HOP_PREFIX}${index}`
    );
    const chain = [FIRST_OF_MANY_HOPS, ...hops].join(", ");

    expect(
      readTrustedAddress(
        createHeaders({ [FORWARDED_HEADER]: chain })
      )
    ).toBe(FIRST_OF_MANY_HOPS);
  });

  it("never reads a later hop when the first hop is empty", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [VERCEL_HEADER]: `,${IPV4_ADDRESS}`,
        })
      )
    ).toBeNull();
  });

  it("falls to the forwarded header when the Vercel first hop is empty", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [VERCEL_HEADER]: `,${IPV4_ADDRESS}`,
          [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
        })
      )
    ).toBe(OTHER_IPV4_ADDRESS);
  });

  it.each([SPACES_ONLY_HEADER, TAB_ONLY_HEADER])(
    "returns null when both headers hold only whitespace %j",
    (value) => {
      expect(
        readTrustedAddress(
          createHeaders({
            [VERCEL_HEADER]: value,
            [FORWARDED_HEADER]: value,
          })
        )
      ).toBeNull();
    }
  );

  it("returns null when both headers hold only separators", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [VERCEL_HEADER]: " , ",
          [FORWARDED_HEADER]: CLIENT_ADDRESS.SEPARATOR,
        })
      )
    ).toBeNull();
  });

  it("prefers the Vercel header whatever the insertion order", () => {
    expect(
      readTrustedAddress(
        createHeaders({
          [FORWARDED_HEADER]: OTHER_IPV4_ADDRESS,
          [VERCEL_HEADER]: IPV4_ADDRESS,
        })
      )
    ).toBe(IPV4_ADDRESS);
  });
});
