import type { ReservationEditErrorRule } from "../models/ReservationEditErrorRule.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_EDIT_COPY as copy } from "./ReservationEditCopy.constants";
import { RESERVATION_SERVICE_OPERATION as operation } from "./ReservationServiceOperation.constants";

const FORM_FAILURE = { errors: {}, ok: false } as const;

const UNIT_FAILURE = {
  ...FORM_FAILURE,
  formError: copy.UNIT_UNAVAILABLE,
  unitUnavailable: true,
} as const;

export const RESERVATION_EDIT_ERROR_RULES: readonly ReservationEditErrorRule[] =
  [
    {
      message: operation.RESERVATION_NOT_FOUND,
      result: {
        ...FORM_FAILURE,
        formError: copy.NOT_FOUND,
      },
    },
    {
      message: operation.RESERVATION_NOT_SCHEDULED,
      result: {
        ...FORM_FAILURE,
        formError: copy.NOT_MODIFIABLE,
      },
    },
    {
      message: operation.RESERVATION_STALE,
      result: { ...FORM_FAILURE, formError: copy.STALE },
    },
    {
      message: operation.COMBO_EQUIPMENT_LOCKED,
      result: {
        ...FORM_FAILURE,
        formError: copy.COMBO_LOCKED,
      },
    },
    {
      message: operation.MULTIPLE_EQUIPMENT_LOCKED,
      result: {
        ...FORM_FAILURE,
        formError: copy.MULTIPLE_ITEMS_LOCKED,
      },
    },
    {
      message: operation.UNIT_UNAVAILABLE,
      result: UNIT_FAILURE,
    },
    {
      message: operation.UNIT_CONFLICT,
      result: UNIT_FAILURE,
    },
    {
      message: operation.CATEGORY_UNAVAILABLE,
      result: {
        errors: {
          [RESERVATION_FORM_FIELD.CATEGORY_ID]:
            copy.CATEGORY_UNAVAILABLE,
        },
        ok: false,
      },
    },
  ];
