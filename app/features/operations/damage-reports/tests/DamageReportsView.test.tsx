import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DamageReportsView from "../DamageReportsView";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportsViewProps } from "../models/DamageReportsViewProps.interface";
import {
  REPORT_ENTRY,
  UNIT,
  UNIT_ID,
} from "./DamageReports.constants";

const BASE_PROPS: DamageReportsViewProps = {
  entries: [REPORT_ENTRY],
  errorMessage: null,
  hasNextPage: false,
  page: 1,
  unit: UNIT,
};

const renderView = (
  props: Partial<DamageReportsViewProps> = {}
) =>
  render(
    <DamageReportsView
      {...BASE_PROPS}
      {...props}
    />
  );

describe("DamageReportsView", () => {
  it("shows the unit with its accumulated impacts and each report", () => {
    renderView();

    expect(
      screen.getByText("JS-1 · Jet ski")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Golpes acumulados: 3")
    ).toBeInTheDocument();
    expect(
      screen.getByText(DAMAGE_REPORTS_COPY.CAUSES.collision)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Golpe contra el muelle")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "10 de noviembre de 2026 · Golpes sumados: 2"
      )
    ).toBeInTheDocument();
  });

  it("says the unit has no reports", () => {
    renderView({ entries: [] });

    expect(
      screen.getByText(DAMAGE_REPORTS_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("says the unit was not found", () => {
    renderView({ entries: [], unit: null });

    expect(
      screen.getByText(DAMAGE_REPORTS_COPY.UNIT_NOT_FOUND)
    ).toBeInTheDocument();
  });

  it("shows the error and nothing else", () => {
    renderView({ errorMessage: DAMAGE_REPORTS_COPY.ERROR });

    expect(screen.getByRole("alert")).toHaveTextContent(
      DAMAGE_REPORTS_COPY.ERROR
    );
    expect(
      screen.queryByText(DAMAGE_REPORTS_COPY.EMPTY)
    ).not.toBeInTheDocument();
  });

  it("links to the previous and next pages of the unit", () => {
    renderView({ hasNextPage: true, page: 2 });

    expect(
      screen.getByRole("link", {
        name: DAMAGE_REPORTS_COPY.PREVIOUS_PAGE,
      })
    ).toHaveAttribute(
      "href",
      `/operations/damage-reports?unidad=${UNIT_ID}&pagina=1`
    );
    expect(
      screen.getByRole("link", {
        name: DAMAGE_REPORTS_COPY.NEXT_PAGE,
      })
    ).toHaveAttribute(
      "href",
      `/operations/damage-reports?unidad=${UNIT_ID}&pagina=3`
    );
  });

  it("shows no pagination links on a single page", () => {
    renderView();

    expect(
      screen.queryByRole("link")
    ).not.toBeInTheDocument();
  });
});
