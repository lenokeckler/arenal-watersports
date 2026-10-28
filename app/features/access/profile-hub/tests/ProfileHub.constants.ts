import { PROFILE_NOTICE } from "@/app/constants";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";

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
export const LOCK_RESET_ICON_NAME = "lock_reset";
export const CHEVRON_RIGHT_ICON_NAME = "chevron_right";
