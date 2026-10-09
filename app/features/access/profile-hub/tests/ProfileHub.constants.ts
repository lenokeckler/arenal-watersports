import { PROFILE_NOTICE } from "@/app/constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import {
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
} from "../constants/ProfileEntries.constants";

export const NOTICE_CASES = [
  [
    PROFILE_NOTICE.PASSWORD_CHANGED,
    PROFILE_COPY.PASSWORD_CHANGED_NOTICE,
  ],
  [
    PROFILE_NOTICE.EMAIL_SAVED,
    PROFILE_COPY.EMAIL_SAVED_NOTICE,
  ],
  [
    PROFILE_NOTICE.EMAIL_REMOVED,
    PROFILE_COPY.EMAIL_REMOVED_NOTICE,
  ],
] as const;

export const UNKNOWN_NOTICE = "<script>";
export const ARRAY_NOTICE = [
  "password-changed",
  "password-changed",
];
export const HEADING_LEVEL = 1;
export const ID_ATTRIBUTE = "id";
export const HREF_ATTRIBUTE = "href";
export const ARIA_HIDDEN_ATTRIBUTE = "aria-hidden";
export const ARIA_HIDDEN_VALUE = "true";
export const OWN_PERSONAL_EMAIL_ADDRESS =
  "worker.personal@example.com";
export const REGISTERED_STATE = {
  address: OWN_PERSONAL_EMAIL_ADDRESS,
  isRequired: false,
} as const;
export const NOT_REGISTERED_STATE = {
  address: null,
  isRequired: false,
} as const;
export const HUB_TEST_ID = "profile-hub";
export const HUB_NOTICE_ATTRIBUTE = "data-notice";
export const ANY_WHITESPACE = "\\s*";
export const EMAIL_ENTRY_REGISTERED_NAME = `${PROFILE_COPY.PERSONAL_EMAIL_ENTRY} ${PROFILE_COPY.STATUS_REGISTERED}`;
export const EMAIL_ENTRY_NOT_REGISTERED_NAME = `${PROFILE_COPY.PERSONAL_EMAIL_ENTRY} ${PROFILE_COPY.STATUS_NOT_REGISTERED}`;
export const EMAIL_ENTRY_WITHOUT_STATUS_NAME =
  PROFILE_COPY.PERSONAL_EMAIL_ENTRY;
export const ENTRY_DEFINITIONS = [
  PASSWORD_ENTRY_DEFINITION,
  PERSONAL_EMAIL_ENTRY_DEFINITION,
];
export const READ_FAILURE = new Error("read failed");
