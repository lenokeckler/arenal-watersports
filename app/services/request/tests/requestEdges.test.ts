import { createHmac } from "node:crypto";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CLIENT_ADDRESS,
  NETWORK_KEY,
  NETWORK_KEY_ERROR_CODE,
} from "@/app/constants";
import { deriveClientNetworkKey } from "../deriveClientNetworkKey";
import type { ClientHeaders } from "../models/ClientHeaders.interface";
import { readTrustedAddress } from "./readTrustedAddress";
import { readNetworkKeySecret } from "../readNetworkKeySecret";
import { captureNetworkKeyError } from "./captureNetworkKeyError";
import { createHeaders } from "./createHeaders";
import {
  FORWARDED_HEADER,
  IPV4_ADDRESS,
  NETWORK_KEY_PATTERN,
  OTHER_IPV4_ADDRESS,
  VERCEL_HEADER,
} from "./request.constants";
import {
  BRACKETED_IPV6,
  BRACKETED_IPV6_PREFIX,
  BRACKETED_IPV6_WITH_PORT,
  DOTTED_CAPITAL_I,
  EMOJI_ADDRESS,
  FIRST_OF_MANY_HOPS,
  HMAC_ALGORITHM,
  HMAC_ENCODING,
  HOP_COUNT,
  HOP_PREFIX,
  IPV4_WITH_PORT,
  IPV4_WITHOUT_PORT,
  MIXED_CASE_IPV6_PREFIX,
  MIXED_CASE_IPV6,
  PROPERTY_ADDRESSES,
  PROPERTY_SECRETS,
  SECRET_ABOVE_MINIMUM,
  SECRET_AT_MINIMUM,
  SECRET_BELOW_MINIMUM,
  SECRET_PADDING,
  SECRET_PADDING_TAB_NEWLINE,
  SECRET_WITH_INNER_SPACES,
  SECRET_WITH_INNER_SPACES_SHORT,
  SHORT_AFTER_TRIM,
  SHORT_WITH_LEADING_SPACES,
  SPACES_ONLY_HEADER,
  SWAP_ADDRESS,
  SWAP_SECRET,
  TAB_ONLY_HEADER,
  UNICODE_ADDRESS_UPPER,
  WIDE_UNICODE_ADDRESS,
} from "./requestEdges.constants";

const stubSecret = (value: string): void => {
  vi.stubEnv(NETWORK_KEY.SECRET_ENVIRONMENT_NAME, value);
};

const createStubHeaders = (
  values: Record<string, string>
): ClientHeaders => ({
  get: (name) => values[name] ?? null,
});

describe("readClientAddress edge cases", () => {
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
      expect(
        deriveClientNetworkKey(address, SECRET_AT_MINIMUM)
      ).toMatch(NETWORK_KEY_PATTERN);
    }
  );

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

describe("readNetworkKeySecret boundaries", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects a secret one character below the minimum", () => {
    stubSecret(SECRET_BELOW_MINIMUM);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("accepts a secret of exactly the minimum length", () => {
    stubSecret(SECRET_AT_MINIMUM);

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });

  it("accepts a secret one character above the minimum", () => {
    stubSecret(SECRET_ABOVE_MINIMUM);

    expect(readNetworkKeySecret()).toBe(
      SECRET_ABOVE_MINIMUM
    );
  });

  it("counts inner spaces toward the length", () => {
    stubSecret(SECRET_WITH_INNER_SPACES);

    expect(readNetworkKeySecret()).toBe(
      SECRET_WITH_INNER_SPACES
    );
  });

  it("rejects a spaced secret that is too short", () => {
    stubSecret(SECRET_WITH_INNER_SPACES_SHORT);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("measures the length after trimming the padding", () => {
    stubSecret(SHORT_AFTER_TRIM);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("does not let leading spaces pad a short secret to the minimum", () => {
    stubSecret(SHORT_WITH_LEADING_SPACES);

    expect(
      captureNetworkKeyError(readNetworkKeySecret).code
    ).toBe(NETWORK_KEY_ERROR_CODE.SECRET_TOO_SHORT);
  });

  it("returns the trimmed secret when spaces surround a valid one", () => {
    stubSecret(
      `${SECRET_PADDING}${SECRET_AT_MINIMUM}${SECRET_PADDING}`
    );

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });

  it("trims tabs and newlines around the secret", () => {
    stubSecret(
      `${SECRET_PADDING_TAB_NEWLINE}${SECRET_AT_MINIMUM}${SECRET_PADDING_TAB_NEWLINE}`
    );

    expect(readNetworkKeySecret()).toBe(SECRET_AT_MINIMUM);
  });
});

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
