import {
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ACTION_SHEET_COPY } from "@/app/components/action-sheet/constants/ActionSheetCopy.constants";
import { loadCategoryDispatchReservations } from "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations";
import { ARIA_ROLE } from "@/app/constants";
import CategoryUnitsDispatch from "../components/CategoryUnitsDispatch";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_NAME,
  DEFAULT_CATEGORY_UNIT,
  FAKE_TIMER_OPTIONS,
  OCCUPIED_CATEGORY_UNIT,
} from "./CategoryUnits.constants";
import { createCategoryUnitsDispatchPage } from "./CategoryUnitsDispatch.page";
import {
  CATEGORY_RESERVATION,
  DISPATCH_CATEGORY_ID,
  DISPATCH_UNITS,
  MAINTENANCE_UNIT,
  SECOND_AVAILABLE_UNIT,
} from "./CategoryUnitsDispatchTest.constants";

const { refreshMock, dispatchSheetMock } = vi.hoisted(
  () => ({
    dispatchSheetMock: vi.fn(),
    refreshMock: vi.fn(),
  })
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock(
  "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations",
  () => ({ loadCategoryDispatchReservations: vi.fn() })
);

vi.mock(
  "@/app/components/dispatch-board/components/DispatchSheet",
  () => ({
    default: (props: {
      customerName: string;
      onClose: () => void;
    }) => {
      dispatchSheetMock(props);

      return (
        <button
          type="button"
          onClick={props.onClose}
        >
          sheet-close
        </button>
      );
    },
  })
);

const renderDispatch = () => {
  render(
    <CategoryUnitsDispatch
      categoryId={DISPATCH_CATEGORY_ID}
      categoryName={CATEGORY_NAME}
      units={DISPATCH_UNITS}
    />
  );

  return createCategoryUnitsDispatchPage();
};

describe("CategoryUnitsDispatch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ ...FAKE_TIMER_OPTIONS });
    vi.mocked(
      loadCategoryDispatchReservations
    ).mockResolvedValue([CATEGORY_RESERVATION]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("lets the worker tap the available units only", () => {
    const page = renderDispatch();

    expect(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    ).toBeInTheDocument();
    expect(
      page.getSelectBox(SECOND_AVAILABLE_UNIT.code)
    ).toBeInTheDocument();
    expect(page.querySelectBoxes()).toHaveLength(2);
    expect(
      screen.queryByRole(ARIA_ROLE.CHECKBOX, {
        name: CATEGORY_UNITS_COPY.DISPATCH_SELECT_UNIT(
          OCCUPIED_CATEGORY_UNIT.code
        ),
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole(ARIA_ROLE.CHECKBOX, {
        name: CATEGORY_UNITS_COPY.DISPATCH_SELECT_UNIT(
          MAINTENANCE_UNIT.code
        ),
      })
    ).not.toBeInTheDocument();
  });

  it("offers nothing to dispatch until a unit is tapped", () => {
    const page = renderDispatch();

    expect(page.queryDispatch()).not.toBeInTheDocument();
  });

  it("shows how many units are selected and clears them on cancel", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.DISPATCH_SELECTED(1)
      )
    ).toBeInTheDocument();

    await userEvent.click(
      page.getSelectBox(SECOND_AVAILABLE_UNIT.code)
    );
    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.DISPATCH_SELECTED(2)
      )
    ).toBeInTheDocument();

    await userEvent.click(page.getCancel());
    expect(page.queryDispatch()).not.toBeInTheDocument();
    expect(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    ).not.toBeChecked();
  });

  it("lets the worker untap a unit", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );

    expect(page.queryDispatch()).not.toBeInTheDocument();
  });

  it("opens the picker for the category when the worker presses dispatch", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    await userEvent.click(page.getDispatch());

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.PICKER_TITLE
      )
    ).toBeInTheDocument();
    expect(
      loadCategoryDispatchReservations
    ).toHaveBeenCalledWith(DISPATCH_CATEGORY_ID);
  });

  it("keeps the selection when the picker is closed", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    await userEvent.click(page.getDispatch());
    await screen.findByText(
      CATEGORY_UNITS_COPY.PICKER_TITLE
    );
    await userEvent.click(
      within(screen.getByRole(ARIA_ROLE.DIALOG)).getByRole(
        ARIA_ROLE.BUTTON,
        { name: ACTION_SHEET_COPY.CLOSE }
      )
    );

    expect(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    ).toBeChecked();
  });

  it("opens the dispatch sheet on this category with the tapped units already marked", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    await userEvent.click(
      page.getSelectBox(SECOND_AVAILABLE_UNIT.code)
    );
    await userEvent.click(page.getDispatch());
    await userEvent.click(
      await screen.findByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.PICKER_DISPATCH(
          CATEGORY_RESERVATION.customerName
        ),
      })
    );

    expect(dispatchSheetMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        customerName: CATEGORY_RESERVATION.customerName,
        initialCategoryId: DISPATCH_CATEGORY_ID,
        preselectedUnitIds: [
          DEFAULT_CATEGORY_UNIT.id,
          SECOND_AVAILABLE_UNIT.id,
        ],
        reservationId: CATEGORY_RESERVATION.reservationId,
      })
    );
  });

  it("clears the selection and refreshes the board when the sheet closes", async () => {
    const page = renderDispatch();

    await userEvent.click(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    );
    await userEvent.click(page.getDispatch());
    await userEvent.click(
      await screen.findByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.PICKER_DISPATCH(
          CATEGORY_RESERVATION.customerName
        ),
      })
    );
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "sheet-close",
      })
    );

    expect(refreshMock).toHaveBeenCalledOnce();
    expect(
      page.getSelectBox(DEFAULT_CATEGORY_UNIT.code)
    ).not.toBeChecked();
    expect(page.queryDispatch()).not.toBeInTheDocument();
  });
});
