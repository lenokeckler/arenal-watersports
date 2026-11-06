import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { buildUnitReservationRowViewModel } from "../utils/buildUnitReservationRowViewModel";
import {
  buildUnitReservationItem,
  DEFAULT_UNIT_RESERVATION_ITEM,
} from "./UnitReservationHistory.constants";

const COSTA_RICA_START_TEXT = "9:30";
const UTC_START_TEXT = "15:30";

describe("buildUnitReservationRowViewModel", () => {
  it("keeps the code and the customer name as they are", () => {
    const row = buildUnitReservationRowViewModel(
      DEFAULT_UNIT_RESERVATION_ITEM
    );

    expect(row.id).toBe(DEFAULT_UNIT_RESERVATION_ITEM.id);
    expect(row.code).toBe(
      DEFAULT_UNIT_RESERVATION_ITEM.code
    );
    expect(row.customerName).toBe(
      DEFAULT_UNIT_RESERVATION_ITEM.customerName
    );
  });

  it("shows the start in Costa Rica time", () => {
    const { startsAtText } =
      buildUnitReservationRowViewModel(
        DEFAULT_UNIT_RESERVATION_ITEM
      );

    expect(startsAtText).toContain(COSTA_RICA_START_TEXT);
    expect(startsAtText).not.toContain(UTC_START_TEXT);
  });

  it.each([
    [RESERVATION_STATUS.SCHEDULED, "Agendada"],
    [RESERVATION_STATUS.DISPATCHED, "En curso"],
    [RESERVATION_STATUS.CLOSED, "Finalizada"],
    [RESERVATION_STATUS.CANCELLED, "Cancelada"],
  ])(
    "labels the %s status as %s",
    (status, expectedLabel) => {
      const { statusLabel } =
        buildUnitReservationRowViewModel(
          buildUnitReservationItem({ status })
        );

      expect(statusLabel).toBe(expectedLabel);
    }
  );
});
