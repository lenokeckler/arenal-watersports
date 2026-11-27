import {
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
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  MOTOR_OCCUPIED_UNIT,
  MOTOR_READINGS,
} from "./CategoryUnitsBoard.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("../actions/submitBoardUnitReceive", () => ({
  submitBoardUnitReceive: vi.fn(),
}));

const renderSheet = () => {
  const { occupancy } = MOTOR_OCCUPIED_UNIT;

  if (!occupancy) {
    throw new Error("The fixture unit has no occupancy");
  }

  render(
    <CategoryUnitReceiveSheet
      occupancy={occupancy}
      onClose={vi.fn()}
      readings={MOTOR_READINGS}
      unit={MOTOR_OCCUPIED_UNIT}
    />
  );
};

describe("CategoryUnitReceiveSheet damage for later", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(submitBoardUnitReceive).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
  });

  it("receives a damaged unit and leaves the detail for later", async () => {
    renderSheet();

    expect(
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RECEIVE_LATER,
      })
    ).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RECEIVE_ORDER_DAMAGED,
      })
    );
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RECEIVE_LATER,
      })
    );

    await waitFor(() =>
      expect(submitBoardUnitReceive).toHaveBeenCalledWith(
        expect.objectContaining({
          damageCause: null,
          detailLater: true,
          hasDamage: true,
        })
      )
    );
  });
});
