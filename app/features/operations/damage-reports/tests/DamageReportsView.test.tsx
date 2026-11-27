import { cleanup } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import {
  DAMAGE_FILTERS,
  DAMAGE_OVERVIEW,
  PENDING_REPORT,
  SECOND_PENDING_REPORT,
} from "./DamageReports.constants";
import { createDamageReportsPage } from "./DamageReports.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

const CHARTS = {
  ...DAMAGE_FILTERS,
  tab: "charts" as const,
};

describe("DamageReportsView", () => {
  afterEach(cleanup);

  it("offers a new report", () => {
    const page = createDamageReportsPage();

    expect(
      page.getLink(DAMAGE_REPORTS_COPY.NEW_REPORT)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT
    );
  });

  it("goes straight to the only report left to complete", () => {
    const page = createDamageReportsPage();

    expect(
      page.getLink(
        new RegExp(DAMAGE_REPORTS_COPY.PENDING_TITLE(1))
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
        PENDING_REPORT.id
      )
    );
  });

  it("lists several pending reports in a sheet", () => {
    const pending = [PENDING_REPORT, SECOND_PENDING_REPORT];
    const page = createDamageReportsPage({
      filters: { ...DAMAGE_FILTERS, showPending: true },
      overview: { ...DAMAGE_OVERVIEW, pending },
    });

    expect(page.queryDialog()).toHaveAccessibleName(
      DAMAGE_REPORTS_COPY.PENDING_TITLE(pending.length)
    );
    expect(
      page.queryLinks(
        new RegExp(DAMAGE_REPORTS_COPY.COMPLETE)
      )
    ).toHaveLength(pending.length);
  });

  it("keeps the day closed on a phone until it is touched", () => {
    const page = createDamageReportsPage();

    expect(page.queryDialog()).not.toBeInTheDocument();
  });

  it("confirms what was just saved", () => {
    const page = createDamageReportsPage({
      savedMessage: DAMAGE_REPORTS_COPY.SAVED.later,
    });

    expect(page.getStatus()).toHaveTextContent(
      DAMAGE_REPORTS_COPY.SAVED.later
    );
  });

  it("says so when the period has no damage", () => {
    const page = createDamageReportsPage({
      filters: CHARTS,
      overview: {
        ...DAMAGE_OVERVIEW,
        pending: [],
        recent: [],
      },
    });

    expect(
      page.getText(DAMAGE_REPORTS_COPY.TOP_EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error instead of the screen", () => {
    const page = createDamageReportsPage({
      errorMessage: DAMAGE_REPORTS_COPY.FORBIDDEN,
    });

    expect(page.getAlert()).toHaveTextContent(
      DAMAGE_REPORTS_COPY.FORBIDDEN
    );
    expect(
      page.queryText(DAMAGE_REPORTS_COPY.NEW_REPORT)
    ).not.toBeInTheDocument();
  });
});
