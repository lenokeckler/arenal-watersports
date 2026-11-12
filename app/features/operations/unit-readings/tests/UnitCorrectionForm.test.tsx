import {
  fireEvent,
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
import UnitCorrectionForm from "../components/UnitCorrectionForm";
import { UNIT_CORRECTION_COPY } from "../constants/UnitCorrectionCopy.constants";
import { UNIT_READINGS_RESULT } from "../constants/UnitReadings.constants";
import { UNIT, UNIT_ID } from "./UnitReadings.constants";

const { pushMock, submitMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  submitMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("../actions/submitUnitCorrection", () => ({
  submitUnitCorrection: submitMock,
}));

const type = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), {
    target: { value },
  });

const submit = () =>
  fireEvent.click(
    screen.getByRole("button", {
      name: UNIT_CORRECTION_COPY.SUBMIT,
    })
  );

describe("UnitCorrectionForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    submitMock.mockReset();
    render(<UnitCorrectionForm unit={UNIT} />);
  });

  it("starts with what the unit has now", () => {
    expect(
      screen.getByLabelText(
        UNIT_CORRECTION_COPY.FUEL_LEVEL_LABEL
      )
    ).toHaveValue("2");
    expect(
      screen.getByLabelText(
        UNIT_CORRECTION_COPY.FUEL_MAX_LABEL
      )
    ).toHaveValue("4");
    expect(
      screen.getByLabelText(
        UNIT_CORRECTION_COPY.USAGE_LABEL.engine_hours
      )
    ).toHaveValue("60.5");
    expect(
      screen.getByLabelText(
        UNIT_CORRECTION_COPY.IMPACTS_LABEL
      )
    ).toHaveValue("1");
  });

  it("sets the level when a line of the gauge is tapped", () => {
    fireEvent.click(
      screen.getByRole("button", { name: /3/ })
    );

    expect(
      screen.getByLabelText(
        UNIT_CORRECTION_COPY.FUEL_LEVEL_LABEL
      )
    ).toHaveValue("3");
  });

  it("says what is wrong instead of sending it", () => {
    type(UNIT_CORRECTION_COPY.FUEL_MAX_LABEL, "21");
    submit();

    expect(
      screen.getByText(UNIT_CORRECTION_COPY.ERROR_FUEL_MAX)
    ).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("sends the correction and goes back to the list", async () => {
    submitMock.mockResolvedValue({
      status: UNIT_READINGS_RESULT.CORRECTED,
    });
    type(UNIT_CORRECTION_COPY.FUEL_MAX_LABEL, "8");
    type(UNIT_CORRECTION_COPY.FUEL_LEVEL_LABEL, "6");
    submit();

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalled()
    );
    expect(submitMock).toHaveBeenCalledWith({
      fuelLevel: 6,
      fuelMax: 8,
      impactCount: 1,
      status: "available",
      unitId: UNIT_ID,
      usageTotal: 60.5,
    });
  });

  it("says nothing changed when the database finds no difference", async () => {
    submitMock.mockResolvedValue({
      status: UNIT_READINGS_RESULT.UNCHANGED,
    });
    submit();

    expect(
      await screen.findByText(
        UNIT_CORRECTION_COPY.ERROR_UNCHANGED
      )
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows a generic message when the action fails", async () => {
    submitMock.mockRejectedValue(new Error("boom"));
    submit();

    expect(
      await screen.findByText(
        UNIT_CORRECTION_COPY.ERROR_GENERIC
      )
    ).toBeInTheDocument();
  });
});
