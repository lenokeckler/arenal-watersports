export const PROFILE_NOTICE_QUERY_PARAM = "notice";

export const PROFILE_NOTICE = {
  PASSWORD_CHANGED: "password-changed",
} as const;

export type ProfileNotice =
  (typeof PROFILE_NOTICE)[keyof typeof PROFILE_NOTICE];
