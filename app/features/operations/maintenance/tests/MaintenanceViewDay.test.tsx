import { cleanup } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  DAMAGE_PENDING_LABEL,
  EQUIPMENT_RETIRED,
  PATHS,
} from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import { buildRegisterHref } from "../utils/buildRegisterHref";
import { MAINTENANCE_JOBS } from "./MaintenanceData.constants";
import {
  RETIRED_DATA,
  RETIRED_JOB,
} from "./MaintenanceRetired.constants";
import { createMaintenancePage } from "./Maintenance.page";

const replace = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

const TODAY = "2026-11-25";
const JOB_DAY = "2026-11-22";
const JOB_TEXT = /Turbina nueva/;

describe("MaintenanceView day and retired machines", () => {
  afterEach(() => {
    cleanup();
    replace.mockReset();
  });

  it("opens the chosen day and offers to register on it", () => {
    const page = createMaintenancePage({ panel: "day" });

    expect(
      page.getText(
        MAINTENANCE_COPY.SUMMARY_TITLE(
          "CU-1",
          DAMAGE_PENDING_LABEL
        )
      )
    ).toBeInTheDocument();
    expect(
      page.getLink(MAINTENANCE_COPY.REGISTER_ON_DAY)
    ).toHaveAttribute(
      "href",
      buildRegisterHref(TODAY, null)
    );
  });

  it("links a job of the day to the history of its machine", () => {
    const page = createMaintenancePage({
      day: JOB_DAY,
      panel: "day",
    });

    expect(page.getLink(JOB_TEXT)).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_HISTORY(
        MAINTENANCE_JOBS[0].unitId
      )
    );
  });

  it("shows the job of a retired machine without linking to it", () => {
    const page = createMaintenancePage(
      { day: JOB_DAY, panel: "day" },
      RETIRED_DATA
    );

    expect(
      page.getText(new RegExp(EQUIPMENT_RETIRED.LABEL))
    ).toBeInTheDocument();
    expect(
      page.queryLink(JOB_TEXT)
    ).not.toBeInTheDocument();
  });

  it("ranks a retired machine without linking to it", () => {
    const page = createMaintenancePage(
      { tab: "summary" },
      RETIRED_DATA
    );

    expect(
      page.getText(
        EQUIPMENT_RETIRED.LABELLED(RETIRED_JOB.unitCode)
      )
    ).toBeInTheDocument();
    expect(
      page.queryLink(new RegExp(RETIRED_JOB.unitCode))
    ).not.toBeInTheDocument();
  });
});
