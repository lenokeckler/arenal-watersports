import { useDispatch, useSelector } from "react-redux";
import {
  categoryConfigureActions,
  type AppDispatch,
  type RootState,
} from "@/app/store";
import { STORE_SLICES } from "@/app/constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureViewModel } from "../models/CategoryConfigureViewModel.interface";
import type { CategoryConfigureViewProps } from "../models/CategoryConfigureViewProps.interface";
import { applyCategoryEditedValues } from "../utils/applyCategoryEditedValues";
import { buildCategoryConfigureAlertsProps } from "../utils/buildCategoryConfigureAlertsProps";
import { resolveCategoryConfigureSections } from "../utils/resolveCategoryConfigureSections";
import { resolveCategoryConfigureStatusCard } from "../utils/resolveCategoryConfigureStatusCard";
import { useCategoryAlertFormFields } from "./useCategoryAlertFormFields";
import { useCategoryBehaviorFormFields } from "./useCategoryBehaviorFormFields";
import { useCategoryConfigureReservations } from "./useCategoryConfigureReservations";
import { useCategoryDepositFormFields } from "./useCategoryDepositFormFields";

export const useCategoryConfigureViewModel = ({
  configuration,
}: CategoryConfigureViewProps): CategoryConfigureViewModel => {
  const dispatch = useDispatch<AppDispatch>();
  const openSectionIds = useSelector(
    (state: RootState) =>
      state[STORE_SLICES.CATEGORY_CONFIGURE].openSectionIds
  );
  const behaviorFields = useCategoryBehaviorFormFields({
    behavior: configuration.behavior,
  });
  const depositFields = useCategoryDepositFormFields({
    deposit: configuration.deposit,
  });
  const alertFields = useCategoryAlertFormFields({
    alerts: configuration.alerts,
  });
  const reservations =
    useCategoryConfigureReservations(behaviorFields);

  const onToggleSection = (
    sectionId: CategoryConfigureSectionId
  ): void => {
    dispatch(
      categoryConfigureActions.toggleSection(sectionId)
    );
  };

  return {
    name: configuration.name,
    statusCard:
      resolveCategoryConfigureStatusCard(configuration),
    sections: resolveCategoryConfigureSections(
      applyCategoryEditedValues(configuration, {
        behavior: behaviorFields.values,
        deposit: depositFields.values,
        alerts: alertFields.values,
      }),
      openSectionIds
    ),
    bodies: {
      reservations,
      deposit: depositFields,
      alerts:
        buildCategoryConfigureAlertsProps(alertFields),
      traits: behaviorFields,
    },
    onToggleSection,
  };
};
