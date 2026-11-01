import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { resolveGroupConflictErrorMessage } from "../utils/resolveGroupConflictErrorMessage";

describe("resolveGroupConflictErrorMessage", () => {
  it("describes an existing by-unit group conflicting with a by-quantity attempt", () => {
    const message = resolveGroupConflictErrorMessage(
      CATEGORY_TRACKING_MODE.BY_UNIT,
      CATEGORY_TRACKING_MODE.BY_QUANTITY
    );

    expect(message).toBe(
      "Este grupo ya tiene categorías por unidad; esta es por cantidad."
    );
  });

  it("describes an existing by-quantity group conflicting with a by-unit attempt", () => {
    const message = resolveGroupConflictErrorMessage(
      CATEGORY_TRACKING_MODE.BY_QUANTITY,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(message).toBe(
      "Este grupo ya tiene categorías por cantidad; esta es por unidad."
    );
  });
});
