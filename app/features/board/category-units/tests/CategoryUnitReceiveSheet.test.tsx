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
import { ARIA_ROLE } from "@/app/constants";
import { submitBoardUnitReceive } from "../actions/submitBoardUnitReceive";
import CategoryUnitReceiveSheet from "../components/CategoryUnitReceiveSheet";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import {
  CATEGORY_UNIT_RECEIVE_USAGE_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import {
  MOTOR_OCCUPIED_UNIT,
  MOTOR_READINGS,
} from "./CategoryUnitsBoard.constants";
import {
  RECEIVE_DAMAGE_TEXT,
  RECEIVE_DUE_TIME,
  RECEIVE_LINE_ONE,
  RECEIVE_NEW_USAGE,
  RECEIVE_NEW_USAGE_NUMBER,
} from "./CategoryUnitReceiveSheet.constants";

const refreshMock = vi.fn();
const onClose = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/submitBoardUnitReceive", () => ({
  submitBoardUnitReceive: vi.fn(),
}));

const USAGE_LABEL =
  CATEGORY_UNIT_RECEIVE_USAGE_LABEL.engine_hours;

const occupancy = MOTOR_OCCUPIED_UNIT.occupancy;

const renderSheet = () => {
  if (!occupancy) {
    throw new Error("The fixture unit has no occupancy");
  }

  render(
    <CategoryUnitReceiveSheet
      occupancy={occupancy}
      onClose={onClose}
      readings={MOTOR_READINGS}
      unit={MOTOR_OCCUPIED_UNIT}
    />
  );
};

const getReceive = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: CATEGORY_UNITS_COPY.RECEIVE,
  });

describe("CategoryUnitReceiveSheet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(submitBoardUnitReceive).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
  });

  it("shows who had the unit, the fuel gauge and the reading it had before", () => {
    renderSheet();

    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.RECEIVE_DUE(
          occupancy?.customerName ?? "",
          RECEIVE_DUE_TIME
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: /Gasolina: 2 de 4/,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.RECEIVE_PREVIOUS("12,5 h")
      )
    ).toBeInTheDocument();
  });

  it("does not let the impact count go below what the unit already had", () => {
    renderSheet();

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.IMPACT_COUNT_LESS,
      })
    ).toBeDisabled();
  });

  it("receives the unit with the marked fuel, the hours and the impacts", async () => {
    renderSheet();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RECEIVE_LINE_ONE,
      })
    );
    fireEvent.change(screen.getByLabelText(USAGE_LABEL), {
      target: { value: RECEIVE_NEW_USAGE },
    });
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.IMPACT_COUNT_MORE,
      })
    );
    fireEvent.click(getReceive());

    await waitFor(() =>
      expect(submitBoardUnitReceive).toHaveBeenCalledWith({
        damageDescription: "",
        fuelLevel: 1,
        fuelMax: MOTOR_READINGS.fuelMax,
        hasDamage: false,
        impactCount: MOTOR_READINGS.impactCount + 1,
        previousImpactCount: MOTOR_READINGS.impactCount,
        unitId: MOTOR_OCCUPIED_UNIT.id,
        usageTotal: RECEIVE_NEW_USAGE_NUMBER,
      })
    );
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(refreshMock).toHaveBeenCalled();
  });

  it("asks what was damaged and blocks receiving until it is written", async () => {
    renderSheet();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RECEIVE_ORDER_DAMAGED,
      })
    );

    expect(getReceive()).toBeDisabled();

    await userEvent.type(
      screen.getByLabelText(
        CATEGORY_UNITS_COPY.RECEIVE_DAMAGE_LABEL
      ),
      RECEIVE_DAMAGE_TEXT
    );

    expect(getReceive()).toBeEnabled();

    fireEvent.click(getReceive());

    await waitFor(() =>
      expect(submitBoardUnitReceive).toHaveBeenCalledWith(
        expect.objectContaining({
          damageDescription: RECEIVE_DAMAGE_TEXT,
          hasDamage: true,
        })
      )
    );
  });

  it("explains that the unit is no longer out when someone else received it", async () => {
    vi.mocked(submitBoardUnitReceive).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED,
    });
    renderSheet();
    fireEvent.click(getReceive());

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.RECEIVE_NOT_OUT
      )
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("shows a retry message when the request fails", async () => {
    vi.mocked(submitBoardUnitReceive).mockRejectedValue(
      new Error("down")
    );
    renderSheet();
    fireEvent.click(getReceive());

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.RECEIVE_ERROR
      )
    ).toBeInTheDocument();
  });
});
