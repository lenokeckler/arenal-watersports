import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MaintenanceHistoryView from "../MaintenanceHistoryView";
import { MAINTENANCE_HISTORY_COPY } from "../constants/MaintenanceHistoryCopy.constants";
import {
  DETAIL_CASES,
  HISTORY_ENTRY,
  HISTORY_FREE_ENTRY,
} from "./MaintenanceHistory.constants";

const renderView = (
  props: Partial<
    Parameters<typeof MaintenanceHistoryView>[0]
  >
) =>
  render(
    <MaintenanceHistoryView
      entries={[]}
      errorMessage={null}
      hasNextPage={false}
      page={1}
      {...props}
    />
  );

describe("MaintenanceHistoryView", () => {
  it("lists every job with its unit, its type, what was done, its date and its cost", () => {
    renderView({
      entries: [HISTORY_ENTRY, HISTORY_FREE_ENTRY],
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getAllByText("JS-1 · Jet ski")
    ).toHaveLength(2);
    expect(
      screen.getByText(
        MAINTENANCE_HISTORY_COPY.WORK_TYPES.part_change
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(HISTORY_ENTRY.description ?? "")
    ).toBeInTheDocument();
    DETAIL_CASES.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("says so when no job was registered", () => {
    renderView({});

    expect(
      screen.getByText(MAINTENANCE_HISTORY_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error instead of the list", () => {
    renderView({
      errorMessage: MAINTENANCE_HISTORY_COPY.ERROR,
    });

    expect(screen.getByRole("alert")).toHaveTextContent(
      MAINTENANCE_HISTORY_COPY.ERROR
    );
  });

  it("links to the next page only when there is one and to the previous one after the first", () => {
    const { unmount } = renderView({
      hasNextPage: true,
      page: 1,
    });

    expect(
      screen.getByRole("link", {
        name: MAINTENANCE_HISTORY_COPY.NEXT_PAGE,
      })
    ).toHaveAttribute(
      "href",
      "/operations/maintenance/history?pagina=2"
    );
    expect(
      screen.queryByRole("link", {
        name: MAINTENANCE_HISTORY_COPY.PREVIOUS_PAGE,
      })
    ).not.toBeInTheDocument();
    unmount();

    renderView({ hasNextPage: false, page: 3 });

    expect(
      screen.getByRole("link", {
        name: MAINTENANCE_HISTORY_COPY.PREVIOUS_PAGE,
      })
    ).toHaveAttribute(
      "href",
      "/operations/maintenance/history?pagina=2"
    );
    expect(
      screen.queryByRole("link", {
        name: MAINTENANCE_HISTORY_COPY.NEXT_PAGE,
      })
    ).not.toBeInTheDocument();
  });
});
