import { STRING } from "@/app/constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraFormSubmitOptions } from "../models/ExtraFormSubmitOptions.type";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraFormSeedCase } from "./models/ExtraFormSeedCase.interface";
import type { ExtraFormSubmitOverrides } from "./models/ExtraFormSubmitOverrides.interface";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_NAME,
} from "./Extra.constants";

export const EDITED_EXTRA_NAME = "Wakeboard";
export const FAKE_NAME_ERROR = "fake-extra-name-error";
export const FAKE_SERVER_MESSAGE =
  "fake-extra-server-message";
export const FAKE_ACTION_FAILURE_MESSAGE =
  "fake-extra-action-failure";
export const FAKE_CONTROL_FLOW_SIGNAL_MESSAGE =
  "fake-extra-control-flow-signal";
export const SUBMISSIONS_AFTER_RELEASE = 2;
export const SUBMISSIONS_WHILE_LOCKED = 1;

export const EXTRA_FORM_SUCCESS_RESULT: ExtraMutationResult =
  { status: EXTRA_MUTATION_STATUS.SUCCESS };

export const CREATE_FORM_PROPS: ExtraFormViewModelProps = {
  mode: EXTRA_FORM_MODE.CREATE,
};

export const EDIT_FORM_PROPS: ExtraFormViewModelProps = {
  mode: EXTRA_FORM_MODE.EDIT,
  extra: DEFAULT_EXTRA,
};

export const buildExtraFormSubmitOptions = (
  overrides: ExtraFormSubmitOverrides = {},
  props: ExtraFormViewModelProps = CREATE_FORM_PROPS
): ExtraFormSubmitOptions => ({
  ...props,
  values: { name: FAKE_EXTRA_NAME },
  setNameError: () => undefined,
  ...overrides,
});

export const SEED_CASES: ExtraFormSeedCase[] = [
  {
    props: CREATE_FORM_PROPS,
    values: { name: STRING.Empty },
  },
  {
    props: EDIT_FORM_PROPS,
    values: { name: FAKE_EXTRA_NAME },
  },
];
