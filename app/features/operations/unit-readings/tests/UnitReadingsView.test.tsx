import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UnitReadingsView from "../UnitReadingsView";
import { UNIT_READINGS_COPY } from "../constants/UnitReadingsCopy.constants";
import {
  UNIT,
  UNIT_ID,
  UNIT_WITHOUT_READING,
} from "./UnitReadings.constants";

describe("UnitReadingsView", () => {
  it("shows the gauge, the usage and the warnings of each unit without opening it", () => {
    render(
      <UnitReadingsView
        errorMessage={null}
        units={[
          UNIT,
          {
            ...UNIT_WITHOUT_READING,
            code: "JS-2",
            id: "eeeeeeee-0000-0000-0000-000000000002",
          },
        ]}
      />
    );

    expect(
      screen.getByText("JS-1 · Jet ski")
    ).toBeInTheDocument();
    expect(screen.getByText("2 de 4")).toBeInTheDocument();
    expect(screen.getByText("60.5 h")).toBeInTheDocument();
    expect(
      screen.getAllByText(UNIT_READINGS_COPY.OIL_OVERDUE)
    ).toHaveLength(1);
    expect(
      screen.getAllByText(UNIT_READINGS_COPY.OUT_OF_SERVICE)
    ).toHaveLength(1);
    expect(screen.getByText("12 km")).toBeInTheDocument();
  });

  it("links each unit to its correction", () => {
    render(
      <UnitReadingsView
        errorMessage={null}
        units={[UNIT]}
      />
    );

    expect(
      screen.getByRole("link", {
        name: UNIT_READINGS_COPY.CORRECT,
      })
    ).toHaveAttribute(
      "href",
      `/operations/unit-readings/${UNIT_ID}`
    );
  });

  it("says there are no units with a motor", () => {
    render(
      <UnitReadingsView
        errorMessage={null}
        units={[]}
      />
    );

    expect(
      screen.getByText(UNIT_READINGS_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error and nothing else", () => {
    render(
      <UnitReadingsView
        errorMessage={UNIT_READINGS_COPY.ERROR}
        units={[UNIT]}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      UNIT_READINGS_COPY.ERROR
    );
    expect(
      screen.queryByText("JS-1 · Jet ski")
    ).not.toBeInTheDocument();
  });
});
