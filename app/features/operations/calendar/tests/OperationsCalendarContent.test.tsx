import { describe, expect, it } from "vitest";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY as copy,
} from "@/app/constants";
import { createOperationsCalendarPage } from "./OperationsCalendar.page";
import {
  OPERATIONS_CALENDAR_SNAPSHOT,
  OPERATIONS_CALENDAR_PARTIAL,
  OPERATIONS_CALENDAR_TEST as fixture,
} from "./OperationsCalendar.constants";
import { OPERATIONS_CALENDAR_COVERAGE_CASES } from "./OperationsCalendarCoverage.constants";
import {
  renderOperationsCalendar,
  setupOperationsCalendarTests,
} from "./operationsCalendarTestSetup";

setupOperationsCalendarTests();

describe("Operations calendar snapshot coverage", () => {
  it.each(OPERATIONS_CALENDAR_COVERAGE_CASES)(
    "reports $name coverage separately for day and week",
    async ({ snapshot, message, dayCount, weekCount }) => {
      renderOperationsCalendar({ snapshot });
      const page = createOperationsCalendarPage();
      expect(page.getMessages(message)).toHaveLength(
        dayCount
      );
      if (message !== copy.EMPTY_PERIOD) {
        expect(
          page.getMessages(copy.EMPTY_PERIOD)
        ).toHaveLength(0);
      }

      await page.selectView(CALENDAR_VIEW.WEEK);

      expect(page.getMessages(message)).toHaveLength(
        weekCount
      );
      if (message !== copy.EMPTY_PERIOD) {
        expect(
          page.getMessages(copy.EMPTY_PERIOD)
        ).toHaveLength(0);
      }
    }
  );
});

describe("Operations calendar reservation content", () => {
  it.each([CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK])(
    "renders injected reservations without agenda or money in %s",
    async (view) => {
      renderOperationsCalendar({
        snapshot: OPERATIONS_CALENDAR_SNAPSHOT,
      });
      const page = createOperationsCalendarPage();

      await page.selectView(view);

      expect(page.getBlocks()).toHaveLength(
        fixture.DAY_COUNT
      );
      expect(page.getBlocks()[0]).toHaveTextContent(
        fixture.CUSTOMER
      );
      expect(
        page.getMessages(fixture.INTERNAL_GUIDE_NAME)
      ).toHaveLength(1);
      expect(
        page.getMessages(fixture.INTERNAL_GUIDE_TYPE)
      ).toHaveLength(1);
      expect(
        page.getMessages(fixture.EXTERNAL_GUIDE_NAME)
      ).toHaveLength(1);
      expect(
        page.getMessages(fixture.EXTERNAL_GUIDE_TYPE)
      ).toHaveLength(1);
      expect(
        page.getMessages(fixture.GUIDE_LABEL)
      ).toHaveLength(1);
      expect(page.queryAgenda()).toBeNull();
      expect(page.queryMoney()).toBeNull();
    }
  );
});

describe("Operations calendar partial snapshot content", () => {
  it("retains loaded reservations inside a partially covered week", async () => {
    renderOperationsCalendar({
      snapshot: OPERATIONS_CALENDAR_PARTIAL,
    });
    const page = createOperationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.WEEK);

    expect(page.getBlocks()).toHaveLength(
      fixture.DAY_COUNT
    );
    expect(page.getBlocks()[0]).toHaveTextContent(
      fixture.CUSTOMER
    );
  });
});
