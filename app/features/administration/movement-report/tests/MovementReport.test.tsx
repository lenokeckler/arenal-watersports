import {
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import MovementReport from "../MovementReport";
import { MOVEMENT_REPORT_COPY } from "../constants/MovementReportCopy.constants";
import {
  getMovementReport,
  MovementReportAccessError,
} from "../services/getMovementReport";
import { MOVEMENT_REPORT } from "./MovementReport.constants";

const redirect = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    redirect(path);
    throw new Error("NEXT_REDIRECT");
  },
}));
vi.mock(
  "../services/getMovementReport",
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import("../services/getMovementReport")
    >()),
    getMovementReport: vi.fn(),
  })
);

describe("MovementReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("charts the departures and the income by month and the departures by weekday", async () => {
    vi.mocked(getMovementReport).mockResolvedValue(
      MOVEMENT_REPORT
    );

    render(await MovementReport());

    expect(
      screen.getByText(
        MOVEMENT_REPORT_COPY.MONTH_DEPARTURES_TITLE
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        MOVEMENT_REPORT_COPY.INCOME_TITLE("USD")
      )
    ).toBeInTheDocument();
    const weekdaySection = screen
      .getByText(
        MOVEMENT_REPORT_COPY.WEEKDAY_DEPARTURES_TITLE
      )
      .closest("section") as HTMLElement;
    expect(
      within(weekdaySection).getAllByRole("listitem")
    ).toHaveLength(7);
    expect(
      within(weekdaySection).getByText("Sábado")
    ).toBeInTheDocument();
  });

  it("says there is nothing to chart yet", async () => {
    vi.mocked(getMovementReport).mockResolvedValue({
      departuresByMonth: [],
      departuresByWeekday: [],
      incomeByCurrency: [],
    });

    render(await MovementReport());

    expect(
      screen.getByText(MOVEMENT_REPORT_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows an error when the report cannot be read", async () => {
    vi.mocked(getMovementReport).mockRejectedValue(
      new Error("down")
    );

    render(await MovementReport());

    expect(screen.getByRole("alert")).toHaveTextContent(
      MOVEMENT_REPORT_COPY.ERROR
    );
  });

  it("sends anyone who is not an administrator home", async () => {
    vi.mocked(getMovementReport).mockRejectedValue(
      new MovementReportAccessError()
    );

    await expect(MovementReport()).rejects.toThrow(
      "NEXT_REDIRECT"
    );
    expect(redirect).toHaveBeenCalledOnce();
  });
});
