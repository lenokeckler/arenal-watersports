import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryBehaviorFormPage = () => {
  const user = userEvent.setup();

  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_FORM_TITLE,
    });

  const getTrackingModeLine = (label: string) =>
    screen.getByText(
      `${CATEGORY_CATALOG_COPY.BEHAVIOR_TRACKING_MODE_LINE_LABEL}${STRING.SPACE}${label}`
    );

  const getControl = (label: string) =>
    screen.getByLabelText(label, { exact: false });

  const getIsReservableCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.IS_RESERVABLE_FIELD_LABEL
    );

  const getUnitsAreInterchangeableCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.UNITS_ARE_INTERCHANGEABLE_FIELD_LABEL
    );

  const getHasMotorCheckbox = () =>
    getControl(CATEGORY_CATALOG_COPY.HAS_MOTOR_FIELD_LABEL);

  const getUsageMetricSelect = () =>
    getControl(
      CATEGORY_CATALOG_COPY.USAGE_METRIC_FIELD_LABEL
    );

  const getConsumesFuelCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.CONSUMES_FUEL_FIELD_LABEL
    );

  const getCanBeDamagedCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.CAN_BE_DAMAGED_FIELD_LABEL
    );

  const getHasConditionPhotosCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.HAS_CONDITION_PHOTOS_FIELD_LABEL
    );

  const getGuideOnlyCheckbox = () =>
    getControl(
      CATEGORY_CATALOG_COPY.GUIDE_ONLY_FIELD_LABEL
    );

  const getDurationInput = () =>
    getControl(
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_FIELD_LABEL
    );

  const getAllControls = () => [
    getIsReservableCheckbox(),
    getUnitsAreInterchangeableCheckbox(),
    getHasMotorCheckbox(),
    getUsageMetricSelect(),
    getConsumesFuelCheckbox(),
    getCanBeDamagedCheckbox(),
    getHasConditionPhotosCheckbox(),
    getGuideOnlyCheckbox(),
    getDurationInput(),
  ];

  const getDurationError = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR
    );

  const getCancelButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getSubmitButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_SUBMIT_BUTTON,
    });

  const isSubmitButtonLoading = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING,
    }) !== null;

  const toggleHasMotor = async (): Promise<void> => {
    await user.click(getHasMotorCheckbox());
  };

  const clearDuration = async (): Promise<void> => {
    await user.clear(getDurationInput());
  };

  const submit = async (): Promise<void> => {
    await user.click(getSubmitButton());
  };

  const cancel = async (): Promise<void> => {
    await user.click(getCancelButton());
  };

  return {
    getHeading,
    getTrackingModeLine,
    getAllControls,
    getHasMotorCheckbox,
    getUsageMetricSelect,
    getHasConditionPhotosCheckbox,
    getDurationInput,
    getDurationError,
    getCancelButton,
    getSubmitButton,
    isSubmitButtonLoading,
    toggleHasMotor,
    clearDuration,
    submit,
    cancel,
  };
};
