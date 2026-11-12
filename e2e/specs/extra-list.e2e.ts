import { expect } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_STATUS } from "@/app/features/administration/extra-catalog/constants/ExtraStatus.constants";
import { EXTRA_STATUS_LABEL } from "@/app/features/administration/extra-catalog/constants/ExtraStatusLabel.constants";
import { resolveExtraEditPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraEditPath";
import { E2E_EXTRA_SCENARIO } from "../constants/E2eExtraList.constants";
import { test } from "../support/extraListTest";

test.describe("Extra list", () => {
  test("shows the page heading", async ({
    listPage,
    seedExtra,
  }) => {
    await seedExtra();

    await listPage.goTo();

    await expect(listPage.getHeading()).toHaveText(
      EXTRA_CATALOG_COPY.LIST_TITLE
    );
  });

  test("shows an active extra with the Activo status word", async ({
    listPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.STATUS_ACTIVE,
    });

    await listPage.goTo();

    await expect(
      listPage.getExtraStatusChip(
        name,
        EXTRA_STATUS_LABEL[EXTRA_STATUS.ACTIVE]
      )
    ).toBeVisible();
  });

  test("shows an inactive extra with the Inactivo status word", async ({
    listPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.INACTIVE,
      status: EXTRA_STATUS.INACTIVE,
    });

    await listPage.goTo();

    await expect(
      listPage.getExtraStatusChip(
        name,
        EXTRA_STATUS_LABEL[EXTRA_STATUS.INACTIVE]
      )
    ).toBeVisible();
  });

  test("links Editar to the extra and Nuevo extra to the create screen", async ({
    listPage,
    seedExtra,
  }) => {
    const { id, name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.LINKS,
    });

    await listPage.goTo();

    await expect(
      listPage.getExtraEditLink(name)
    ).toHaveAttribute("href", resolveExtraEditPath(id));
    await expect(listPage.getCreateLink()).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
  });
});
