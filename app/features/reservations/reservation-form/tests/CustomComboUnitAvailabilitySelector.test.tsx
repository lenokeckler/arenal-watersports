import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { STRING } from "@/app/constants";
import { EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import CustomComboUnitAvailabilitySelector from "../components/CustomComboUnitAvailabilitySelector";
import { CUSTOM_COMBO_UNIT_SELECTOR_TEST } from "./CustomComboUnitSelector.constants";
import { AVAILABLE_UNIT_TEST } from "./getAvailableReservationUnits.constants";
import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("CustomComboUnitAvailabilitySelector", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads units for the selected combo category and schedule", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      ...EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY,
      availableUnits: [
        {
          code: AVAILABLE_UNIT_TEST.UNIT_CODE,
          id: AVAILABLE_UNIT_TEST.UNIT_ID,
        },
      ],
    });
    render(
      <CustomComboUnitAvailabilitySelector
        categoryId={AVAILABLE_UNIT_TEST.CATEGORY_ID}
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        date={AVAILABLE_UNIT_TEST.DATE}
        durationHours={
          AVAILABLE_UNIT_TEST.DURATION_MINUTES / 60
        }
        time={AVAILABLE_UNIT_TEST.TIME}
        selectedUnitId=""
        onChange={vi.fn()}
      />
    );

    await waitFor(() =>
      expect(
        getAvailableReservationUnitsAction
      ).toHaveBeenCalledWith({
        categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
        date: AVAILABLE_UNIT_TEST.DATE,
        durationMinutes:
          AVAILABLE_UNIT_TEST.DURATION_MINUTES,
        time: AVAILABLE_UNIT_TEST.TIME,
      })
    );
    expect(
      screen.getByRole("option", {
        name: AVAILABLE_UNIT_TEST.UNIT_CODE,
      })
    ).toBeInTheDocument();
  });

  it("clears a previously selected unit when it is unavailable for the new interval", async () => {
    const onChange = vi.fn();
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue(
      EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY
    );
    render(
      <CustomComboUnitAvailabilitySelector
        categoryId={AVAILABLE_UNIT_TEST.CATEGORY_ID}
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        date={AVAILABLE_UNIT_TEST.DATE}
        durationHours={
          AVAILABLE_UNIT_TEST.DURATION_MINUTES / 60
        }
        time={AVAILABLE_UNIT_TEST.TIME}
        selectedUnitId={AVAILABLE_UNIT_TEST.UNIT_ID}
        onChange={onChange}
      />
    );

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(STRING.Empty)
    );
  });

  it("clears a selected unit while rechecking its availability", async () => {
    const onChange = vi.fn();
    let resolveAvailability = (
      _availability: ReservationEquipmentAvailability
    ): void => undefined;
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockImplementation(
      () =>
        new Promise<ReservationEquipmentAvailability>(
          (resolve) => {
            resolveAvailability = resolve;
          }
        )
    );
    render(
      <CustomComboUnitAvailabilitySelector
        categoryId={AVAILABLE_UNIT_TEST.CATEGORY_ID}
        categoryName={
          CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME
        }
        date={AVAILABLE_UNIT_TEST.DATE}
        durationHours={
          AVAILABLE_UNIT_TEST.DURATION_MINUTES / 60
        }
        time={AVAILABLE_UNIT_TEST.TIME}
        selectedUnitId={AVAILABLE_UNIT_TEST.UNIT_ID}
        onChange={onChange}
      />
    );

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(STRING.Empty)
    );
    resolveAvailability(
      EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY
    );
  });
});
