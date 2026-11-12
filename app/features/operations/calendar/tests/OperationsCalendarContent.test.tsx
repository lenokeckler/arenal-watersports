import { describe, expect, it } from "vitest";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY as copy,
} from "@/app/constants";
import { RESERVATION_CALENDAR_EXCLUDED_STATUS } from "@/app/components/reservation-calendar/constants/ReservationCalendarExcludedStatus.constants";
import { CALENDAR_WEEK_DAYS_CLASS } from "@/app/components/calendar/styles/Calendar.styles";
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
  it("renders horizontal day columns in the Operations week view", async () => {
    renderOperationsCalendar({
      snapshot: OPERATIONS_CALENDAR_SNAPSHOT,
    });
    const page = createOperationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.WEEK);

    expect(page.getWeekDayGridClassName()).toContain(
      CALENDAR_WEEK_DAYS_CLASS
    );
  });

  it.each([
    [CALENDAR_VIEW.DAY, true],
    [CALENDAR_VIEW.WEEK, false],
  ])(
    "renders reservation image state correctly in %s view",
    async (view, showsEquipmentImage) => {
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
      expect(page.hasEquipmentImage(fixture.CUSTOMER)).toBe(
        showsEquipmentImage
      );
      expect(page.queryAgenda()).toBeNull();
      expect(page.queryMoney()).toBeNull();
    }
  );
});

describe("Operations calendar excluded lifecycle states", () => {
  it.each(
    Object.values(RESERVATION_CALENDAR_EXCLUDED_STATUS)
  )("excludes %s reservations", (status) => {
    const snapshot = {
      ...OPERATIONS_CALENDAR_SNAPSHOT,
      entries: OPERATIONS_CALENDAR_SNAPSHOT.entries.map(
        (entry) => ({ ...entry, status })
      ),
    };
    renderOperationsCalendar({ snapshot });
    const page = createOperationsCalendarPage();

    expect(page.getBlocks()).toHaveLength(0);
    expect(
      page.getMessages(copy.EMPTY_PERIOD)
    ).toHaveLength(fixture.DAY_COUNT);
  });
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
