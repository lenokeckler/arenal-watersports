import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  API,
  PATHS,
  SUPABASE_WORK_AREA,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import {
  WORKER_LIST_ROLE_FILTER_OPTIONS,
  WORKER_LIST_STATUS_FILTER_OPTIONS,
} from "../constants/WorkerListFilterOptions.constants";
import WorkerListFilters from "../components/WorkerListFilters";
import {
  WORKER_LIST_TEST_SEARCH,
  WORKER_LIST_TEST_UNFILTERED_SEARCH,
} from "./WorkerList.constants";
import { createWorkerListFiltersPage } from "./WorkerListFilters.page";

describe("WorkerListFilters", () => {
  it("offers role and status filters on a GET form", () => {
    render(
      <WorkerListFilters
        search={WORKER_LIST_TEST_UNFILTERED_SEARCH}
      />
    );
    const filtersPage = createWorkerListFiltersPage();

    expect(filtersPage.getFormMethod()).toBe(
      API.METHODS.GET.toLowerCase()
    );
    expect(filtersPage.getFormAction()).toBe(
      PATHS.ADMINISTRATION.WORKERS
    );
    expect(filtersPage.hasPageField()).toBe(false);
    expect(
      Array.from(
        filtersPage.getBaseRoleFilter().options
      ).map((option) => option.value)
    ).toEqual(
      WORKER_LIST_ROLE_FILTER_OPTIONS.map(
        (option) => option.value
      )
    );
    expect(
      Array.from(filtersPage.getStatusFilter().options).map(
        (option) => option.value
      )
    ).toEqual(
      WORKER_LIST_STATUS_FILTER_OPTIONS.map(
        (option) => option.value
      )
    );
  });

  it("reflects selected role and account status", async () => {
    render(
      <WorkerListFilters search={WORKER_LIST_TEST_SEARCH} />
    );
    const filtersPage = createWorkerListFiltersPage();

    expect(filtersPage.getSelectedBaseRole()).toBe(
      SUPABASE_WORK_AREA.OPERATIONS
    );
    expect(filtersPage.getSelectedStatus()).toBe(
      WORKER_LIST_STATUS.ACTIVE
    );

    await filtersPage.selectBaseRole(
      SUPABASE_WORK_AREA.RESERVATIONS
    );
    await filtersPage.selectStatus(
      WORKER_LIST_STATUS.INACTIVE
    );

    expect(filtersPage.getSelectedBaseRole()).toBe(
      SUPABASE_WORK_AREA.RESERVATIONS
    );
    expect(filtersPage.getSelectedStatus()).toBe(
      WORKER_LIST_STATUS.INACTIVE
    );
  });
});
