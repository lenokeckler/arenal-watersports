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
import { CLOSE_GROUP_STATUS } from "../constants/CloseGroup.constants";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import {
  CLOSE_FORM_TEXT,
  CLOSE_RETURN_UNITS,
} from "./CloseGroupScreen.constants";
import {
  OUT_ON_WATER_GROUP_FIXTURE,
  OUT_ON_WATER_NOW,
} from "./OutOnWater.constants";

const { loadMock, refreshMock, submitMock } = vi.hoisted(
  () => ({
    loadMock: vi.fn(),
    refreshMock: vi.fn(),
    submitMock: vi.fn(),
  })
);

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/loadGroupReturnUnits", () => ({
  loadGroupReturnUnits: loadMock,
}));

vi.mock("../actions/submitGroupClosing", () => ({
  submitGroupClosing: submitMock,
}));

const openSheet = async () => {
  render(
    <OutOnWaterView
      errorMessage={null}
      groups={[OUT_ON_WATER_GROUP_FIXTURE]}
      nowIso={OUT_ON_WATER_NOW.toISOString()}
    />
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: CLOSE_GROUP_COPY.BUTTON,
    })
  );
  await screen.findByLabelText(
    CLOSE_GROUP_COPY.ARRIVAL_LABEL
  );
};

const getSubmit = () =>
  screen.getByRole("button", {
    name: CLOSE_GROUP_COPY.SUBMIT,
  });

const fillMotorReadings = () => {
  fireEvent.change(
    screen.getByLabelText(
      CLOSE_GROUP_COPY.FUEL_FIELD_LABEL
    ),
    { target: { value: CLOSE_FORM_TEXT.FUEL } }
  );
  fireEvent.change(
    screen.getByLabelText(CLOSE_FORM_TEXT.USAGE_LABEL),
    { target: { value: CLOSE_FORM_TEXT.USAGE } }
  );
};

describe("Group closing", () => {
  beforeEach(() => {
    loadMock.mockReset();
    refreshMock.mockReset();
    submitMock.mockReset();
    loadMock.mockResolvedValue(CLOSE_RETURN_UNITS);
  });

  it("shows how each unit went out and asks for its readings", async () => {
    await openSheet();

    expect(
      screen.getByText(CLOSE_FORM_TEXT.FUEL_OUT)
    ).toBeInTheDocument();
    expect(
      screen.getByText(CLOSE_FORM_TEXT.USAGE_OUT)
    ).toBeInTheDocument();
    expect(getSubmit()).toBeDisabled();
  });

  it("proposes the current hour as the arrival", async () => {
    await openSheet();

    const field = screen.getByLabelText<HTMLInputElement>(
      CLOSE_GROUP_COPY.ARRIVAL_LABEL
    );

    expect(field.value).toMatch(
      CLOSE_FORM_TEXT.CLOCK_PATTERN
    );
  });

  it("closes the group with its readings when everything came back in order", async () => {
    submitMock.mockResolvedValue({
      status: CLOSE_GROUP_STATUS.CLOSED,
    });
    await openSheet();

    fillMotorReadings();
    expect(getSubmit()).toBeEnabled();
    fireEvent.click(getSubmit());

    await waitFor(() =>
      expect(refreshMock).toHaveBeenCalled()
    );
    expect(submitMock).toHaveBeenCalledWith({
      arrivedAt: expect.any(String),
      dispatchId: OUT_ON_WATER_GROUP_FIXTURE.dispatchId,
      returns: [
        {
          damage: null,
          fuel: Number(CLOSE_FORM_TEXT.FUEL),
          maintenance: false,
          unitId: CLOSE_RETURN_UNITS[0].unitId,
          usage: Number(CLOSE_FORM_TEXT.USAGE),
        },
        {
          damage: null,
          fuel: null,
          maintenance: false,
          unitId: CLOSE_RETURN_UNITS[1].unitId,
          usage: null,
        },
      ],
    });
  });

  it("refuses hours below the reading of the departure", async () => {
    await openSheet();

    fillMotorReadings();
    fireEvent.change(
      screen.getByLabelText(CLOSE_FORM_TEXT.USAGE_LABEL),
      { target: { value: CLOSE_FORM_TEXT.USAGE_BELOW } }
    );

    expect(
      screen.getByText(CLOSE_FORM_TEXT.USAGE_BELOW_ERROR)
    ).toBeInTheDocument();
    expect(getSubmit()).toBeDisabled();
  });

  it("asks for the damage report of a unit that came back damaged and sends it", async () => {
    submitMock.mockResolvedValue({
      status: CLOSE_GROUP_STATUS.CLOSED,
    });
    await openSheet();
    fillMotorReadings();

    const [, plainDamage] = screen.getAllByLabelText(
      CLOSE_GROUP_COPY.DAMAGE_LABEL
    );
    fireEvent.click(plainDamage);

    expect(getSubmit()).toBeDisabled();

    fireEvent.change(
      screen.getByLabelText(CLOSE_GROUP_COPY.CAUSE_LABEL),
      { target: { value: CLOSE_FORM_TEXT.CAUSE } }
    );
    fireEvent.change(
      screen.getByLabelText(
        CLOSE_GROUP_COPY.DESCRIPTION_LABEL
      ),
      { target: { value: CLOSE_FORM_TEXT.DESCRIPTION } }
    );

    expect(getSubmit()).toBeEnabled();
    fireEvent.click(getSubmit());

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalled()
    );
    expect(
      submitMock.mock.calls[0][0].returns[1].damage
    ).toEqual({
      cause: CLOSE_FORM_TEXT.CAUSE,
      description: CLOSE_FORM_TEXT.DESCRIPTION,
      impactDelta: 0,
    });
  });

  it("tells the worker when the group was already closed", async () => {
    submitMock.mockResolvedValue({
      status: CLOSE_GROUP_STATUS.ALREADY_CLOSED,
    });
    await openSheet();
    fillMotorReadings();
    fireEvent.click(getSubmit());

    expect(
      await screen.findByText(
        CLOSE_GROUP_COPY.SAVE_ERROR_ALREADY_CLOSED
      )
    ).toBeInTheDocument();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("tells the worker when the group cannot be loaded", async () => {
    loadMock.mockRejectedValue(new Error("boom"));
    render(
      <OutOnWaterView
        errorMessage={null}
        groups={[OUT_ON_WATER_GROUP_FIXTURE]}
        nowIso={OUT_ON_WATER_NOW.toISOString()}
      />
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: CLOSE_GROUP_COPY.BUTTON,
      })
    );

    expect(
      await screen.findByText(CLOSE_GROUP_COPY.LOAD_ERROR)
    ).toBeInTheDocument();
  });

  it("sends a unit to maintenance when it is marked at the return", async () => {
    submitMock.mockResolvedValue({
      status: CLOSE_GROUP_STATUS.CLOSED,
    });
    await openSheet();
    fillMotorReadings();

    const [, plainMaintenance] = screen.getAllByLabelText(
      CLOSE_GROUP_COPY.MAINTENANCE_LABEL
    );
    fireEvent.click(plainMaintenance);
    fireEvent.click(getSubmit());

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalled()
    );
    expect(
      submitMock.mock.calls[0][0].returns.map(
        (value: { maintenance: boolean }) =>
          value.maintenance
      )
    ).toEqual([false, true]);
  });
});
