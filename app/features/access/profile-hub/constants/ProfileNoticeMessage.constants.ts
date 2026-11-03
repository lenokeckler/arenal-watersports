import {
  PROFILE_NOTICE,
  type ProfileNotice,
} from "@/app/constants";
import { PROFILE_COPY } from "./ProfileCopy.constants";

export const PROFILE_NOTICE_CHOICES: readonly ProfileNotice[] =
  Object.values(PROFILE_NOTICE);

export const PROFILE_NOTICE_MESSAGE: Record<
  ProfileNotice,
  string
> = {
  [PROFILE_NOTICE.EMAIL_REMOVED]:
    PROFILE_COPY.EMAIL_REMOVED_NOTICE,
  [PROFILE_NOTICE.EMAIL_SAVED]:
    PROFILE_COPY.EMAIL_SAVED_NOTICE,
  [PROFILE_NOTICE.PASSWORD_CHANGED]:
    PROFILE_COPY.PASSWORD_CHANGED_NOTICE,
};
