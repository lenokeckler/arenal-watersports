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
import MaintenanceJobForm from "../components/MaintenanceJobForm";
import { MAINTENANCE_JOB_STATUS } from "../constants/MaintenanceJob.constants";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import {
  JOB_FORM_TEXT,
  JOB_UNIT,
  JOB_UNITS,
} from "./MaintenanceJob.constants";

const { pushMock, submitMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  submitMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("../actions/submitMaintenanceJob", () => ({
  submitMaintenanceJob: submitMock,
}));

const choose = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), {
    target: { value },
  });

const fillBasics = (workType: string) => {
  choose(MAINTENANCE_JOB_COPY.UNIT_LABEL, JOB_UNIT.unitId);
  choose(MAINTENANCE_JOB_COPY.WORK_TYPE_LABEL, workType);
};

const submit = () =>
  fireEvent.click(
    screen.getByRole("button", {
      name: MAINTENANCE_JOB_COPY.SUBMIT,
    })
  );

describe("MaintenanceJobForm", () => {
  beforeEach(() => {
    pushMock.mockReset();
    submitMock.mockReset();
    render(<MaintenanceJobForm units={JOB_UNITS} />);
  });

  it("says what is missing instead of sending an empty form", () => {
    submit();

    expect(
      screen.getByText(MAINTENANCE_JOB_COPY.ERROR_UNIT)
    ).toBeInTheDocument();
    expect(
      screen.getByText(MAINTENANCE_JOB_COPY.ERROR_WORK_TYPE)
    ).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("registers a work that cost nothing and goes back to the maintenance screen", async () => {
    submitMock.mockResolvedValue({
      status: MAINTENANCE_JOB_STATUS.REGISTERED,
    });
    fillBasics("tire_change");
    submit();

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalled()
    );
    expect(submitMock).toHaveBeenCalledWith({
      costAmount: null,
      costCurrency: null,
      description: "",
      isExternal: false,
      nextOilChangeAt: null,
      performedAt: expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}$/
      ),
      unitId: JOB_UNIT.unitId,
      workType: "tire_change",
    });
  });

  it("sends the cost with its currency and the external mark", async () => {
    submitMock.mockResolvedValue({
      status: MAINTENANCE_JOB_STATUS.REGISTERED,
    });
    fillBasics("part_change");
    choose(
      MAINTENANCE_JOB_COPY.COST_FIELD_LABEL,
      JOB_FORM_TEXT.COST
    );
    submit();

    expect(
      screen.getByText(MAINTENANCE_JOB_COPY.ERROR_CURRENCY)
    ).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();

    choose(
      MAINTENANCE_JOB_COPY.COST_CURRENCY_LABEL,
      JOB_FORM_TEXT.CURRENCY
    );
    fireEvent.click(
      screen.getByLabelText(
        MAINTENANCE_JOB_COPY.EXTERNAL_LABEL
      )
    );
    submit();

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalled()
    );
    expect(submitMock.mock.calls[0][0]).toMatchObject({
      costAmount: Number(JOB_FORM_TEXT.COST),
      costCurrency: JOB_FORM_TEXT.CURRENCY,
      isExternal: true,
    });
  });

  it("asks for the next oil change threshold only on an oil change and above the accumulated usage", async () => {
    submitMock.mockResolvedValue({
      status: MAINTENANCE_JOB_STATUS.REGISTERED,
    });
    expect(
      screen.queryByLabelText(
        MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL
      )
    ).not.toBeInTheDocument();

    fillBasics("oil_change");
    choose(
      MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL,
      JOB_FORM_TEXT.THRESHOLD_BELOW
    );
    submit();

    expect(
      screen.getByText(JOB_FORM_TEXT.THRESHOLD_BELOW_ERROR)
    ).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();

    choose(
      MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL,
      JOB_FORM_TEXT.THRESHOLD
    );
    submit();

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalled()
    );
    expect(
      submitMock.mock.calls[0][0].nextOilChangeAt
    ).toBe(Number(JOB_FORM_TEXT.THRESHOLD));
  });

  it("tells the worker when the unit was decommissioned", async () => {
    submitMock.mockResolvedValue({
      status: MAINTENANCE_JOB_STATUS.UNIT_RETIRED,
    });
    fillBasics("tire_change");
    submit();

    expect(
      await screen.findByText(
        MAINTENANCE_JOB_COPY.ERROR_RETIRED
      )
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("tells the worker when saving fails", async () => {
    submitMock.mockRejectedValue(new Error("boom"));
    fillBasics("tire_change");
    submit();

    expect(
      await screen.findByText(
        MAINTENANCE_JOB_COPY.ERROR_GENERIC
      )
    ).toBeInTheDocument();
  });
});
