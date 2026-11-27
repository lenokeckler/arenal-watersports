import {
  ARIA_ROLE,
  CURRENCY_CODE,
  DEPOSIT_STATUS,
  PATHS,
  RESERVATION_STATUS,
  STRING,
} from "@/app/constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as copy } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionUnavailableCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as validation } from "@/app/features/reservations/deposit-resolution/constants/DepositResolutionValidationCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_DEPOSIT_RESOLUTION as values } from "../constants/E2eDepositResolution.constants";
import {
  E2E_COUNT,
  E2E_TIMEOUT_MS,
} from "../constants/E2eRuntime.constants";
import { createDepositResolutionPage } from "../pages/DepositResolution.page";
import { createPendingDepositsPage } from "../pages/PendingDeposits.page";
import { createDepositResolutionFixture as seed } from "../support/createDepositResolutionFixture";
import {
  expect,
  test,
} from "../support/depositResolutionTest";
import { readDepositResolutionState } from "../support/readDepositResolutionState";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import { switchToOperationsMode } from "../support/switchToOperationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

const usd = (amount: number): string =>
  formatMoney({ amount, currency: CURRENCY_CODE.USD });

test.describe("Deposit resolution", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test("returns the whole deposit from the pending list and removes it from there", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const fixture = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const pending = createPendingDepositsPage(page);
    const resolution = createDepositResolutionPage(page);

    await pending.goTo();
    await resolution.getResolveLink(fixture.code).click();
    await resolution.submit();

    await expect(resolution.getStatus()).toHaveText(
      copy.SUCCESS(fixture.code),
      submitWait
    );
    expect(
      await readDepositResolutionState(
        activeWorker.id,
        fixture.depositId
      )
    ).toEqual({
      isResolver: true,
      keptAmount: STRING.Empty,
      reason: STRING.Empty,
      status: DEPOSIT_STATUS.RETURNED,
    });
    await pending.goTo();
    await expect(
      pending.getRow(fixture.customerName)
    ).toHaveCount(E2E_COUNT.NONE);
  });

  test("keeps part of the deposit with the damage reason and shows it in the report", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const fixture = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const resolution = createDepositResolutionPage(page);

    await resolution.goTo(fixture.depositId);
    await resolution.choosePart();
    await resolution.fillReturned(
      String(values.RETURNED_PART)
    );
    await expect(
      resolution.getText(usd(values.KEPT_PART))
    ).toBeVisible();
    await resolution.submit();
    await expect(
      resolution.getText(validation.REASON_REQUIRED)
    ).toBeVisible();

    await resolution.fillReason(values.DAMAGE_REASON);
    await resolution.submit();
    await expect(resolution.getStatus()).toHaveText(
      copy.SUCCESS(fixture.code),
      submitWait
    );
    expect(
      await readDepositResolutionState(
        activeWorker.id,
        fixture.depositId
      )
    ).toMatchObject({
      keptAmount: values.KEPT_PART.toFixed(2),
      reason: values.DAMAGE_REASON,
      status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
    });

    await signInAsSeededWorker(page);
    await page.goto(PATHS.ADMINISTRATION.DEPOSITS);
    const row = page
      .getByRole(ARIA_ROLE.LISTITEM)
      .filter({ hasText: fixture.customerName });
    await expect(row).toContainText(values.DAMAGE_REASON);
    await expect(row).toContainText(usd(values.KEPT_PART));
  });

  test("waits for the trip to close", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const fixture = await seed(
      activeWorker.id,
      testInfo.project.name,
      RESERVATION_STATUS.SCHEDULED
    );
    const resolution = createDepositResolutionPage(page);

    await resolution.goTo(fixture.depositId);

    await expect(
      resolution.getText(unavailable.TITLE.trip_not_closed)
    ).toBeVisible();
    await expect(resolution.getSubmit()).toHaveCount(
      E2E_COUNT.NONE
    );
  });

  test("keeps Operaciones out of the resolution", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const fixture = await seed(
      activeWorker.id,
      testInfo.project.name
    );

    await switchToOperationsMode(page, activeWorker);
    await createDepositResolutionPage(page).goTo(
      fixture.depositId
    );

    await expect(
      page.getByRole(ARIA_ROLE.BUTTON, {
        name: copy.SUBMIT,
      })
    ).toHaveCount(E2E_COUNT.NONE);
    expect(
      (
        await readDepositResolutionState(
          activeWorker.id,
          fixture.depositId
        )
      ).status
    ).toBe(DEPOSIT_STATUS.HELD);
  });
});
