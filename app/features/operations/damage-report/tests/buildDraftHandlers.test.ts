import { describe, expect, it, vi } from "vitest";
import { buildDraftHandlers } from "../utils/buildDraftHandlers";
import { REPORT_UNIT } from "./DamageReport.constants";

describe("buildDraftHandlers", () => {
  it("forgets the trip and picks the state of the new machine", () => {
    const update = vi.fn();
    const { handleUnitChange } = buildDraftHandlers(
      update,
      [REPORT_UNIT]
    );

    handleUnitChange({
      target: { value: REPORT_UNIT.id },
    } as never);

    expect(update).toHaveBeenCalledWith({
      reservationId: "",
      state: "damaged",
      unitId: REPORT_UNIT.id,
    });
  });
});
