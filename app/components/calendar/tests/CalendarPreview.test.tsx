import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, render } from "@testing-library/react";
import { notFound } from "next/navigation";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREVIEW,
} from "@/app/constants";
import { CalendarPreviewEntry } from "../CalendarPreviewEntry";
import { CALENDAR_PREVIEW_TEST } from "./CalendarPreview.constants";
import { createCalendarViewPage } from "./CalendarView.page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

describe("CalendarPreviewEntry", () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.unstubAllEnvs();
  });

  it("rejects the preview in production before supplying view data", () => {
    vi.mocked(notFound).mockImplementation(() => {
      throw new Error(CALENDAR_PREVIEW_TEST.NOT_FOUND);
    });
    vi.stubEnv(
      CALENDAR_PREVIEW_TEST.ENVIRONMENT,
      CALENDAR_PREVIEW_TEST.PRODUCTION
    );

    expect(() =>
      CalendarPreviewEntry({
        example: CALENDAR_PREVIEW.OPERATIONS_EXAMPLE,
      })
    ).toThrow(CALENDAR_PREVIEW_TEST.NOT_FOUND);
  });

  it.each([
    [
      CALENDAR_PREVIEW.OPERATIONS_EXAMPLE,
      CALENDAR_ALLOWED_VIEWS.OPERATIONS,
    ],
    [undefined, CALENDAR_ALLOWED_VIEWS.RESERVATIONS],
  ])(
    "supplies the development example policy for %s",
    (example, allowedViews) => {
      vi.stubEnv(
        CALENDAR_PREVIEW_TEST.ENVIRONMENT,
        CALENDAR_PREVIEW.DEVELOPMENT
      );

      render(CalendarPreviewEntry({ example }));
      const calendar = createCalendarViewPage();
      for (const view of allowedViews) {
        expect(calendar.getView(view)).toBeInTheDocument();
      }
    }
  );
});
