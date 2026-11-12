import { expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import { createOperationsCalendarPage } from "./OperationsCalendar.page";
import { OPERATIONS_CALENDAR_SNAPSHOT } from "./OperationsCalendar.constants";
import {
  renderOperationsCalendar,
  setupOperationsCalendarTests,
} from "./operationsCalendarTestSetup";

setupOperationsCalendarTests();

it.each([CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK])(
  "keeps reservation blocks static in %s view",
  async (view) => {
    renderOperationsCalendar({
      snapshot: OPERATIONS_CALENDAR_SNAPSHOT,
    });
    const page = createOperationsCalendarPage();
    await page.selectView(view);
    page
      .getBlocks()
      .forEach((block) =>
        expect(block.closest("a")).toBeNull()
      );
  }
);
