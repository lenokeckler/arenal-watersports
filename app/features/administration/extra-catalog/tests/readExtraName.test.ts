import { describe, expect, it } from "vitest";
import { readExtraName } from "../utils/readExtraName";
import { FAKE_EXTRA_NAME } from "./Extra.constants";

describe("readExtraName", () => {
  it("reads the name of an input object", () => {
    expect(readExtraName({ name: FAKE_EXTRA_NAME })).toBe(
      FAKE_EXTRA_NAME
    );
  });

  it.each([null, undefined, 42, "text", {}])(
    "returns undefined when the input is %j",
    (input) => {
      expect(readExtraName(input)).toBeUndefined();
    }
  );
});
