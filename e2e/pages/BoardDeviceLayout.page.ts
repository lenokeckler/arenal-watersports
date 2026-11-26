import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  BOARD_LAYOUT_STORAGE_KEY,
  KEYBOARD,
} from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import { BOARD_LAYOUT_COPY } from "@/app/features/board/board-layout/constants/BoardLayoutCopy.constants";
import type {
  BoardLayoutPreference,
  NullableRef,
} from "@/app/types";
import {
  E2E_BOARD_DEVICE_LAYOUT,
  E2E_BOARD_DEVICE_LAYOUT_OPERATION,
  E2E_BOARD_DEVICE_LAYOUT_TOUCH,
} from "../constants/E2eBoardDeviceLayout.constants";
import type { E2ePoint } from "../models/E2ePoint.interface";
import type { E2eTouchEventType } from "../models/E2eTouchEventType.type";
import { failE2eOperation } from "../support/failE2eOperation";
import { createBoardPage } from "./Board.page";
import { createSystemNavigationPage } from "./SystemNavigation.page";

export const createBoardDeviceLayoutPage = (page: Page) => {
  const boardPage = createBoardPage(page);
  const navigationPage = createSystemNavigationPage(page);

  const getControls = (): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: BOARD_LAYOUT_COPY.SECTION_LABEL,
    });

  const getColumnsButton = (columns: number): Locator =>
    getControls().getByRole(ARIA_ROLE.BUTTON, {
      name: BOARD_LAYOUT_COPY.COLUMNS_OPTION_ARIA(columns),
    });

  const getHandle = (label: string): Locator =>
    getControls().getByRole(ARIA_ROLE.BUTTON, {
      name: BOARD_LAYOUT_COPY.MOVE_HANDLE(label),
      exact: true,
    });

  const getOrderRows = (): Locator =>
    getControls()
      .getByRole(ARIA_ROLE.LIST, {
        name: BOARD_LAYOUT_COPY.ORDER_LABEL,
      })
      .getByRole(ARIA_ROLE.LISTITEM);

  const openPanel = async (): Promise<void> => {
    await navigationPage.getMenuButton().click();
    await getControls().waitFor();
  };

  const closePanel = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: SYSTEM_NAVIGATION_COPY.CLOSE_MENU,
      })
      .click();
  };

  const readPanelOrder = (): Promise<string[]> =>
    getOrderRows()
      .locator(E2E_BOARD_DEVICE_LAYOUT.ROW_LABEL_SELECTOR)
      .allTextContents();

  const readBoardOrder = (): Promise<string[]> =>
    boardPage
      .getGrid()
      .getByRole(ARIA_ROLE.HEADING)
      .allTextContents();

  const readStoredLayout = (): Promise<
    NullableRef<BoardLayoutPreference>
  > =>
    page.evaluate((storageKey) => {
      const storedValue =
        window.localStorage.getItem(storageKey);

      return storedValue ? JSON.parse(storedValue) : null;
    }, BOARD_LAYOUT_STORAGE_KEY);

  const storeLayout = (
    layout: BoardLayoutPreference
  ): Promise<void> =>
    page.evaluate(
      ({ storageKey, storedLayout }) => {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify(storedLayout)
        );
      },
      {
        storageKey: BOARD_LAYOUT_STORAGE_KEY,
        storedLayout: layout,
      }
    );

  const resolvePoint = async (
    target: Locator
  ): Promise<E2ePoint> => {
    const box = await target.boundingBox();

    if (!box) {
      return failE2eOperation(
        E2E_BOARD_DEVICE_LAYOUT_OPERATION.DRAG,
        E2E_BOARD_DEVICE_LAYOUT_OPERATION.NOT_LAID_OUT
      );
    }

    return {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    };
  };

  const centerElement = async (
    target: Locator
  ): Promise<void> => {
    await target.evaluate(
      (handle, block) => handle.scrollIntoView({ block }),
      E2E_BOARD_DEVICE_LAYOUT.SCROLL_BLOCK
    );
  };

  const dragWithMouse = async (
    source: Locator,
    destination: Locator
  ): Promise<void> => {
    await centerElement(source);
    const start = await resolvePoint(source);
    const target = await resolvePoint(destination);

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(target.x, target.y, {
      steps: E2E_BOARD_DEVICE_LAYOUT.DRAG_STEPS,
    });
    await page.mouse.up();
  };

  const dragWithFinger = async (
    source: Locator,
    destination: Locator,
    holdMs = 0
  ): Promise<void> => {
    await centerElement(source);
    const start = await resolvePoint(source);
    const target = await resolvePoint(destination);
    const session = await page
      .context()
      .newCDPSession(page);
    const sendTouch = (
      type: E2eTouchEventType,
      point: NullableRef<E2ePoint>
    ): Promise<unknown> =>
      session.send(E2E_BOARD_DEVICE_LAYOUT_TOUCH.COMMAND, {
        touchPoints: point ? [point] : [],
        type,
      });

    await sendTouch(
      E2E_BOARD_DEVICE_LAYOUT_TOUCH.START,
      start
    );
    await page.waitForTimeout(holdMs);

    for (
      let step = 1;
      step <= E2E_BOARD_DEVICE_LAYOUT.DRAG_STEPS;
      step += 1
    ) {
      const progress =
        step / E2E_BOARD_DEVICE_LAYOUT.DRAG_STEPS;

      await sendTouch(E2E_BOARD_DEVICE_LAYOUT_TOUCH.MOVE, {
        x: start.x + (target.x - start.x) * progress,
        y: start.y + (target.y - start.y) * progress,
      });
    }

    await sendTouch(
      E2E_BOARD_DEVICE_LAYOUT_TOUCH.END,
      null
    );
    await session.detach();
  };

  const dragHandleWithMouse = (
    label: string,
    targetLabel: string
  ): Promise<void> =>
    dragWithMouse(getHandle(label), getHandle(targetLabel));

  const dragHandleWithFinger = (
    label: string,
    targetLabel: string
  ): Promise<void> =>
    dragWithFinger(
      getHandle(label),
      getHandle(targetLabel)
    );

  const dragCardWithMouse = (
    label: string,
    targetLabel: string
  ): Promise<void> =>
    dragWithMouse(
      boardPage.getCard(label),
      boardPage.getCard(targetLabel)
    );

  const dragCardWithFinger = (
    label: string,
    targetLabel: string
  ): Promise<void> =>
    dragWithFinger(
      boardPage.getCard(label),
      boardPage.getCard(targetLabel),
      E2E_BOARD_DEVICE_LAYOUT.LONG_PRESS_HOLD_MS
    );

  const moveWithKeyboard = async (
    label: string
  ): Promise<void> => {
    await getHandle(label).focus();
    await page.keyboard.press(KEYBOARD.ARROW_DOWN);
  };

  return {
    boardPage,
    closePanel,
    dragCardWithFinger,
    dragCardWithMouse,
    dragHandleWithFinger,
    dragHandleWithMouse,
    getColumnsButton,
    getControls,
    getHandle,
    moveWithKeyboard,
    openPanel,
    readBoardOrder,
    readPanelOrder,
    readStoredLayout,
    storeLayout,
  };
};
