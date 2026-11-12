import { expect, test } from "@playwright/test";
import { resolveFreeOfTotalText } from "@/app/features/board/equipment-board/utils/resolveFreeOfTotalText";
import {
  E2E_BOARD_REALTIME,
  resolveBoardChipText,
} from "../constants/E2eBoard.constants";
import { E2E_RESERVATION_EQUIPMENT_STATUS } from "../constants/E2eReservationForm.constants";
import {
  E2E_PROJECT,
  E2E_SKIP_REASON,
} from "../constants/E2eRuntime.constants";
import { createBoardPage } from "../pages/Board.page";
import { createReservationEquipmentStatusFixture } from "../support/createReservationEquipmentStatusFixture";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Equipment board realtime", () => {
  test("updates the open board when a teammate takes a unit out of service, without reloading", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== E2E_PROJECT.DEFAULT,
      E2E_SKIP_REASON.SINGLE_INVENTORY_WRITER
    );
    const equipmentFixture =
      createReservationEquipmentStatusFixture(
        E2E_BOARD_REALTIME.UNIT_CODE
      );

    try {
      await signInAsSeededWorker(page);
      const boardPage = createBoardPage(page);
      await boardPage.goTo();
      const card = boardPage.getCard(
        E2E_BOARD_REALTIME.CATEGORY_LABEL
      );
      await expect(
        boardPage.getCardText(
          card,
          resolveBoardChipText(
            E2E_BOARD_REALTIME.TOTAL_COUNT
          )
        )
      ).toBeVisible();

      await equipmentFixture.prepare();
      expect(
        await equipmentFixture.markUnitAsDamaged()
      ).toBe(E2E_RESERVATION_EQUIPMENT_STATUS.DAMAGED);
      await expect(
        boardPage.getCardText(
          card,
          resolveFreeOfTotalText(
            E2E_BOARD_REALTIME.FREE_AFTER_DAMAGE,
            E2E_BOARD_REALTIME.TOTAL_COUNT
          )
        )
      ).toBeVisible();

      await equipmentFixture.restore();
      await expect(
        boardPage.getCardText(
          card,
          resolveBoardChipText(
            E2E_BOARD_REALTIME.TOTAL_COUNT
          )
        )
      ).toBeVisible({
        timeout: E2E_BOARD_REALTIME.CONVERGENCE_TIMEOUT_MS,
      });
    } finally {
      await equipmentFixture.restore();
    }
  });
});
