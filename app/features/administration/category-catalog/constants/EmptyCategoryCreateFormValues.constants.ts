import { STRING } from "@/app/constants";
import { CategoryCreateFormValues } from "../models/CategoryCreateFormValues.interface";

export const EMPTY_CATEGORY_CREATE_FORM_VALUES: CategoryCreateFormValues =
  {
    name: STRING.Empty,
    trackingMode: STRING.Empty,
    groupName: STRING.Empty,
  };
