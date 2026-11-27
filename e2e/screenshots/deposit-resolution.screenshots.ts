import {
  CURRENCY_CODE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as copy } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionUnavailableCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as validation } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionValidationCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  E2E_DEPOSIT_RESOLUTION as values,
  E2E_DEPOSIT_RESOLUTION_SCREENSHOT_STATE as state,
} from "../constants/E2eDepositResolution.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createDepositResolutionPage } from "../pages/DepositResolution.page";
import { createPendingDepositsPage } from "../pages/PendingDeposits.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createDepositResolutionFixture as seed } from "../support/createDepositResolutionFixture";
import { removeDepositResolutionFixtures } from "../support/removeDepositResolutionFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every deposit resolution state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const project = testInfo.project.name;
  const resolution = createDepositResolutionPage(page);
  const pending = createPendingDepositsPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      project
    );

  try {
    const closed = await seed(activeWorker.id, project);
    const scheduled = await seed(
      activeWorker.id,
      project,
      RESERVATION_STATUS.SCHEDULED
    );
    await pending.goTo();
    await expect(
      resolution.getResolveLink(closed.code)
    ).toBeVisible();
    await captureState(state.PENDING);

    await resolution.getResolveLink(closed.code).click();
    await expect(resolution.getSubmit()).toBeVisible();
    await captureState(state.FORM);

    await resolution.choosePart();
    await resolution.fillReturned(
      String(values.RETURNED_PART)
    );
    await expect(
      resolution.getText(
        formatMoney({
          amount: values.KEPT_PART,
          currency: CURRENCY_CODE.USD,
        })
      )
    ).toBeVisible();
    await captureState(state.PARTIAL);

    await resolution.submit();
    await expect(
      resolution.getText(validation.REASON_REQUIRED)
    ).toBeVisible();
    await captureState(state.ERROR);

    await resolution.fillReason(values.DAMAGE_REASON);
    await resolution.submit();
    await expect(resolution.getStatus()).toHaveText(
      copy.SUCCESS(closed.code),
      { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
    );
    await captureState(state.SUCCESS);

    await resolution.goTo(scheduled.depositId);
    await expect(
      resolution.getText(unavailable.TITLE.trip_not_closed)
    ).toBeVisible();
    await captureState(state.UNAVAILABLE);
  } finally {
    await removeDepositResolutionFixtures(activeWorker);
  }
});
