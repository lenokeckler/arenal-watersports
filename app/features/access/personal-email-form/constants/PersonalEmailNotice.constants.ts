import {
  PERSONAL_EMAIL_INTENT,
  PROFILE_NOTICE,
  type PersonalEmailIntent,
  type ProfileNotice,
} from "@/app/constants";

export const PROFILE_NOTICE_BY_INTENT: Record<
  PersonalEmailIntent,
  ProfileNotice
> = {
  [PERSONAL_EMAIL_INTENT.REMOVE]:
    PROFILE_NOTICE.EMAIL_REMOVED,
  [PERSONAL_EMAIL_INTENT.SAVE]: PROFILE_NOTICE.EMAIL_SAVED,
};
