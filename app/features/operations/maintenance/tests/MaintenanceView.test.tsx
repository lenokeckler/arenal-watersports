import {
  render,
  screen,
  within,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MaintenanceView from "../MaintenanceView";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceOverview } from "../models/MaintenanceOverview.interface";
import {
  MAINTENANCE_OVERVIEW_FIXTURE,
  OIL_TEXT_CASES,
} from "./Maintenance.constants";

const renderView = (
  overview: MaintenanceOverview,
  errorMessage: string | null = null
) =>
  render(
    <MaintenanceView
      errorMessage={errorMessage}
      overview={overview}
    />
  );

const getSection = (name: string) =>
  screen.getByRole("region", { name });

describe("MaintenanceView", () => {
  it("lists the machines that reached their oil change with how far they went", () => {
    renderView(MAINTENANCE_OVERVIEW_FIXTURE);
    const oil = getSection(MAINTENANCE_COPY.OIL_HEADING);

    OIL_TEXT_CASES.forEach(({ text }) => {
      expect(
        within(oil).getByText(text)
      ).toBeInTheDocument();
    });
    expect(
      within(oil).getAllByRole("listitem")
    ).toHaveLength(
      MAINTENANCE_OVERVIEW_FIXTURE.oilDue.length
    );
  });

  it("lists the machines that are out of service with their state", () => {
    renderView(MAINTENANCE_OVERVIEW_FIXTURE);
    const service = getSection(
      MAINTENANCE_COPY.SERVICE_HEADING
    );

    expect(
      within(service).getByText(
        MAINTENANCE_COPY.STATUS.damaged
      )
    ).toBeInTheDocument();
    expect(
      within(service).getByText(
        MAINTENANCE_COPY.STATUS.in_repair
      )
    ).toBeInTheDocument();
  });

  it("says so when nothing needs maintenance", () => {
    renderView({ oilDue: [], outOfService: [] });

    expect(
      screen.getByText(MAINTENANCE_COPY.OIL_EMPTY)
    ).toBeInTheDocument();
    expect(
      screen.getByText(MAINTENANCE_COPY.SERVICE_EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error instead of the lists", () => {
    renderView(
      { oilDue: [], outOfService: [] },
      MAINTENANCE_COPY.ERROR
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      MAINTENANCE_COPY.ERROR
    );
    expect(
      screen.queryByText(MAINTENANCE_COPY.OIL_EMPTY)
    ).not.toBeInTheDocument();
  });
});
