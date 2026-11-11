import { describe, expect, it } from "vitest";
import { resolveCountLabel } from "../utils/resolveCountLabel";

const SINGULAR_NOUN = "cosa";
const PLURAL_NOUN = "cosas";

describe("resolveCountLabel", () => {
  it("uses the singular noun for exactly one", () => {
    expect(
      resolveCountLabel(1, SINGULAR_NOUN, PLURAL_NOUN)
    ).toBe("1 cosa");
  });

  it("uses the plural noun for zero", () => {
    expect(
      resolveCountLabel(0, SINGULAR_NOUN, PLURAL_NOUN)
    ).toBe("0 cosas");
  });

  it("uses the plural noun for more than one", () => {
    expect(
      resolveCountLabel(24, SINGULAR_NOUN, PLURAL_NOUN)
    ).toBe("24 cosas");
  });
});
