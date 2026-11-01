export const PROFILE_NOTICE_QUERY_PARAM = "notice";

export const PROFILE_NOTICE = {
  EMAIL_REMOVED: "email-removed",
  EMAIL_SAVED: "email-saved",
  PASSWORD_CHANGED: "password-changed",
} as const;

export type ProfileNotice =
  (typeof PROFILE_NOTICE)[keyof typeof PROFILE_NOTICE];
