"use client";

import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  API,
  BOOLEAN,
  INPUT_TYPES,
  PATHS,
  STRING,
  WORKER_LIST_QUERY_PARAMETER,
} from "@/app/constants";
import { WORKER_LIST_COPY } from "../constants/WorkerListCopy.constants";
import { WORKER_LIST_FILTER_DOM_ID } from "../constants/WorkerListFilterDomId.constants";
import {
  WORKER_LIST_ROLE_FILTER_OPTIONS,
  WORKER_LIST_STATUS_FILTER_OPTIONS,
} from "../constants/WorkerListFilterOptions.constants";
import type { WorkerListFiltersProps } from "../models/WorkerListFiltersProps.interface";
import {
  WORKER_LIST_FILTERS_FIELD_CLASS,
  WORKER_LIST_FILTERS_FORM_CLASS,
  WORKER_LIST_FILTERS_SELECT_SIZE_CLASS,
  WORKER_LIST_FILTERS_SUBMIT_CLASS,
} from "../styles/WorkerListFilters.styles";
import { useWorkerListFiltersViewModel } from "../hooks/useWorkerListFiltersViewModel";

const WorkerListFilters = ({
  search,
}: WorkerListFiltersProps): React.JSX.Element => {
  const { handleChange, values } =
    useWorkerListFiltersViewModel({ search });

  return (
    <form
      action={PATHS.ADMINISTRATION.WORKERS}
      className={WORKER_LIST_FILTERS_FORM_CLASS}
      method={API.METHODS.GET}
    >
      <div className={WORKER_LIST_FILTERS_FIELD_CLASS}>
        <FormField
          id={WORKER_LIST_FILTER_DOM_ID.BASE_ROLE}
          label={WORKER_LIST_COPY.FILTER_ROLE_LABEL}
          labelSuffix={STRING.Empty}
          name={WORKER_LIST_QUERY_PARAMETER.ROLE}
          onChange={handleChange}
          options={[...WORKER_LIST_ROLE_FILTER_OPTIONS]}
          selectSizeClassName={
            WORKER_LIST_FILTERS_SELECT_SIZE_CLASS
          }
          type={INPUT_TYPES.SELECT}
          value={values.baseRole ?? STRING.Empty}
          variant={FORM_FIELD_VARIANT.GLASS}
        />
      </div>
      <div className={WORKER_LIST_FILTERS_FIELD_CLASS}>
        <FormField
          id={WORKER_LIST_FILTER_DOM_ID.STATUS}
          label={WORKER_LIST_COPY.FILTER_STATUS_LABEL}
          labelSuffix={STRING.Empty}
          name={WORKER_LIST_QUERY_PARAMETER.STATUS}
          onChange={handleChange}
          options={[...WORKER_LIST_STATUS_FILTER_OPTIONS]}
          selectSizeClassName={
            WORKER_LIST_FILTERS_SELECT_SIZE_CLASS
          }
          type={INPUT_TYPES.SELECT}
          value={values.status ?? STRING.Empty}
          variant={FORM_FIELD_VARIANT.GLASS}
        />
      </div>
      <div className={WORKER_LIST_FILTERS_SUBMIT_CLASS}>
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.SEARCH}
          isPending={BOOLEAN.FALSE.value}
          label={WORKER_LIST_COPY.FILTER_APPLY}
          pendingLabel={
            WORKER_LIST_COPY.FILTER_APPLY_PENDING
          }
        />
      </div>
    </form>
  );
};

export default WorkerListFilters;
