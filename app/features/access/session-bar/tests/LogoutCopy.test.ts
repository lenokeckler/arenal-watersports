import { describe, expect, it } from "vitest";
import { LOGOUT_COPY } from "../constants/LogoutCopy.constants";
import { VOSEO_PATTERN } from "./LogoutButton.constants";

describe("LOGOUT_COPY", () => {
  it.each(Object.values(LOGOUT_COPY))(
    "addresses the worker as usted in %s",
    (copy) => {
      expect(copy).not.toMatch(VOSEO_PATTERN);
    }
  );
});
