import {
  BOARD_LAYOUT_COLUMNS,
  PATHS,
} from "@/app/constants";
import { E2E_BOARD_DEVICE_LAYOUT } from "../constants/E2eBoardDeviceLayout.constants";
import { createBoardDeviceLayoutPage } from "../pages/BoardDeviceLayout.page";
import { expect, test } from "../support/activeWorkerTest";
import { openBoardAsOperationsWorker } from "../support/openBoardAsOperationsWorker";

const moveFirstBeforeThird = (
  labels: string[]
): string[] => {
  const remaining = labels.filter(
    (_, index) =>
      index !== E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX
  );

  remaining.splice(
    E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX,
    0,
    labels[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX]
  );

  return remaining;
};

test.describe("Board layout on the device", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await openBoardAsOperationsWorker(page, activeWorker);
  });

  test("chooses two or three cards per row and keeps the choice after reloading", async ({
    page,
  }) => {
    const layoutPage = createBoardDeviceLayoutPage(page);

    await layoutPage.openPanel();
    await layoutPage
      .getColumnsButton(BOARD_LAYOUT_COLUMNS.THREE)
      .click();
    await expect
      .poll(() =>
        layoutPage.boardPage.countCardsInFirstRow()
      )
      .toBe(BOARD_LAYOUT_COLUMNS.THREE);

    await layoutPage
      .getColumnsButton(BOARD_LAYOUT_COLUMNS.TWO)
      .click();
    await expect
      .poll(() =>
        layoutPage.boardPage.countCardsInFirstRow()
      )
      .toBe(BOARD_LAYOUT_COLUMNS.TWO);

    await page.reload();
    await expect(
      layoutPage.boardPage.getGrid()
    ).toBeVisible();
    await expect
      .poll(() =>
        layoutPage.boardPage.countCardsInFirstRow()
      )
      .toBe(BOARD_LAYOUT_COLUMNS.TWO);

    await layoutPage.openPanel();
    await expect(
      layoutPage.getColumnsButton(BOARD_LAYOUT_COLUMNS.TWO)
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      (await layoutPage.readStoredLayout())?.columns
    ).toBe(BOARD_LAYOUT_COLUMNS.TWO);
  });

  test("reorders the categories by dragging with the mouse and keeps the order after reloading", async ({
    page,
  }) => {
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();
    expect(initialOrder.length).toBeGreaterThanOrEqual(
      E2E_BOARD_DEVICE_LAYOUT.MIN_CATEGORIES
    );
    const expectedOrder =
      moveFirstBeforeThird(initialOrder);

    await layoutPage.openPanel();
    await layoutPage.dragHandleWithMouse(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX],
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX]
    );

    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual(expectedOrder);
    expect(await layoutPage.readPanelOrder()).toEqual(
      expectedOrder
    );

    await page.reload();
    await expect(
      layoutPage.boardPage.getGrid()
    ).toBeVisible();
    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual(expectedOrder);
  });

  test("reorders the categories by dragging with a finger", async ({
    page,
  }, testInfo) => {
    test.skip(!testInfo.project.use.hasTouch);
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();

    await layoutPage.openPanel();
    await layoutPage.dragHandleWithFinger(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX],
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX]
    );

    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual(moveFirstBeforeThird(initialOrder));
  });

  test("reorders the cards by dragging them on the board with the mouse", async ({
    page,
  }) => {
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();

    await layoutPage.dragCardWithMouse(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX],
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX]
    );

    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual(moveFirstBeforeThird(initialOrder));
    await expect(page).toHaveURL(PATHS.BOARD);
  });

  test("reorders the cards by holding and dragging them on the board with a finger", async ({
    page,
  }, testInfo) => {
    test.skip(!testInfo.project.use.hasTouch);
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();

    await layoutPage.dragCardWithFinger(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX],
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX]
    );

    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual(moveFirstBeforeThird(initialOrder));
    await expect(page).toHaveURL(PATHS.BOARD);
  });

  test("ignores a saved category the catalog no longer has and sends a category the order does not mention to the end", async ({
    page,
  }) => {
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();

    await layoutPage.openPanel();
    await layoutPage.moveWithKeyboard(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.FIRST_INDEX]
    );
    await expect
      .poll(
        async () =>
          (await layoutPage.readStoredLayout())?.order
      )
      .toHaveLength(initialOrder.length);

    const storedLayout =
      await layoutPage.readStoredLayout();
    const [firstSavedId, ...otherSavedIds] =
      storedLayout?.order ?? [];
    const orderAfterMove =
      await layoutPage.readBoardOrder();

    await layoutPage.storeLayout({
      columns: null,
      order: [
        E2E_BOARD_DEVICE_LAYOUT.UNKNOWN_CATEGORY_ID,
        ...otherSavedIds,
      ],
    });
    await page.reload();
    await expect(
      layoutPage.boardPage.getGrid()
    ).toBeVisible();

    const [firstLabel, ...otherLabels] = orderAfterMove;

    expect(firstSavedId).toBeTruthy();
    await expect
      .poll(() => layoutPage.readBoardOrder())
      .toEqual([...otherLabels, firstLabel]);
  });
});
