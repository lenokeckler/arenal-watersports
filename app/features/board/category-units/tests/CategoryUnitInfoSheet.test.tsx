import {
  fireEvent,
  render,
  screen,
  waitFor,
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
import { DISPATCH_SHEET_COPY } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import { ARIA_ROLE } from "@/app/constants";
import { submitOpenDispatchUpdate } from "../actions/submitOpenDispatchUpdate";
import CategoryUnitInfoSheet from "../components/CategoryUnitInfoSheet";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { FAKE_TIMER_OPTIONS } from "./CategoryUnits.constants";
import {
  EXPECTED_INFO,
  MOTOR_OCCUPIED_UNIT,
} from "./CategoryUnitsBoard.constants";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/submitOpenDispatchUpdate", () => ({
  submitOpenDispatchUpdate: vi.fn(),
}));

const occupancy = MOTOR_OCCUPIED_UNIT.occupancy;
const onReceive = vi.fn();

const renderSheet = () => {
  if (!occupancy) {
    throw new Error("The fixture unit has no occupancy");
  }

  render(
    <CategoryUnitInfoSheet
      hasPhotos
      occupancy={occupancy}
      onClose={vi.fn()}
      onReceive={onReceive}
      unit={MOTOR_OCCUPIED_UNIT}
    />
  );
};

const getEditToggle = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: CATEGORY_UNITS_COPY.EDIT,
  });

const getSave = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: CATEGORY_UNITS_COPY.MODIFY_SAVE,
  });

describe("CategoryUnitInfoSheet", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
    vi.clearAllMocks();
    vi.mocked(submitOpenDispatchUpdate).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reads who has the unit, how many people, the times and the radio channel", () => {
    renderSheet();

    expect(
      screen.getByText(occupancy?.customerName ?? "")
    ).toBeInTheDocument();
    expect(
      screen.getByText(occupancy?.peopleCount ?? 0)
    ).toBeInTheDocument();
    expect(
      screen.getByText(EXPECTED_INFO.DEPARTED)
    ).toBeInTheDocument();
    expect(
      screen.getByText(EXPECTED_INFO.RETURNS)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.INFO_RADIO_CHANNEL(
          occupancy?.radioChannel ?? 0
        )
      )
    ).toBeInTheDocument();
  });

  it("starts read only: no time or radio field", () => {
    renderSheet();

    expect(
      screen.queryByLabelText(
        DISPATCH_SHEET_COPY.DEPARTURE_LABEL
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
      )
    ).not.toBeInTheDocument();
  });

  it("opens the receive sheet of the unit", async () => {
    renderSheet();

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RECEIVE,
      })
    );

    expect(onReceive).toHaveBeenCalledTimes(1);
  });

  it("turns the times and the radio channel editable, the times first", async () => {
    renderSheet();

    await userEvent.click(getEditToggle());

    const departure =
      screen.getByLabelText<HTMLInputElement>(
        DISPATCH_SHEET_COPY.DEPARTURE_LABEL
      );
    const radio = screen.getByLabelText<HTMLInputElement>(
      DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
    );

    expect(departure.value).toBe(
      EXPECTED_INFO.DEPARTED_INPUT
    );
    expect(radio.value).toBe(
      String(occupancy?.radioChannel)
    );
    expect(
      departure.compareDocumentPosition(radio) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("goes back to read only when the edit button is pressed again", async () => {
    renderSheet();

    await userEvent.click(getEditToggle());
    await userEvent.click(getEditToggle());

    expect(
      screen.queryByLabelText(
        DISPATCH_SHEET_COPY.DEPARTURE_LABEL
      )
    ).not.toBeInTheDocument();
  });

  it("saves the corrected times and channel and refreshes the board", async () => {
    renderSheet();
    await userEvent.click(getEditToggle());

    fireEvent.change(
      screen.getByLabelText(
        DISPATCH_SHEET_COPY.DEPARTURE_LABEL
      ),
      { target: { value: EXPECTED_INFO.NEW_DEPARTURE } }
    );
    fireEvent.change(
      screen.getByLabelText(
        DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
      ),
      { target: { value: EXPECTED_INFO.NEW_RADIO } }
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(submitOpenDispatchUpdate).toHaveBeenCalledWith(
        {
          departureAt: EXPECTED_INFO.NEW_DEPARTURE_ISO,
          dispatchId: occupancy?.dispatchId,
          radioChannel: EXPECTED_INFO.NEW_RADIO_NUMBER,
          returnsAt: EXPECTED_INFO.NEW_RETURN_ISO,
        }
      )
    );
    await waitFor(() =>
      expect(refreshMock).toHaveBeenCalled()
    );
  });

  it("refuses a radio channel outside the range", async () => {
    renderSheet();
    await userEvent.click(getEditToggle());

    fireEvent.change(
      screen.getByLabelText(
        DISPATCH_SHEET_COPY.RADIO_FIELD_LABEL
      ),
      {
        target: { value: EXPECTED_INFO.OUT_OF_RANGE_RADIO },
      }
    );

    expect(getSave()).toBeDisabled();
  });

  it("says the group already came back when the database says so", async () => {
    vi.mocked(submitOpenDispatchUpdate).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED,
    });
    renderSheet();
    await userEvent.click(getEditToggle());
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(
      CATEGORY_UNITS_COPY.UPDATE_ALREADY_CLOSED
    );
  });

  it("says the data is not valid when the database refuses it", async () => {
    vi.mocked(submitOpenDispatchUpdate).mockResolvedValue({
      status: CATEGORY_UNIT_UPDATE_STATUS.INVALID,
    });
    renderSheet();
    await userEvent.click(getEditToggle());
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.UPDATE_INVALID);
  });

  it("says it could not save when the request fails", async () => {
    vi.mocked(submitOpenDispatchUpdate).mockRejectedValue(
      new Error("boom")
    );
    renderSheet();
    await userEvent.click(getEditToggle());
    fireEvent.click(getSave());

    expect(
      await screen.findByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.UPDATE_ERROR);
  });
});
