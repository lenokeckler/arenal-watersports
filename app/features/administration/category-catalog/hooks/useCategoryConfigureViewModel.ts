import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryConfigureActions,
  type AppDispatch,
  type RootState,
} from "@/app/store";
import { STORE_SLICES } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import { CATEGORY_IMAGE_FORM_STATE } from "../constants/CategoryImageFormState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import type { CategoryConfigureViewModel } from "../models/CategoryConfigureViewModel.interface";
import type { CategoryConfigureViewProps } from "../models/CategoryConfigureViewProps.interface";
import { applyCategoryEditedValues } from "../utils/applyCategoryEditedValues";
import { buildCategoryConfigureAlertsProps } from "../utils/buildCategoryConfigureAlertsProps";
import { resolveCategoryConfigureSaveMessage } from "../utils/resolveCategoryConfigureSaveMessage";
import { resolveCategoryConfigureSections } from "../utils/resolveCategoryConfigureSections";
import { resolveCategoryConfigureStatusCard } from "../utils/resolveCategoryConfigureStatusCard";
import { useCategoryAlertFormFields } from "./useCategoryAlertFormFields";
import { useCategoryBehaviorFormFields } from "./useCategoryBehaviorFormFields";
import { useCategoryConfigureDelete } from "./useCategoryConfigureDelete";
import { useCategoryConfigurePhoto } from "./useCategoryConfigurePhoto";
import { useCategoryConfigureReservations } from "./useCategoryConfigureReservations";
import { useCategoryConfigureDraft } from "./useCategoryConfigureDraft";
import { useCategoryConfigureLeave } from "./useCategoryConfigureLeave";
import { useCategoryConfigureNextSteps } from "./useCategoryConfigureNextSteps";
import { useCategoryConfigureSave } from "./useCategoryConfigureSave";
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
  const photo = useCategoryConfigurePhoto(
    configuration.image
  );
  const deletion =
    useCategoryConfigureDelete(configuration);
  const draft = useCategoryConfigureDraft({
    isInitiallyActive:
      configuration.status === CATEGORY_STATUS.ACTIVE,
    values: {
      behavior: behaviorFields.values,
      deposit: depositFields.values,
      alerts: alertFields.values,
    },
    pickedFile: photo.pickedFile,
  });
  const save = useCategoryConfigureSave({
    categoryId: configuration.id,
    draft,
    fields: {
      behavior: behaviorFields,
      deposit: depositFields,
      alerts: alertFields,
    },
  });
  const leave = useCategoryConfigureLeave({
    name: configuration.name,
    changedCount: draft.changedCount,
    onSave: save.onSave,
  });
  const nextSteps =
    useCategoryConfigureNextSteps(configuration);
  const editedConfiguration = {
    ...applyCategoryEditedValues(
      configuration,
      draft.current.values
    ),
    status: draft.current.isActive
      ? CATEGORY_STATUS.ACTIVE
      : CATEGORY_STATUS.INACTIVE,
  };

  useEffect(
    () => () => {
      dispatch(categoryConfigureActions.reset());
    },
    [dispatch]
  );

  const onToggleSection = (
    sectionId: CategoryConfigureSectionId
  ): void => {
    dispatch(
      categoryConfigureActions.toggleSection(sectionId)
    );
  };

  return {
    name: configuration.name,
    statusCard: {
      ...resolveCategoryConfigureStatusCard(
        editedConfiguration
      ),
      onToggleActive: draft.onToggleActive,
    },
    nextSteps,
    sections: resolveCategoryConfigureSections(
      editedConfiguration,
      openSectionIds,
      photo.props.formState ===
        CATEGORY_IMAGE_FORM_STATE.PICKED
    ),
    bodies: {
      reservations,
      deposit: depositFields,
      photo: photo.props,
      alerts:
        buildCategoryConfigureAlertsProps(alertFields),
      traits: behaviorFields,
    },
    deletion,
    leave,
    saveBar: {
      message: resolveCategoryConfigureSaveMessage({
        status: save.saveStatus,
        changedCount: draft.changedCount,
        invalidFieldCount: save.invalidFieldCount,
      }),
      status: save.saveStatus,
      isDisabled:
        draft.changedCount === 0 ||
        save.saveStatus ===
          CATEGORY_CONFIGURE_SAVE_STATUS.SAVING,
      onSave: save.onSave,
    },
    onToggleSection,
  };
};
