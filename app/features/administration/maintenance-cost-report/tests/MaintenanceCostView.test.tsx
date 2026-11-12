import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MaintenanceCostView from "../MaintenanceCostView";
import { MAINTENANCE_COST_COPY } from "../constants/MaintenanceCostReportCopy.constants";
import { groupCostsByUnit } from "../utils/groupCostsByUnit";
import {
  COST_CATEGORY_NAMES,
  COST_ROWS,
} from "./MaintenanceCostReport.constants";

const costs = groupCostsByUnit(
  COST_ROWS,
  COST_CATEGORY_NAMES
);

describe("MaintenanceCostView", () => {
  it("shows what each machine has cost to keep, by currency, with its jobs and its last job", () => {
    render(
      <MaintenanceCostView
        costs={costs}
        errorMessage={null}
      />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getByText("JS-2 · Jet ski")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Total: ₡35,000 · Total: $120")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Trabajos con costo: 3 · Último trabajo: 06/09/2026"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Total: ₡8,000.5")
    ).toBeInTheDocument();
  });

  it("says so when no job had a cost", () => {
    render(
      <MaintenanceCostView
        costs={[]}
        errorMessage={null}
      />
    );

    expect(
      screen.getByText(MAINTENANCE_COST_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error instead of the list", () => {
    render(
      <MaintenanceCostView
        costs={[]}
        errorMessage={MAINTENANCE_COST_COPY.ERROR}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      MAINTENANCE_COST_COPY.ERROR
    );
  });
});
