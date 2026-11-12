import { render, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import ReservationPostponementView from "../ReservationPostponementView";
import { postponeReservationAction } from "../actions/postponeReservationAction";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import {
  DISPATCHED_POSTPONEMENT,
  FUEL_ITEM_ID,
  KILOMETERS_ITEM_ID,
  SCHEDULED_POSTPONEMENT,
} from "./ReservationPostponementDraft.constants";
import { createReservationPostponementReadingsPage } from "./ReservationPostponementReadings.page";
import { createReservationPostponementViewPage } from "./ReservationPostponementView.page";

vi.mock("../actions/postponeReservationAction", () => ({
  postponeReservationAction: vi.fn(),
}));

const FUEL_UNIT = "JS-04";
const FUEL_MAX = 8;
const KILOMETERS_UNIT = "L-03";
const ENGINE_HOURS = "engine_hours";
const KILOMETERS = "kilometers";

const renderView = (
  postponement: ReservationPostponement
) => {
  render(
    <ReservationPostponementView
      postponement={postponement}
    />
  );
  return {
    form: createReservationPostponementViewPage(),
    readings: createReservationPostponementReadingsPage(),
  };
};

describe("ReservationPostponementReadings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("asks no readings for a scheduled reservation", () => {
    const { readings } = renderView(SCHEDULED_POSTPONEMENT);

    expect(readings.queryLegend()).toBeNull();
  });

  it("offers every fuel level from empty to full, none chosen, and only the meter the unit has", () => {
    const { readings } = renderView(
      DISPATCHED_POSTPONEMENT
    );

    const options = readings.getFuelOptions(FUEL_UNIT);
    expect(options).toHaveLength(FUEL_MAX + 1);
    expect(
      options.some(
        (option) => (option as HTMLInputElement).checked
      )
    ).toBe(false);
    expect(
      readings.queryUnitText(FUEL_UNIT, COPY.FUEL_EMPTY)
    ).not.toBeNull();
    expect(
      readings.queryUnitText(FUEL_UNIT, COPY.FUEL_FULL)
    ).not.toBeNull();
    expect(
      readings.getFuelOptions(KILOMETERS_UNIT)
    ).toHaveLength(0);
    expect(
      readings.getUsageInput(KILOMETERS_UNIT, KILOMETERS)
    ).toHaveValue("");
  });

  it("shows the usage floor the database enforces", () => {
    const { readings } = renderView(
      DISPATCHED_POSTPONEMENT
    );

    expect(
      readings.queryUnitText(
        FUEL_UNIT,
        COPY.USAGE_FLOOR("1250 h")
      )
    ).not.toBeNull();
    expect(
      readings.queryUnitText(
        KILOMETERS_UNIT,
        COPY.USAGE_FLOOR("8120 km")
      )
    ).not.toBeNull();
  });

  it("refuses to send while a reading is missing and names it under its unit", async () => {
    const { form, readings } = renderView(
      DISPATCHED_POSTPONEMENT
    );

    await form.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
    await readings.chooseFuel(FUEL_UNIT, 0, FUEL_MAX);
    await form.submit();

    expect(
      readings.queryUnitText(
        FUEL_UNIT,
        FEEDBACK.READING_USAGE_REQUIRED
      )
    ).not.toBeNull();
    expect(
      readings.queryUnitText(
        FUEL_UNIT,
        FEEDBACK.READING_FUEL_REQUIRED
      )
    ).toBeNull();
    expect(
      postponeReservationAction
    ).not.toHaveBeenCalled();
  });

  it("sends the empty tank as zero with the typed meters", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: true,
      reservationId: DISPATCHED_POSTPONEMENT.id,
    });
    const { form, readings } = renderView(
      DISPATCHED_POSTPONEMENT
    );

    await form.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN
    );
    await readings.chooseFuel(FUEL_UNIT, 0, FUEL_MAX);
    await readings.typeUsage(
      FUEL_UNIT,
      ENGINE_HOURS,
      "1250,5"
    );
    await readings.typeUsage(
      KILOMETERS_UNIT,
      KILOMETERS,
      "8130"
    );
    await form.submit();

    await waitFor(() =>
      expect(
        postponeReservationAction
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          readings: [
            {
              fuelIn: 0,
              itemId: FUEL_ITEM_ID,
              usageIn: 1250.5,
            },
            {
              fuelIn: null,
              itemId: KILOMETERS_ITEM_ID,
              usageIn: 8130,
            },
          ],
        })
      )
    );
  });

  it("shows a reading refused by the server under its unit", async () => {
    vi.mocked(postponeReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        readings: {
          [KILOMETERS_ITEM_ID]: {
            usageIn: FEEDBACK.READING_USAGE_BELOW_DEPARTURE,
          },
        },
      },
    });
    const { form, readings } = renderView(
      DISPATCHED_POSTPONEMENT
    );

    await form.chooseCause(
      RESERVATION_POSTPONEMENT_CAUSE.STORM
    );
    await readings.chooseFuel(
      FUEL_UNIT,
      FUEL_MAX,
      FUEL_MAX
    );
    await readings.typeUsage(
      FUEL_UNIT,
      ENGINE_HOURS,
      "1300"
    );
    await readings.typeUsage(
      KILOMETERS_UNIT,
      KILOMETERS,
      "8120"
    );
    await form.submit();

    await waitFor(() =>
      expect(
        readings.queryUnitText(
          KILOMETERS_UNIT,
          FEEDBACK.READING_USAGE_BELOW_DEPARTURE
        )
      ).not.toBeNull()
    );
    expect(
      readings.getUsageInput(KILOMETERS_UNIT, KILOMETERS)
    ).toHaveFocus();
  });
});
