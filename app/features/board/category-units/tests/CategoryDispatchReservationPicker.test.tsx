import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { loadCategoryDispatchReservations } from "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations";
import { ARIA_ROLE } from "@/app/constants";
import CategoryDispatchReservationPicker from "../components/CategoryDispatchReservationPicker";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { FAKE_TIMER_OPTIONS } from "./CategoryUnits.constants";
import {
  CATEGORY_RESERVATION,
  DISPATCH_CATEGORY_ID,
  EXPECTED_PICKER_TIME,
  SMALL_CATEGORY_RESERVATION,
} from "./CategoryUnitsDispatchTest.constants";

vi.mock(
  "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations",
  () => ({ loadCategoryDispatchReservations: vi.fn() })
);

const SELECTED_TWO = 2;

const renderPicker = (selectedCount = SELECTED_TWO) => {
  const onChoose = vi.fn();
  const onClose = vi.fn();
  render(
    <CategoryDispatchReservationPicker
      categoryId={DISPATCH_CATEGORY_ID}
      onChoose={onChoose}
      onClose={onClose}
      selectedCount={selectedCount}
    />
  );

  return { onChoose, onClose };
};

describe("CategoryDispatchReservationPicker", () => {
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

  it("asks the server for the reservations of the category", async () => {
    renderPicker();

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.PICKER_TITLE
      )
    ).toBeInTheDocument();
    expect(
      loadCategoryDispatchReservations
    ).toHaveBeenCalledWith(DISPATCH_CATEGORY_ID);
  });

  it("says it is looking while the reservations load", () => {
    renderPicker();

    expect(
      screen.getByText(CATEGORY_UNITS_COPY.PICKER_LOADING)
    ).toBeInTheDocument();
  });

  it("lists each reservation with its customer, code, time and committed units", async () => {
    renderPicker();

    expect(
      await screen.findByText(
        new RegExp(CATEGORY_RESERVATION.customerName)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(CATEGORY_RESERVATION.code)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(EXPECTED_PICKER_TIME))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(
          CATEGORY_UNITS_COPY.PICKER_COMMITTED(
            CATEGORY_RESERVATION.requiredCount
          )
        )
      )
    ).toBeInTheDocument();
  });

  it("reports the reservation that was chosen", async () => {
    const { onChoose } = renderPicker();

    await userEvent.click(
      await screen.findByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.PICKER_DISPATCH(
          CATEGORY_RESERVATION.customerName
        ),
      })
    );

    expect(onChoose).toHaveBeenCalledWith(
      CATEGORY_RESERVATION
    );
  });

  it("warns when the reservation cannot take every tapped unit", async () => {
    vi.mocked(
      loadCategoryDispatchReservations
    ).mockResolvedValue([SMALL_CATEGORY_RESERVATION]);
    renderPicker();

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.PICKER_FITS(
          SMALL_CATEGORY_RESERVATION.requiredCount,
          SELECTED_TWO
        )
      )
    ).toBeInTheDocument();
  });

  it("does not warn when every tapped unit fits", async () => {
    renderPicker();

    await screen.findByText(
      new RegExp(CATEGORY_RESERVATION.customerName)
    );

    expect(
      screen.queryByText(/^Caben /)
    ).not.toBeInTheDocument();
  });

  it("says plainly when no reservation commits the category today", async () => {
    vi.mocked(
      loadCategoryDispatchReservations
    ).mockResolvedValue([]);
    renderPicker();

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.PICKER_EMPTY
      )
    ).toBeInTheDocument();
  });

  it("reports reservations that could not be loaded", async () => {
    vi.mocked(
      loadCategoryDispatchReservations
    ).mockRejectedValue(new Error("boom"));
    renderPicker();

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.PICKER_ERROR);
  });
});
