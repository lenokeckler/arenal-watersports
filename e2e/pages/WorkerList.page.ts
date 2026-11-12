import { expect, type Page } from "@playwright/test";
import {
  ARIA_ROLE,
  PATHS,
  WORKER_LIST_QUERY_PARAMETER,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "@/app/features/administration/worker-list/constants/WorkerListCopy.constants";
import { WORKER_LIST_FILTER_DOM_ID } from "@/app/features/administration/worker-list/constants/WorkerListFilterDomId.constants";
import { resolveWorkerListPageHref } from "@/app/features/administration/worker-list/utils/resolveWorkerListPageHref";
import type { WorkerListBaseRole } from "@/app/services/worker-list/models/WorkerListBaseRole.type";
import type { WorkerListStatus } from "@/app/services/worker-list/models/WorkerListStatus.type";
import type { WorkerListSearch } from "@/app/services/worker-list/models/WorkerListSearch.interface";
import type { NullableRef } from "@/app/types";
import {
  E2E_COUNT,
  HEADING_LEVEL,
} from "../constants/E2eRuntime.constants";
import { E2E_WORKER_LIST_FILTER_SELECTORS } from "../constants/E2eWorkerListFilters.constants";

export const createWorkerListPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.WORKERS);
  };

  const goToPage = async (
    pageIndex: number
  ): Promise<void> => {
    const search: WorkerListSearch = {
      baseRole: undefined,
      pageIndex,
      status: undefined,
    };

    await page.goto(
      resolveWorkerListPageHref(pageIndex, search)
    );
  };

  const getWorkerCard = (fullName: string) =>
    page
      .locator(E2E_WORKER_LIST_FILTER_SELECTORS.CARD)
      .filter({
        has: page.getByRole(ARIA_ROLE.HEADING, {
          level: HEADING_LEVEL.SCREEN,
          name: fullName,
        }),
      });

  const applyFilters = async (
    baseRole: WorkerListBaseRole,
    status: WorkerListStatus
  ): Promise<void> => {
    await page
      .getByLabel(WORKER_LIST_COPY.FILTER_ROLE_LABEL)
      .selectOption(baseRole);
    await page
      .getByLabel(WORKER_LIST_COPY.FILTER_STATUS_LABEL)
      .selectOption(status);
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: WORKER_LIST_COPY.FILTER_APPLY,
      })
      .click();
  };

  const getSelectedRole = (): Promise<string> =>
    page
      .locator(`#${WORKER_LIST_FILTER_DOM_ID.BASE_ROLE}`)
      .inputValue();

  const getSelectedStatus = (): Promise<string> =>
    page
      .locator(`#${WORKER_LIST_FILTER_DOM_ID.STATUS}`)
      .inputValue();

  const getQueryParameter = (
    parameter: string
  ): NullableRef<string> =>
    new URL(page.url()).searchParams.get(parameter);

  const expectFilterState = async (
    baseRole: WorkerListBaseRole,
    status: WorkerListStatus
  ): Promise<void> => {
    await expect
      .poll(() =>
        getQueryParameter(WORKER_LIST_QUERY_PARAMETER.ROLE)
      )
      .toBe(baseRole);
    await expect
      .poll(() =>
        getQueryParameter(
          WORKER_LIST_QUERY_PARAMETER.STATUS
        )
      )
      .toBe(status);
    expect(await getSelectedRole()).toBe(baseRole);
    expect(await getSelectedStatus()).toBe(status);
  };

  const expectPageParameterAbsent =
    async (): Promise<void> => {
      await expect
        .poll(() =>
          getQueryParameter(
            WORKER_LIST_QUERY_PARAMETER.PAGE
          )
        )
        .toBeNull();
    };

  const expectWorkerAbsent = async (
    fullName: string
  ): Promise<void> => {
    await expect(getWorkerCard(fullName)).toHaveCount(
      E2E_COUNT.NONE
    );
  };

  const expectWorkerContainsText = async (
    fullName: string,
    text: string
  ): Promise<void> => {
    await expect(getWorkerCard(fullName)).toContainText(
      text
    );
  };

  const expectWorkerVisible = async (
    fullName: string
  ): Promise<void> => {
    await expect(getWorkerCard(fullName)).toBeVisible();
  };

  return {
    applyFilters,
    expectFilterState,
    expectPageParameterAbsent,
    expectWorkerAbsent,
    expectWorkerContainsText,
    expectWorkerVisible,
    goTo,
    goToPage,
  };
};
