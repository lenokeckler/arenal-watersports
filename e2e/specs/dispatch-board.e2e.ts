import { expect, test } from "@playwright/test";
import { createDispatchBoardPage } from "../pages/DispatchBoard.page";

test.describe("Dispatch board access", () => {
  test("shows a safe access error without an operations session", async ({
    page,
  }) => {
    const dispatchBoardPage = createDispatchBoardPage(page);

    await dispatchBoardPage.goTo();

    await expect(
      dispatchBoardPage.getHeading()
    ).toBeVisible();
    await expect(
      dispatchBoardPage.getErrorMessage()
    ).toBeVisible();
  });
});
