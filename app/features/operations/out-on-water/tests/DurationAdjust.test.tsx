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
import OutOnWaterView from "../OutOnWaterView";
import { ADJUST_DURATION_STATUS } from "../constants/OutOnWater.constants";
import { DURATION_ADJUST_COPY } from "../constants/OutOnWaterCopy.constants";
import {
  ADJUST_MINUTES,
  ADJUST_TEXT,
  OUT_ON_WATER_GROUP_FIXTURE,
  OUT_ON_WATER_NOW,
} from "./OutOnWater.constants";

const { refreshMock, submitMock } = vi.hoisted(() => ({
  refreshMock: vi.fn(),
  submitMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/submitDurationAdjustment", () => ({
  submitDurationAdjustment: submitMock,
}));

const openSheet = () => {
  render(
    <OutOnWaterView
      errorMessage={null}
      groups={[OUT_ON_WATER_GROUP_FIXTURE]}
      nowIso={OUT_ON_WATER_NOW.toISOString()}
    />
  );
  fireEvent.click(
    screen.getByRole("button", { name: ADJUST_TEXT.BUTTON })
  );
};

const getField = () =>
  screen.getByLabelText(ADJUST_TEXT.FIELD);

const getSave = () =>
  screen.getByRole("button", { name: ADJUST_TEXT.SAVE });

describe("Duration adjustment", () => {
  beforeEach(() => {
    refreshMock.mockReset();
    submitMock.mockReset();
  });

  it("marks a group that was extended", () => {
    render(
      <OutOnWaterView
        errorMessage={null}
        groups={[OUT_ON_WATER_GROUP_FIXTURE]}
        nowIso={OUT_ON_WATER_NOW.toISOString()}
      />
    );

    expect(
      screen.getByText(new RegExp(ADJUST_TEXT.EXTENDED), {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(DURATION_ADJUST_COPY.EXTENDED_NOTE)
      )
    ).toBeInTheDocument();
  });

  it("opens with the current duration and nothing to save yet", () => {
    openSheet();

    expect(getField()).toHaveValue(
      String(OUT_ON_WATER_GROUP_FIXTURE.durationMinutes)
    );
    expect(getSave()).toBeDisabled();
  });

  it("moves the minutes with the quick buttons", () => {
    openSheet();

    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.ADD_30,
      })
    );
    expect(getField()).toHaveValue(
      ADJUST_MINUTES.AFTER_ADD_30
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.MINUS_15,
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.MINUS_15,
      })
    );
    expect(getField()).toHaveValue(
      ADJUST_MINUTES.AFTER_MINUS_15
    );
  });

  it.each([
    ADJUST_MINUTES.INVALID,
    ADJUST_MINUTES.TOO_LONG,
  ])("refuses %s and keeps saving disabled", (text) => {
    openSheet();

    fireEvent.change(getField(), {
      target: { value: text },
    });

    expect(
      screen.getByText(ADJUST_TEXT.FIELD_ERROR)
    ).toBeInTheDocument();
    expect(getSave()).toBeDisabled();
  });

  it("saves the new duration of that group, refreshes the list and closes", async () => {
    submitMock.mockResolvedValue({
      status: ADJUST_DURATION_STATUS.ADJUSTED,
    });
    openSheet();

    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.ADD_30,
      })
    );
    fireEvent.click(getSave());

    await waitFor(() =>
      expect(refreshMock).toHaveBeenCalled()
    );
    expect(submitMock).toHaveBeenCalledWith({
      dispatchId: OUT_ON_WATER_GROUP_FIXTURE.dispatchId,
      durationMinutes: Number(ADJUST_MINUTES.AFTER_ADD_30),
    });
    expect(
      screen.queryByLabelText(ADJUST_TEXT.FIELD)
    ).not.toBeInTheDocument();
  });

  it("tells the worker when the group already came back", async () => {
    submitMock.mockResolvedValue({
      status: ADJUST_DURATION_STATUS.ALREADY_CLOSED,
    });
    openSheet();

    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.ADD_30,
      })
    );
    fireEvent.click(getSave());

    expect(
      await screen.findByText(ADJUST_TEXT.CLOSED_ERROR)
    ).toBeInTheDocument();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("tells the worker when saving fails", async () => {
    submitMock.mockRejectedValue(new Error("boom"));
    openSheet();

    fireEvent.click(
      screen.getByRole("button", {
        name: ADJUST_TEXT.ADD_30,
      })
    );
    fireEvent.click(getSave());

    expect(
      await screen.findByText(
        DURATION_ADJUST_COPY.ERROR_GENERIC
      )
    ).toBeInTheDocument();
  });
});
