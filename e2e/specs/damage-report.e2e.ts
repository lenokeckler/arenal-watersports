import { expect, test } from "@playwright/test";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import {
  E2E_DAMAGE_REPORT_CAUSES,
  E2E_DAMAGE_REPORT_FORM_INPUT,
} from "../constants/E2eDamageReport.constants";
import { createDamageReportPage } from "../pages/DamageReport.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Damage report", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("shows all fields required to report machine damage", async ({
    page,
  }) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();

    await expect(damageReportPage.getHeading()).toHaveText(
      DAMAGE_REPORT_COPY.TITLE
    );
    await expect(
      damageReportPage.getUnitSelect()
    ).toBeVisible();
    await expect(
      damageReportPage.getCauseSelect()
    ).toBeVisible();
    await expect(
      damageReportPage.getDescriptionInput()
    ).toBeVisible();
    await expect(
      damageReportPage.getImpactDeltaInput()
    ).toBeVisible();
  });

  test("allows selecting each supported damage cause", async ({
    page,
  }) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();

    for (const causeOption of E2E_DAMAGE_REPORT_CAUSES) {
      await damageReportPage.selectCause(causeOption.value);
      await expect(
        damageReportPage.getCauseSelect()
      ).toHaveValue(causeOption.value);
    }
  });

  test("allows entering a description and impact count increase", async ({
    page,
  }) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();
    await damageReportPage.fillDescription(
      E2E_DAMAGE_REPORT_FORM_INPUT.DESCRIPTION
    );
    await damageReportPage.fillImpactDelta(
      E2E_DAMAGE_REPORT_FORM_INPUT.IMPACT_DELTA
    );

    await expect(
      damageReportPage.getDescriptionInput()
    ).toHaveValue(E2E_DAMAGE_REPORT_FORM_INPUT.DESCRIPTION);
    await expect(
      damageReportPage.getImpactDeltaInput()
    ).toHaveValue(
      E2E_DAMAGE_REPORT_FORM_INPUT.IMPACT_DELTA
    );
  });

  test("requires a cause before submitting the report", async ({
    page,
  }) => {
    const damageReportPage = createDamageReportPage(page);

    await damageReportPage.goTo();
    await damageReportPage.submit();

    await expect(
      damageReportPage.getCauseRequiredError()
    ).toBeVisible();
  });
});
