import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCreateFormValues } from "../models/CategoryCreateFormValues.interface";

export const VALID_CATEGORY_CREATE_FORM_VALUES: CategoryCreateFormValues =
  {
    groupName: "Kayaks",
    name: "Kayak doble",
    trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
  };

export const FAKE_CREATED_CATEGORY_ID =
  "fake-created-category-id";
