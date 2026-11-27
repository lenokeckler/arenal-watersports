import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import CategoryUnitsDispatch from "../components/CategoryUnitsDispatch";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_NAME,
  FAKE_TIMER_OPTIONS,
} from "./CategoryUnits.constants";
import {
  BOARD_UNITS,
  EXPECTED_INFO,
  MOTOR_AVAILABLE_UNIT,
  MOTOR_OCCUPIED_UNIT,
  PLAIN_UNIT,
} from "./CategoryUnitsBoard.constants";
import { createCategoryUnitsBoardPage } from "./CategoryUnitsBoard.page";
import { createCategoryUnitsDispatchPage } from "./CategoryUnitsDispatch.page";
import { DISPATCH_CATEGORY_ID } from "./CategoryUnitsDispatchTest.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("../actions/submitOpenDispatchUpdate", () => ({
  submitOpenDispatchUpdate: vi.fn(),
}));

vi.mock("../actions/submitBoardUnitCorrection", () => ({
  submitBoardUnitCorrection: vi.fn(),
}));

vi.mock(
  "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations",
  () => ({ loadCategoryDispatchReservations: vi.fn() })
);

const renderBoard = (units = BOARD_UNITS) => {
  render(
    <CategoryUnitsDispatch
      afterHeader={null}
      categoryId={DISPATCH_CATEGORY_ID}
      categoryName={CATEGORY_NAME}
      image={null}
      filterControl={null}
      units={units}
    />
  );

  return {
    board: createCategoryUnitsBoardPage(),
    dispatch: createCategoryUnitsDispatchPage(),
  };
};

describe("CategoryUnitsDispatch edit mode", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("offers the edit button next to the unit count when some unit has a motor", () => {
    const { board } = renderBoard();

    expect(board.getEditToggle()).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("offers the edit button even when no unit has a motor, to mark maintenance", () => {
    const { board } = renderBoard([PLAIN_UNIT]);

    expect(board.getEditToggle()).toBeInTheDocument();
  });

  it("keeps the cards free of edit controls while the mode is off", () => {
    const { board, dispatch } = renderBoard();

    expect(
      board.queryModifyAction(MOTOR_AVAILABLE_UNIT.code)
    ).not.toBeInTheDocument();
    expect(
      dispatch.getSelectBox(MOTOR_AVAILABLE_UNIT.code)
    ).toBeInTheDocument();
  });

  it("opens who has an occupied unit when it is tapped with the mode off", async () => {
    const { board } = renderBoard();

    await userEvent.click(
      board.getInfoAction(MOTOR_OCCUPIED_UNIT.code)
    );

    const sheet = board.getSheet();
    expect(
      within(sheet).getByText(
        MOTOR_OCCUPIED_UNIT.occupancy?.customerName ?? ""
      )
    ).toBeInTheDocument();
    expect(
      within(sheet).getByText(EXPECTED_INFO.DEPARTED)
    ).toBeInTheDocument();
    expect(
      within(sheet).getByText(EXPECTED_INFO.RETURNS)
    ).toBeInTheDocument();
  });

  it("makes every card open its edit panel and takes selection away while the mode is on", async () => {
    const { board, dispatch } = renderBoard();

    await userEvent.click(board.getEditToggle());

    expect(board.getEditToggle()).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(dispatch.querySelectBoxes()).toHaveLength(0);
    expect(
      board.getModifyAction(MOTOR_AVAILABLE_UNIT.code)
    ).toBeInTheDocument();
    expect(
      board.getModifyAction(MOTOR_OCCUPIED_UNIT.code)
    ).toBeInTheDocument();
    expect(
      board.getModifyAction(PLAIN_UNIT.code)
    ).toBeInTheDocument();
  });

  it("opens the edit panel of any part of a motor card", async () => {
    const { board } = renderBoard();

    await userEvent.click(board.getEditToggle());
    await userEvent.click(
      board.getModifyAction(MOTOR_OCCUPIED_UNIT.code)
    );

    expect(
      within(board.getSheet()).getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.MODIFY_SAVE,
      })
    ).toBeInTheDocument();
  });

  it("goes back to selecting units when the mode is turned off again", async () => {
    const { board, dispatch } = renderBoard();

    await userEvent.click(board.getEditToggle());
    await userEvent.click(board.getEditToggle());

    expect(
      dispatch.getSelectBox(MOTOR_AVAILABLE_UNIT.code)
    ).toBeInTheDocument();
    expect(
      board.queryModifyAction(MOTOR_AVAILABLE_UNIT.code)
    ).not.toBeInTheDocument();
  });

  it("clears the units chosen to dispatch when the mode is turned on", async () => {
    const { board, dispatch } = renderBoard();

    await userEvent.click(
      dispatch.getSelectBox(MOTOR_AVAILABLE_UNIT.code)
    );
    expect(dispatch.getDispatch()).toBeInTheDocument();

    await userEvent.click(board.getEditToggle());

    expect(
      dispatch.queryDispatch()
    ).not.toBeInTheDocument();
  });
});
