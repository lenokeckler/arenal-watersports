import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  STRING,
  WORKER_LIST_QUERY_PARAMETER,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "../constants/WorkerListCopy.constants";

export const createWorkerListFiltersPage = () => {
  const user = userEvent.setup();

  const getBaseRoleFilter = () =>
    screen.getByLabelText<HTMLSelectElement>(
      WORKER_LIST_COPY.FILTER_ROLE_LABEL,
      { exact: true }
    );

  const getStatusFilter = () =>
    screen.getByLabelText<HTMLSelectElement>(
      WORKER_LIST_COPY.FILTER_STATUS_LABEL,
      { exact: true }
    );

  const getForm = () => getBaseRoleFilter().form;

  return {
    getApplyFiltersButton: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: WORKER_LIST_COPY.FILTER_APPLY,
      }),
    getBaseRoleFilter,
    getFormAction: () =>
      getForm()?.getAttribute("action") ?? STRING.Empty,
    getFormMethod: () => getForm()?.method ?? STRING.Empty,
    getSelectedBaseRole: () => getBaseRoleFilter().value,
    getSelectedStatus: () => getStatusFilter().value,
    getStatusFilter,
    hasPageField: () =>
      getForm()?.elements.namedItem(
        WORKER_LIST_QUERY_PARAMETER.PAGE
      ) !== null,
    selectBaseRole: (value: string) =>
      user.selectOptions(getBaseRoleFilter(), value),
    selectStatus: (value: string) =>
      user.selectOptions(getStatusFilter(), value),
  };
};
