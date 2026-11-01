import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY as guideCopy } from "@/app/components/reservation-calendar/constants/ReservationCalendarGuideCopy.constants";
import { createOperationsCalendarPage } from "./OperationsCalendar.page";
import {
  OPERATIONS_CALENDAR_SNAPSHOT,
  OPERATIONS_CALENDAR_TEST as fixture,
} from "./OperationsCalendar.constants";
import {
  renderOperationsCalendar,
  setupOperationsCalendarTests,
} from "./operationsCalendarTestSetup";

setupOperationsCalendarTests();

describe("Operations calendar guide states", () => {
  it("renders available internal and external guides", () => {
    renderOperationsCalendar({
      snapshot: OPERATIONS_CALENDAR_SNAPSHOT,
    });
    const page = createOperationsCalendarPage();
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
  });

  it("renders loaded empty guide data explicitly", () => {
    renderOperationsCalendar({
      snapshot: {
        ...OPERATIONS_CALENDAR_SNAPSHOT,
        entries: OPERATIONS_CALENDAR_SNAPSHOT.entries.map(
          (entry) => ({ ...entry, guides: [] })
        ),
      },
    });
    const page = createOperationsCalendarPage();
    expect(
      page.getMessages(guideCopy.UNASSIGNED)
    ).toHaveLength(fixture.DAY_COUNT);
    expect(page.getBlocks()[0]).toHaveAccessibleName(
      expect.stringContaining(guideCopy.UNASSIGNED)
    );
  });

  it("does not render the guide section for unloaded data", () => {
    renderOperationsCalendar({
      snapshot: {
        ...OPERATIONS_CALENDAR_SNAPSHOT,
        entries: OPERATIONS_CALENDAR_SNAPSHOT.entries.map(
          (entry) => ({ ...entry, guides: undefined })
        ),
      },
    });
    const page = createOperationsCalendarPage();
    expect(page.getMessages(guideCopy.LABEL)).toHaveLength(
      0
    );
  });

  it("renders assigned guides whose worker is unavailable", () => {
    renderOperationsCalendar({
      snapshot: {
        ...OPERATIONS_CALENDAR_SNAPSHOT,
        entries: OPERATIONS_CALENDAR_SNAPSHOT.entries.map(
          (entry) => ({
            ...entry,
            guides: [
              {
                id: "operations-unavailable-guide",
                type: RESERVATION_CALENDAR_GUIDE_TYPE.UNAVAILABLE,
              },
            ],
          })
        ),
      },
    });
    const page = createOperationsCalendarPage();
    expect(
      page.getMessages(guideCopy.UNAVAILABLE)
    ).toHaveLength(fixture.DAY_COUNT);
    expect(page.getBlocks()[0]).toHaveAccessibleName(
      expect.stringContaining(guideCopy.UNAVAILABLE)
    );
  });
});
