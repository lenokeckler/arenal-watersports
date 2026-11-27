import { describe, expect, it } from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { resolveTariffEditPath } from "../utils/resolveTariffEditPath";
import {
  FAKE_CATEGORY_ID,
  UNSAFE_CATEGORY_ID,
} from "./TariffCatalog.constants";

describe("resolveTariffEditPath", () => {
  it("appends the category id to the tariffs list path", () => {
    expect(resolveTariffEditPath(FAKE_CATEGORY_ID)).toBe(
      [PATHS.ADMINISTRATION.TARIFFS, FAKE_CATEGORY_ID].join(
        STRING.SLASH
      )
    );
  });

  it("encodes an id that is not url safe", () => {
    expect(resolveTariffEditPath(UNSAFE_CATEGORY_ID)).toBe(
      [
        PATHS.ADMINISTRATION.TARIFFS,
        encodeURIComponent(UNSAFE_CATEGORY_ID),
      ].join(STRING.SLASH)
    );
  });
});
