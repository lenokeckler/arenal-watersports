import {
  render,
  screen,
  within,
} from "@testing-library/react";
import { expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import DepositsView from "../DepositsView";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";

it("links the other reports of administration from the reports screen", () => {
  render(
    <DepositsView
      currentPages={{ pending: 1, retained: 1 }}
      pendingDeposits={[]}
      pendingPageCount={0}
      retainedDeposits={[]}
      retainedPageCount={0}
    />
  );
  const links = within(
    screen.getByRole("navigation", {
      name: DEPOSITS_REPORT_COPY.OTHER_REPORTS_LABEL,
    })
  );

  expect(
    links.getByRole("link", {
      name: DEPOSITS_REPORT_COPY.RESERVATIONS_BY_WORKER,
    })
  ).toHaveAttribute(
    "href",
    PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER
  );
  expect(
    links.getByRole("link", {
      name: DEPOSITS_REPORT_COPY.MOVEMENT,
    })
  ).toHaveAttribute("href", PATHS.ADMINISTRATION.MOVEMENT);
  expect(
    links.getByRole("link", {
      name: DEPOSITS_REPORT_COPY.EQUIPMENT_HOURS,
    })
  ).toHaveAttribute(
    "href",
    PATHS.ADMINISTRATION.EQUIPMENT_HOURS
  );
  expect(
    links.getByRole("link", {
      name: DEPOSITS_REPORT_COPY.MAINTENANCE_COST,
    })
  ).toHaveAttribute(
    "href",
    PATHS.ADMINISTRATION.MAINTENANCE_COST
  );
});
