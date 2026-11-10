import { PATHS } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import {
  E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS,
  E2E_SYSTEM_NAVIGATION_TOLERANCE_PX,
} from "../constants/E2eSystemNavigation.constants";
import { createSystemNavigationPage } from "../pages/SystemNavigation.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test("shows Reservations links and hides Inventory", async ({
  activeWorker,
  page,
}) => {
  await addOperationsArea(activeWorker.id);
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  await createWorkModePage(page)
    .getCard(E2E_RESERVATIONS_AREA_LABEL)
    .click();

  const navigationPage = createSystemNavigationPage(page);
  await navigationPage.goTo();
  await expect(
    navigationPage.getNavigation()
  ).toBeVisible();
  await expect(
    await navigationPage.getItemSpacingDifference()
  ).toBeLessThanOrEqual(
    E2E_SYSTEM_NAVIGATION_TOLERANCE_PX.EDGE_SPACING
  );
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.CALENDAR_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.RESERVATIONS_CALENDAR
  );
  await expect(
    navigationPage.getNavigation().getByRole("link", {
      name: E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.INVENTORY_LABEL,
    })
  ).toHaveCount(0);
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY
  );
  await navigationPage
    .getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY_LABEL
    )
    .click();
  await expect(page).toHaveURL(PATHS.HISTORY.ROOT);
});
