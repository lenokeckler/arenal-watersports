import type { NullableRef } from "@/app/types";
import type { PersonalEmailState } from "../models/PersonalEmailState.type";
import { PERSONAL_EMAIL_STATE } from "./PersonalEmailState.constants";
import { PROFILE_COPY } from "./ProfileCopy.constants";

export const PERSONAL_EMAIL_STATUS_BY_STATE: Record<
  PersonalEmailState,
  NullableRef<string>
> = {
  [PERSONAL_EMAIL_STATE.NOT_REGISTERED]:
    PROFILE_COPY.STATUS_NOT_REGISTERED,
  [PERSONAL_EMAIL_STATE.REGISTERED]:
    PROFILE_COPY.STATUS_REGISTERED,
  [PERSONAL_EMAIL_STATE.UNKNOWN]: null,
};
