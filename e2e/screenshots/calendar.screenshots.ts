import { test } from "@playwright/test";
import { CALENDAR_VIEW } from "@/app/constants";
import { createCalendarPage } from "../pages/Calendar.page";
import { captureViewport } from "../support/captureViewport";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { E2E_CALENDAR } from "../constants/E2eCalendar.constants";

test("captures calendar views and operations", async ({
  page,
}, testInfo) => {
  const calendar = createCalendarPage(page);
  await calendar.goTo();
  for (const view of Object.values(CALENDAR_VIEW)) {
    await calendar.selectView(view);
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        `${E2E_CALENDAR.SCREENSHOT_PREFIX}-${view}`,
        testInfo.project.name
      )
    );
  }
  await calendar.goTo(true);
  await calendar.getView(CALENDAR_VIEW.DAY).waitFor();
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_CALENDAR.OPERATIONS_SCREENSHOT,
      testInfo.project.name
    )
  );
});
