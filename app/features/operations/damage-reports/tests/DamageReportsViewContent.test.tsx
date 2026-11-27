import { cleanup } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  DAMAGE_CAUSE_LABELS,
  EQUIPMENT_RETIRED,
} from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import {
  DAMAGE_FILTERS,
  DAMAGE_OVERVIEW,
  RETIRED_PENDING_REPORT,
} from "./DamageReports.constants";
import { createDamageReportsPage } from "./DamageReports.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

const OPEN_DAY = { ...DAMAGE_FILTERS, isDayOpen: true };
const CHARTS = {
  ...DAMAGE_FILTERS,
  tab: "charts" as const,
};
const REPORTS_WITH_PHOTOS = 4;

const buildRetiredOverview = () => ({
  ...DAMAGE_OVERVIEW,
  calendarReports: [RETIRED_PENDING_REPORT],
  pending: [],
  recent: [RETIRED_PENDING_REPORT],
});

describe("DamageReportsView content", () => {
  afterEach(cleanup);

  it("shows the reports of the day and photos only where they are kept", () => {
    const page = createDamageReportsPage({
      filters: OPEN_DAY,
    });

    expect(page.queryDialog()).toBeInTheDocument();
    expect(
      page.queryLinks(DAMAGE_REPORTS_COPY.VIEW_PHOTOS)
    ).toHaveLength(REPORTS_WITH_PHOTOS);
  });

  it("offers no history, completion or photos for a retired machine", () => {
    const page = createDamageReportsPage({
      filters: OPEN_DAY,
      overview: buildRetiredOverview(),
    });

    expect(
      page.getText(
        EQUIPMENT_RETIRED.LABELLED(
          RETIRED_PENDING_REPORT.unitCode
        )
      )
    ).toBeInTheDocument();
    expect(
      page.queryLink(RETIRED_PENDING_REPORT.unitCode)
    ).not.toBeInTheDocument();
    expect(
      page.queryLink(DAMAGE_REPORTS_COPY.COMPLETE)
    ).not.toBeInTheDocument();
    expect(
      page.queryLink(DAMAGE_REPORTS_COPY.VIEW_PHOTOS)
    ).not.toBeInTheDocument();
  });

  it("ranks a retired machine without linking to it", () => {
    const page = createDamageReportsPage({
      filters: CHARTS,
      overview: buildRetiredOverview(),
    });

    expect(
      page.getText(
        EQUIPMENT_RETIRED.LABELLED(
          RETIRED_PENDING_REPORT.unitCode
        )
      )
    ).toBeInTheDocument();
    expect(
      page.queryLink(
        new RegExp(RETIRED_PENDING_REPORT.unitCode)
      )
    ).not.toBeInTheDocument();
  });

  it("opens the calendar filtered when a cause bar is touched", () => {
    const page = createDamageReportsPage({
      filters: CHARTS,
    });

    expect(
      page.getLink(`${DAMAGE_CAUSE_LABELS.rollover}: 1`)
    ).toHaveAttribute(
      "href",
      buildDamageReportsHref(CHARTS, {
        cause: "rollover",
        tab: "calendar",
      })
    );
  });
});
