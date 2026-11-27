import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ARIA_ROLE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { submitBoardUnitCorrection } from "../actions/submitBoardUnitCorrection";
import { submitBoardUnitMaintenance } from "../actions/submitBoardUnitMaintenance";
import CategoryUnitModifySheet from "../components/CategoryUnitModifySheet";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import {
  CATEGORY_UNIT_MODIFY_USAGE_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import {
  EXPECTED_MODIFY,
  MOTOR_AVAILABLE_UNIT,
  MOTOR_OCCUPIED_UNIT,
  MOTOR_READINGS,
  PLAIN_UNIT,
} from "./CategoryUnitsBoard.constants";

const refreshMock = vi.fn();
const onClose = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/submitBoardUnitCorrection", () => ({
  submitBoardUnitCorrection: vi.fn(),
}));

vi.mock("../actions/submitBoardUnitMaintenance", () => ({
  submitBoardUnitMaintenance: vi.fn(),
}));

const USAGE_LABEL =
  CATEGORY_UNIT_MODIFY_USAGE_LABEL.engine_hours;

const renderSheet = (
  unit: CategoryUnit = MOTOR_AVAILABLE_UNIT,
  readings: CategoryUnitReadings | null = MOTOR_READINGS
) => {
  render(
    <CategoryUnitModifySheet
      onClose={onClose}
      readings={readings}
      unit={unit}
    />
  );
};

const getSave = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: CATEGORY_UNITS_COPY.MODIFY_SAVE,
  });

describe("CategoryUnitModifySheet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(submitBoardUnitCorrection).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
    vi.mocked(submitBoardUnitMaintenance).mockResolvedValue(
      {
        status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
      }
    );
  });

  it("starts with what the unit has now", () => {
    renderSheet();

    expect(
      screen.getByLabelText<HTMLInputElement>(USAGE_LABEL)
        .value
    ).toBe(String(MOTOR_READINGS.usageTotal));
    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: /Gasolina: 2 de 4/,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(MOTOR_READINGS.impactCount))
    ).toBeInTheDocument();
  });

  it("saves the marked fuel, the hours and the impact count", async () => {
    renderSheet();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EXPECTED_MODIFY.LINE_FOUR,
      })
    );
    fireEvent.change(screen.getByLabelText(USAGE_LABEL), {
      target: { value: EXPECTED_MODIFY.NEW_USAGE },
    });
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.IMPACT_COUNT_MORE,
      })
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith({
        fuelLevel: EXPECTED_MODIFY.NEW_LEVEL,
        fuelMax: MOTOR_READINGS.fuelMax,
        impactCount: EXPECTED_MODIFY.NEW_IMPACT_COUNT,
        status: INVENTORY_UNIT_STATUS.AVAILABLE,
        unitId: MOTOR_AVAILABLE_UNIT.id,
        usageTotal: EXPECTED_MODIFY.NEW_USAGE_NUMBER,
      })
    );
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(refreshMock).toHaveBeenCalled();
  });

  it("keeps an occupied unit recorded as available", async () => {
    renderSheet(MOTOR_OCCUPIED_UNIT);
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status: INVENTORY_UNIT_STATUS.AVAILABLE,
        })
      )
    );
  });

  it("keeps the status of a unit in maintenance", async () => {
    renderSheet({
      ...MOTOR_AVAILABLE_UNIT,
      status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    });
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
        })
      )
    );
  });

  it("refuses hours that are not a number", () => {
    renderSheet();

    fireEvent.change(screen.getByLabelText(USAGE_LABEL), {
      target: { value: EXPECTED_MODIFY.NOT_A_NUMBER },
    });

    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.MODIFY_USAGE_INVALID
      )
    ).toBeInTheDocument();
    expect(getSave()).toBeDisabled();
  });

  it("cannot save a unit with a gauge until its level is known", () => {
    renderSheet(MOTOR_AVAILABLE_UNIT, {
      ...MOTOR_READINGS,
      fuelLevel: null,
    });

    expect(getSave()).toBeDisabled();
  });

  it("shows no gauge for a unit that burns no fuel and saves it with level zero", async () => {
    renderSheet(MOTOR_AVAILABLE_UNIT, {
      ...MOTOR_READINGS,
      fuelLevel: null,
      hasFuelGauge: false,
    });

    expect(
      screen.queryByRole(ARIA_ROLE.GROUP, {
        name: /Gasolina/,
      })
    ).not.toBeInTheDocument();

    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith(
        expect.objectContaining({ fuelLevel: 0 })
      )
    );
  });

  it("closes without complaint when there was nothing to change", async () => {
    vi.mocked(submitBoardUnitCorrection).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED,
    });
    renderSheet();
    fireEvent.click(getSave());

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("says when the unit cannot be modified right now", async () => {
    vi.mocked(submitBoardUnitCorrection).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE,
    });
    renderSheet();
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(
      CATEGORY_UNITS_COPY.MODIFY_NOT_CORRECTABLE
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it("says the data is not valid when the database refuses it", async () => {
    vi.mocked(submitBoardUnitCorrection).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.INVALID,
    });
    renderSheet();
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.MODIFY_INVALID);
  });

  it("says it could not save when the request fails", async () => {
    vi.mocked(submitBoardUnitCorrection).mockRejectedValue(
      new Error("boom")
    );
    renderSheet();
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.MODIFY_ERROR);
  });

  it("offers the maintenance choice for a free unit and not for one out on the water", () => {
    renderSheet();

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP,
      })
    ).toBeInTheDocument();
  });

  it("hides the maintenance choice for a unit out on the water", () => {
    renderSheet(MOTOR_OCCUPIED_UNIT);

    expect(
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP,
      })
    ).not.toBeInTheDocument();
  });

  it("puts the unit in maintenance and keeps that status in the correction", async () => {
    renderSheet();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP,
      })
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitMaintenance
      ).toHaveBeenCalledWith({
        inMaintenance: true,
        unitId: MOTOR_AVAILABLE_UNIT.id,
      })
    );
    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
        })
      )
    );
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("returns a unit in maintenance to service", async () => {
    renderSheet({
      ...MOTOR_AVAILABLE_UNIT,
      status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    });

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_SERVICE,
      })
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitMaintenance
      ).toHaveBeenCalledWith({
        inMaintenance: false,
        unitId: MOTOR_AVAILABLE_UNIT.id,
      })
    );
    await waitFor(() =>
      expect(
        submitBoardUnitCorrection
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          status: INVENTORY_UNIT_STATUS.AVAILABLE,
        })
      )
    );
  });

  it("lets a unit without a motor go to maintenance and only then lets it save", async () => {
    renderSheet(PLAIN_UNIT, null);

    expect(getSave()).toBeDisabled();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP,
      })
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(
        submitBoardUnitMaintenance
      ).toHaveBeenCalledWith({
        inMaintenance: true,
        unitId: PLAIN_UNIT.id,
      })
    );
    expect(
      submitBoardUnitCorrection
    ).not.toHaveBeenCalled();
  });

  it("explains that a unit out on the water must be received first", async () => {
    vi.mocked(submitBoardUnitMaintenance).mockResolvedValue(
      {
        status: CATEGORY_UNIT_UPDATE_STATUS.OCCUPIED,
      }
    );
    renderSheet(PLAIN_UNIT, null);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MAINTENANCE_IN_WORKSHOP,
      })
    );
    fireEvent.click(getSave());

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.MAINTENANCE_OCCUPIED
      )
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});
