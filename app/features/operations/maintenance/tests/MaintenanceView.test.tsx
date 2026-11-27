import { cleanup } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import {
  MAINTENANCE_DATA,
  OTHER_UNIT_ID,
} from "./MaintenanceData.constants";
import { createMaintenancePage } from "./Maintenance.page";

const replace = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

const WAITING = 5;
const OIL_WAITING = 4;
const OUT_WAITING = 1;

describe("MaintenanceView", () => {
  afterEach(() => {
    cleanup();
    replace.mockReset();
  });

  it("offers to register a job from the heading", () => {
    const page = createMaintenancePage();

    expect(
      page.getLink(MAINTENANCE_COPY.NEW_JOB)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.MAINTENANCE_NEW
    );
  });

  it("sums up what needs attention in one strip", () => {
    const page = createMaintenancePage();

    expect(
      page.getText(MAINTENANCE_COPY.ATTEND_HEADING(WAITING))
    ).toBeInTheDocument();
    expect(
      page.getText(
        MAINTENANCE_COPY.ATTEND_DETAIL(
          OIL_WAITING,
          OUT_WAITING
        )
      )
    ).toBeInTheDocument();
    expect(page.queryDialog()).not.toBeInTheDocument();
  });

  it("lists every machine to attend in a sheet on request", () => {
    const page = createMaintenancePage({ attend: "open" });

    expect(page.queryDialog()).toHaveAccessibleName(
      MAINTENANCE_COPY.ATTEND_HEADING(WAITING)
    );
    expect(
      page.getText(MAINTENANCE_COPY.STATUS.damaged)
    ).toBeInTheDocument();
    expect(
      page.getText(MAINTENANCE_COPY.STATUS.in_repair)
    ).toBeInTheDocument();
  });

  it("moves to the chosen machine without adding history", () => {
    const page = createMaintenancePage();

    page.chooseMachine(OTHER_UNIT_ID);

    expect(replace).toHaveBeenCalledWith(
      expect.stringContaining(`machine=${OTHER_UNIT_ID}`),
      { scroll: false }
    );
  });

  it("adds up each currency on its own in the charts", () => {
    const page = createMaintenancePage({
      currency: "USD",
      tab: "summary",
    });

    expect(page.getLink(/CU-1.*US\$/)).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_HISTORY(OTHER_UNIT_ID)
    );
    expect(
      page.queryLink(/JS-1.*US\$/)
    ).not.toBeInTheDocument();
  });

  it("shows the error instead of the lists", () => {
    const page = createMaintenancePage(
      {},
      MAINTENANCE_DATA,
      MAINTENANCE_COPY.FORBIDDEN
    );

    expect(page.getAlert()).toHaveTextContent(
      MAINTENANCE_COPY.FORBIDDEN
    );
    expect(
      page.queryText(
        MAINTENANCE_COPY.ATTEND_HEADING(WAITING)
      )
    ).not.toBeInTheDocument();
  });
});
