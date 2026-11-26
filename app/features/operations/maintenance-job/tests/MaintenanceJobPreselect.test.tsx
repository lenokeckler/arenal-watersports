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

describe("MaintenanceJobForm with a unit chosen from the board", () => {
  beforeEach(() => {
    pushMock.mockReset();
    submitMock.mockReset();
  });

  it("shows only the chosen unit, not the list of units", () => {
    render(
      <MaintenanceJobForm
        initialUnitId={JOB_UNIT.unitId}
        units={JOB_UNITS}
      />
    );

    expect(
      screen.getByText(
        `${JOB_UNIT.code}${MAINTENANCE_JOB_COPY.UNIT_SEPARATOR}${JOB_UNIT.categoryName}`
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(
        MAINTENANCE_JOB_COPY.UNIT_LABEL
      )
    ).not.toBeInTheDocument();
  });

  it("registers the job for the chosen unit without asking for it", async () => {
    submitMock.mockResolvedValue({
      status: MAINTENANCE_JOB_STATUS.REGISTERED,
    });
    render(
      <MaintenanceJobForm
        initialUnitId={JOB_UNIT.unitId}
        units={JOB_UNITS}
      />
    );

    fireEvent.change(
      screen.getByLabelText(
        MAINTENANCE_JOB_COPY.WORK_TYPE_LABEL
      ),
      { target: { value: "tire_change" } }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: MAINTENANCE_JOB_COPY.SUBMIT,
      })
    );

    await waitFor(() =>
      expect(submitMock).toHaveBeenCalledWith(
        expect.objectContaining({ unitId: JOB_UNIT.unitId })
      )
    );
  });

  it("falls back to the unit list when the unit is not in it", () => {
    render(
      <MaintenanceJobForm
        initialUnitId="not-a-unit"
        units={JOB_UNITS}
      />
    );

    expect(
      screen.getByLabelText(MAINTENANCE_JOB_COPY.UNIT_LABEL)
    ).toHaveValue("");
  });

  it("shows the unit list when no unit comes from the address", () => {
    render(<MaintenanceJobForm units={JOB_UNITS} />);

    expect(
      screen.getByLabelText(MAINTENANCE_JOB_COPY.UNIT_LABEL)
    ).toHaveValue("");
  });
});
