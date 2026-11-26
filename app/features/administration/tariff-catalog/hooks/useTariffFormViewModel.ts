"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffFormViewModel } from "../models/TariffFormViewModel.interface";
import type { TariffFormViewProps } from "../models/TariffFormViewProps.interface";
import { buildTariffTypeSectionStates } from "../utils/buildTariffTypeSectionStates";
import { mapTariffsToFormValues } from "../utils/mapTariffsToFormValues";
import { useTariffFormSubmit } from "./useTariffFormSubmit";

export const useTariffFormViewModel = ({
  tariff,
}: TariffFormViewProps): TariffFormViewModel => {
  const router = useRouter();
  const [values, setValues] = useState<TariffFormValues>(
    mapTariffsToFormValues(tariff)
  );
  const submit = useTariffFormSubmit({ tariff, values });

  return {
    ...submit,
    bannerMessage:
      submit.submitError || safeString(submit.errors.form),
    onBack: () => router.push(PATHS.ADMINISTRATION.TARIFFS),
    onPriceChange: (type, field) => (event) =>
      setValues((current) => ({
        ...current,
        [type]: {
          ...current[type],
          [field]: event.target.value,
        },
      })),
    sectionStates: buildTariffTypeSectionStates(tariff),
    title: tariff.categoryName,
    values,
  };
};
