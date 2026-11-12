import { PATHS } from "@/app/constants";
import { E2E_OPERATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import {
  E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS,
  E2E_SYSTEM_NAVIGATION_KEY,
  E2E_SYSTEM_NAVIGATION_ARIA,
  E2E_SYSTEM_NAVIGATION_TOLERANCE_PX,
} from "../constants/E2eSystemNavigation.constants";
import { createSystemNavigationPage } from "../pages/SystemNavigation.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("shows Operations links and supports keyboard navigation", async ({
  activeWorker,
  page,
}) => {
  await addOperationsArea(activeWorker.id);
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  await createWorkModePage(page)
    .getCard(E2E_OPERATIONS_AREA_LABEL)
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
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.BOARD_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.BOARD
  );
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.CALENDAR_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.OPERATIONS_CALENDAR
  );
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.INVENTORY_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.OPERATIONS_INVENTORY
  );
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY_LABEL
    )
  ).toHaveAttribute(
    "href",
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY
  );
  const boardLink = navigationPage.getLink(
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.BOARD_LABEL
  );
  await expect(boardLink).toHaveAttribute(
    "aria-current",
    E2E_SYSTEM_NAVIGATION_ARIA.CURRENT_PAGE
  );
  await navigationPage
    .getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.INVENTORY_LABEL
    )
    .click();
  await expect(page).toHaveURL(PATHS.OPERATIONS.INVENTORY);
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.INVENTORY_LABEL
    )
  ).toHaveAttribute(
    "aria-current",
    E2E_SYSTEM_NAVIGATION_ARIA.CURRENT_PAGE
  );
  await navigationPage
    .getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY_LABEL
    )
    .click();
  await expect(page).toHaveURL(PATHS.HISTORY.ROOT);
  await expect(
    navigationPage.getLink(
      E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.HISTORY_LABEL
    )
  ).toHaveAttribute(
    "aria-current",
    E2E_SYSTEM_NAVIGATION_ARIA.CURRENT_PAGE
  );

  const boardLinkAfterNavigation = navigationPage.getLink(
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.BOARD_LABEL
  );
  await boardLinkAfterNavigation.focus();
  await page.keyboard.press(
    E2E_SYSTEM_NAVIGATION_KEY.ENTER
  );
  await expect(page).toHaveURL(PATHS.BOARD);
  await expect(boardLinkAfterNavigation).toHaveAttribute(
    "aria-current",
    E2E_SYSTEM_NAVIGATION_ARIA.CURRENT_PAGE
  );
});

test("shows the five Administration links in order without the account menu", async ({
  page,
}) => {
  const navigationPage = createSystemNavigationPage(page);
  await signInAsSeededWorker(page);
  await navigationPage.goTo();

  await expect(
    navigationPage.getNavigation()
  ).toBeVisible();
  await expect(navigationPage.getLinks()).toHaveCount(
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.ADMINISTRATION
      .length
  );
  expect(await navigationPage.getLinkHrefs()).toEqual(
    E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.ADMINISTRATION.map(
      ({ href }) => href
    )
  );
  await expect(navigationPage.getMenuButton()).toHaveCount(
    0
  );
  for (const {
    href,
    label,
  } of E2E_SYSTEM_NAVIGATION_EXPECTED_LINKS.ADMINISTRATION) {
    await expect(
      navigationPage.getLink(label)
    ).toHaveAttribute("href", href);
  }
});
