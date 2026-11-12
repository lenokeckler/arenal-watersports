"use client";

import { useState } from "react";
import {
  WORKER_LIST_BASE_ROLES,
  WORKER_LIST_QUERY_PARAMETER,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import type { WorkerListFiltersFieldChange } from "../models/WorkerListFiltersFieldChange.interface";
import type { WorkerListFiltersProps } from "../models/WorkerListFiltersProps.interface";
import type { WorkerListFiltersViewModel } from "../models/WorkerListFiltersViewModel.interface";

const resolveBaseRole = (value: string) =>
  WORKER_LIST_BASE_ROLES.find(
    (baseRole) => baseRole === value
  );

const resolveStatus = (value: string) =>
  Object.values(WORKER_LIST_STATUS).find(
    (status) => status === value
  );

export const useWorkerListFiltersViewModel = ({
  search,
}: WorkerListFiltersProps): WorkerListFiltersViewModel => {
  const [values, setValues] = useState(search);

  const handleChange = ({
    target: { name, value },
  }: WorkerListFiltersFieldChange): void => {
    if (name === WORKER_LIST_QUERY_PARAMETER.ROLE) {
      setValues((current) => ({
        ...current,
        baseRole: resolveBaseRole(value),
      }));
      return;
    }

    if (name === WORKER_LIST_QUERY_PARAMETER.STATUS) {
      setValues((current) => ({
        ...current,
        status: resolveStatus(value),
      }));
    }
  };

  return { handleChange, values };
};
