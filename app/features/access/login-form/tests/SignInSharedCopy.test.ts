import { describe, expect, it } from "vitest";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import { SHARED_COPY_AS_SHIPPED } from "./SignInSharedCopy.constants";

describe("sign-in shared copy", () => {
  it.each(SHARED_COPY_AS_SHIPPED)(
    "keeps the %s wording unchanged",
    (code, text) => {
      expect(SIGN_IN_ERROR_COPY[code]).toBe(text);
    }
  );
});
