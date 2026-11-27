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
import {
  ARIA_ROLE,
  INVENTORY_UNIT_STATUS,
  PATHS,
} from "@/app/constants";
import { submitBoardUnitMaintenance } from "../actions/submitBoardUnitMaintenance";
import CategoryUnitStatusSheet from "../components/CategoryUnitStatusSheet";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import { DEFAULT_CATEGORY_UNIT } from "./CategoryUnits.constants";

const refreshMock = vi.fn();
const onClose = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

vi.mock("../actions/submitBoardUnitMaintenance", () => ({
  submitBoardUnitMaintenance: vi.fn(),
}));

const MAINTENANCE_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  id: "unit-maint",
  status: INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
  statusDetails: {
    damage: null,
    pendingReportId: null,
    jobs: [
      {
        cost: "₡ 18.000",
        description: "Llanta del remolque",
        isExternal: true,
        performedAt: "2026-11-17",
        workType: "tire_change",
      },
    ],
  },
};

const DAMAGED_UNIT: CategoryUnit = {
  ...DEFAULT_CATEGORY_UNIT,
  id: "unit-damaged",
  status: INVENTORY_UNIT_STATUS.DAMAGED,
  statusDetails: {
    damage: {
      cause: "collision",
      description: "Golpe en el casco",
      reportedAt: "2026-11-19T15:00:00Z",
    },
    jobs: [],
    pendingReportId: null,
  },
};

const renderSheet = (unit: CategoryUnit) =>
  render(
    <CategoryUnitStatusSheet
      hasPhotos
      onClose={onClose}
      unit={unit}
    />
  );

describe("CategoryUnitStatusSheet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(submitBoardUnitMaintenance).mockResolvedValue(
      {
        status: CATEGORY_UNIT_UPDATE_STATUS.UPDATED,
      }
    );
  });

  it("offers damage, photos and history of the unit", () => {
    renderSheet(MAINTENANCE_UNIT);

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: new RegExp(CATEGORY_UNITS_COPY.ACCESS_DAMAGE),
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(
        MAINTENANCE_UNIT.id
      )
    );
    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: new RegExp(
          CATEGORY_UNITS_COPY.ACCESS_HISTORY
        ),
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_HISTORY(MAINTENANCE_UNIT.id)
    );
  });

  it("asks to complete a report that was left for later", () => {
    renderSheet({
      ...MAINTENANCE_UNIT,
      statusDetails: {
        damage: null,
        jobs: [],
        pendingReportId: "report-9",
      },
    });

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_UNITS_COPY.STATUS_DAMAGE_COMPLETE,
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE("report-9")
    );
  });

  it("lists the jobs already done on a unit in maintenance", () => {
    renderSheet(MAINTENANCE_UNIT);

    expect(
      screen.getByText(
        "Cambio de llanta · Llanta del remolque"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/₡ 18\.000 · taller externo/)
    ).toBeInTheDocument();
  });

  it("says no job was noted when the unit has none", () => {
    renderSheet({
      ...MAINTENANCE_UNIT,
      statusDetails: {
        damage: null,
        jobs: [],
        pendingReportId: null,
      },
    });

    expect(
      screen.getByText(
        CATEGORY_UNITS_COPY.STATUS_JOBS_EMPTY
      )
    ).toBeInTheDocument();
  });

  it("opens the job form with this unit already chosen", () => {
    renderSheet(MAINTENANCE_UNIT);

    expect(
      screen.getByRole("link", {
        name: CATEGORY_UNITS_COPY.STATUS_REGISTER_JOB,
      })
    ).toHaveAttribute(
      "href",
      "/operations/maintenance/new?unit=unit-maint"
    );
  });

  it("returns the unit to service and refreshes the board", async () => {
    renderSheet(MAINTENANCE_UNIT);

    await userEvent.click(
      screen.getByRole("button", {
        name: CATEGORY_UNITS_COPY.STATUS_RETURN_TO_SERVICE,
      })
    );

    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(submitBoardUnitMaintenance).toHaveBeenCalledWith(
      {
        inMaintenance: false,
        unitId: "unit-maint",
      }
    );
    expect(refreshMock).toHaveBeenCalled();
  });

  it("shows the damage report of a damaged unit instead of jobs", () => {
    renderSheet(DAMAGED_UNIT);

    expect(screen.getByText("Choque")).toBeInTheDocument();
    expect(
      screen.getByText("Golpe en el casco")
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: CATEGORY_UNITS_COPY.STATUS_REGISTER_JOB,
      })
    ).not.toBeInTheDocument();
  });

  it("sends a damaged unit to maintenance", async () => {
    renderSheet(DAMAGED_UNIT);

    await userEvent.click(
      screen.getByRole("button", {
        name: CATEGORY_UNITS_COPY.STATUS_SEND_TO_MAINTENANCE,
      })
    );

    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(submitBoardUnitMaintenance).toHaveBeenCalledWith(
      {
        inMaintenance: true,
        unitId: "unit-damaged",
      }
    );
  });

  it("explains why the change was refused when the unit is out", async () => {
    vi.mocked(submitBoardUnitMaintenance).mockResolvedValue(
      {
        status: CATEGORY_UNIT_UPDATE_STATUS.OCCUPIED,
      }
    );
    renderSheet(DAMAGED_UNIT);

    await userEvent.click(
      screen.getByRole("button", {
        name: CATEGORY_UNITS_COPY.STATUS_RETURN_TO_SERVICE,
      })
    );

    expect(
      await screen.findByText(
        CATEGORY_UNITS_COPY.MAINTENANCE_OCCUPIED
      )
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});
